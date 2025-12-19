import React, { useEffect, useState } from 'react';

const FilterModal = ({
    brands = [],
    categories = [],
    colors = [],
    sizes = [],
    onSizeChange = () => { },
    onPriceChange = () => { },
    onColorChange = () => { },
    onBrandChange = () => { },
    onCategoryChange = () => { }
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        document.body.style.overflow = (isModalOpen || isFilterOpen) ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isModalOpen, isFilterOpen]);

    const handleApply = () => {
        onPriceChange({ minPrice, maxPrice });
        setIsFilterOpen(false);
    };

    const handleSizeChange = (size) => {
        const newSize = selectedSizes.includes(size)
            ? selectedSizes.filter(s => s !== size)
            : [...selectedSizes, size];
        setSelectedSizes(newSize);
        onSizeChange(newSize);
        setIsFilterOpen(false);
    };

    const handleColorChange = (color) => {
        const newColor = selectedColor === color ? null : color;
        setSelectedColor(newColor);
        onColorChange(newColor ? [newColor] : []);
        setIsFilterOpen(false);
    };

    const handleBrandChange = (brand) => {
        const updated = selectedBrands.includes(brand)
            ? selectedBrands.filter(b => b !== brand)
            : [...selectedBrands, brand];
        setSelectedBrands(updated);
        onBrandChange(updated);
        // ❌ Modal yopilmasin → bir nechta tanlash uchun
    };

    const handleReset = () => {
        setMinPrice('');
        setMaxPrice('');
        setSelectedSizes([]);
        setSelectedColor(null);
        setSelectedBrands([]);
        setSelectedCategory(null);
        onPriceChange({ minPrice: '', maxPrice: '' });
        onSizeChange([]);
        onColorChange([]);
        onBrandChange([]);
        onCategoryChange(null);
    };

    return (
        <div>
            {/* Tugmalar */}
            <div className='grid grid-cols-2 gap-5 my-5 xl:hidden'>
                <button onClick={() => setIsModalOpen(true)} className='border border-slate-500 rounded-lg p-3'>
                    Kategoriyalar
                </button>
                <button onClick={() => setIsFilterOpen(true)} className='border border-slate-500 rounded-lg p-3'>
                    Filtr
                </button>
            </div>

            {/* Kategoriya Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center xl:hidden"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg p-6 w-11/12 max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold">KATEGORIYA</h2>
                            <button onClick={() => setIsModalOpen(false)}>✕</button>
                        </div>

                        <div className="flex flex-col gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`p-2 rounded-md text-left border
                                        ${selectedCategory === cat.name ? 'bg-black text-white' : 'bg-white text-black'}`}
                                    onClick={() => {
                                        if (cat.id === cat.id) {
                                            window.location.href = `/category/${cat.id}`;
                                        } else {
                                            setSelectedCategory(selectedCategory === cat.name ? null : cat.name);
                                            onCategoryChange(cat.name);
                                        }
                                        const newCategory = selectedCategory === cat.name ? null : cat.name;
                                        setSelectedCategory(newCategory);
                                        onCategoryChange(newCategory);
                                        setIsModalOpen(false);
                                    }}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Filter Modal */}
            {isFilterOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col pt-20 gap-5 justify-center items-center xl:hidden"
                    onClick={() => setIsFilterOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg p-6 w-11/12 max-w-xl overflow-y-auto max-h-screen"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold">Filtr</h2>
                            <button onClick={() => setIsFilterOpen(false)}>✕</button>
                        </div>

                        {/* Narx */}
                        <div className='my-10 border rounded-md p-5'>
                            <h2 className="font-semibold mb-2">Narx bo‘yicha filtr</h2>
                            <div className="flex items-center space-x-1">
                                <input type="number" placeholder="Minimal narx" className='w-1/2 px-1 outline-none'
                                    value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                                <span>-</span>
                                <input type="number" placeholder="Maksimal narx" className='w-1/2 px-1 outline-none'
                                    value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                            </div>
                            <button className='bg-black text-white w-full rounded py-1 mt-5'
                                onClick={handleApply}>
                                Filtrni qo‘llash
                            </button>
                        </div>

                        {/* O‘lchamlar */}
                        <div className='my-10 border p-5 rounded-md'>
                            <h2 className="font-semibold mb-2">O‘lchamlar</h2>
                            <div className='grid grid-cols-4 gap-2'>
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => handleSizeChange(size)}
                                        className={`border rounded p-2 text-sm ${selectedSizes.includes(size) ? 'bg-black text-white' : 'bg-white'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Ranglar */}
                        <div className='my-10 border rounded-md p-5'>
                            <h2 className="font-semibold mb-2">Ranglar</h2>
                            <div className="flex flex-wrap gap-2">
                                {colors.map((color, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleColorChange(color)}
                                        className={`px-3 py-1 border rounded 
                                            ${selectedColor === color ? 'bg-black text-white' : 'bg-white'}`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Brendlar */}
                        <div className="border rounded-md p-2 mb-5">
                            <h2  className="mb-2 font-semibold font-oswald text-3xl">Brendlar</h2>
                            {brands.map(brand => (
                                <button
                                    key={brand}
                                    className={`p-1 rounded-md w-full text-left mb-1
                                        ${selectedBrands.includes(brand) ? 'bg-black text-white' : 'bg-white text-black'}`}
                                    onClick={() => handleBrandChange(brand)}
                                >
                                    {brand}
                                </button>
                            ))}
                        </div>

                        {/* Reset */}
                        <button
                            onClick={handleReset}
                            className="w-full text-center py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Barcha filtrlarni tozalash
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterModal;
