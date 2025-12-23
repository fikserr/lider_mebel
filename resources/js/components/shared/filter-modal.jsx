import React, { useEffect, useState } from 'react';

const FilterModal = ({
    brands = [],
    categories = [],
    colors = [],
    sizes = [],
    selectedCategory = null,
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
    const [selectedColor, setSelectedColor] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    useEffect(() => {
        document.body.style.overflow = (isModalOpen || isFilterOpen) ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isModalOpen, isFilterOpen]);

    console.log('FilterModal categories:', categories);
    console.log('FilterModal selectedCategory:', selectedCategory);

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
    };

    const handleColorChange = (color) => {
        const newColor = selectedColor.includes(color)
            ? selectedColor.filter(c => c !== color)
            : [...selectedColor, color];
        setSelectedColor(newColor);
        onColorChange(newColor);
    };

    const handleBrandChange = (brand) => {
        const updated = selectedBrands.includes(brand)
            ? selectedBrands.filter(b => b !== brand)
            : [...selectedBrands, brand];
        setSelectedBrands(updated);
        onBrandChange(updated);
    };

    const handleReset = () => {
        setMinPrice('');
        setMaxPrice('');
        setSelectedSizes([]);
        setSelectedColor([]);
        setSelectedBrands([]);
        onPriceChange({ minPrice: '', maxPrice: '' });
        onSizeChange([]);
        onColorChange([]);
        onBrandChange([]);
    };

    return (
        <div>
            {/* Tugmalar */}
            <div className='grid grid-cols-2 gap-5 my-5 xl:hidden'>
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className='border border-slate-500 rounded-lg p-3 font-medium hover:bg-gray-50'
                >
                    Kategoriyalar ({categories.length})
                </button>
                <button 
                    onClick={() => setIsFilterOpen(true)} 
                    className='border border-slate-500 rounded-lg p-3 font-medium hover:bg-gray-50'
                >
                    Filtr
                </button>
            </div>

            {/* Kategoriya Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg p-6 w-11/12 max-w-md max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold text-xl">KATEGORIYALAR</h2>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-2xl hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        {categories.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        className={`p-3 rounded-md text-left border transition-colors
                                            ${selectedCategory === cat.id 
                                                ? 'bg-black text-white border-black' 
                                                : 'bg-white text-black border-gray-300 hover:border-black'}`}
                                        onClick={() => {
                                            window.location.href = `/category/${cat.id}`;
                                        }}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">
                                Kategoriyalar topilmadi
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Filter Modal */}
            {isFilterOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col justify-center items-center"
                    onClick={() => setIsFilterOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg p-6 w-11/12 max-w-xl overflow-y-auto max-h-[80vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold text-xl">FILTR</h2>
                            <button 
                                onClick={() => setIsFilterOpen(false)}
                                className="text-2xl hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Narx */}
                        <div className='my-6 border rounded-md p-4'>
                            <h2 className="font-semibold mb-3 text-lg">Narx bo'yicha filtr</h2>
                            <div className="flex items-center space-x-2">
                                <input 
                                    type="number" 
                                    placeholder="Min" 
                                    className='w-1/2 px-2 py-2 border rounded outline-none focus:border-blue-500'
                                    value={minPrice} 
                                    onChange={e => setMinPrice(e.target.value)} 
                                />
                                <span className="font-bold">-</span>
                                <input 
                                    type="number" 
                                    placeholder="Max" 
                                    className='w-1/2 px-2 py-2 border rounded outline-none focus:border-blue-500'
                                    value={maxPrice} 
                                    onChange={e => setMaxPrice(e.target.value)} 
                                />
                            </div>
                            <button 
                                className='bg-black text-white w-full rounded py-2 mt-4 hover:bg-gray-800 transition-colors'
                                onClick={handleApply}
                            >
                                Qo'llash
                            </button>
                        </div>

                        {/* O'lchamlar */}
                        {sizes.length > 0 && (
                            <div className='my-6 border p-4 rounded-md'>
                                <h2 className="font-semibold mb-3 text-lg">O'lchamlar</h2>
                                <div className='grid grid-cols-4 gap-2'>
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => handleSizeChange(size)}
                                            className={`border rounded p-2 text-sm transition-colors
                                                ${selectedSizes.includes(size) 
                                                    ? 'bg-black text-white border-black' 
                                                    : 'bg-white hover:bg-gray-100 border-gray-300'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Ranglar */}
                        {colors.length > 0 && (
                            <div className='my-6 border rounded-md p-4'>
                                <h2 className="font-semibold mb-3 text-lg">Ranglar</h2>
                                <div className="flex flex-wrap gap-2">
                                    {colors.map((color, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleColorChange(color)}
                                            className={`px-3 py-2 border rounded capitalize transition-colors
                                                ${selectedColor.includes(color) 
                                                    ? 'bg-black text-white border-black' 
                                                    : 'bg-white hover:bg-gray-100 border-gray-300'}`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Brendlar */}
                        {brands.length > 0 && (
                            <div className="border rounded-md p-4 mb-5">
                                <h2 className="mb-3 font-semibold text-lg">Brendlar</h2>
                                <div className="space-y-1">
                                    {brands.map(brand => (
                                        <button
                                            key={brand}
                                            className={`p-2 rounded-md w-full text-left transition-colors
                                                ${selectedBrands.includes(brand) 
                                                    ? 'bg-black text-white' 
                                                    : 'bg-gray-50 hover:bg-gray-100 text-black'}`}
                                            onClick={() => handleBrandChange(brand)}
                                        >
                                            {brand}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Reset */}
                        <button
                            onClick={handleReset}
                            className="w-full text-center py-2 bg-gray-200 rounded hover:bg-gray-300 font-medium"
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