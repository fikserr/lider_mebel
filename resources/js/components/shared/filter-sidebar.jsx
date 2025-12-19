import React, { useState } from 'react';

const FilterSidebar = ({
    brands = [],
    categories = [],
    variantsColors = [],
    variantsSizes = [],
    onPriceChange = () => { },
    onSizeChange = () => { },
    onCategoryChange = () => { },
    onBrandChange = () => { },
    onColorChange = () => { },
    onClearFilters = () => { }
}) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const toggleArrayItem = (arr, setArr, val, callback) => {
        const updated = arr.includes(val) ? arr.filter(i => i !== val) : [...arr, val];
        setArr(updated);
        callback && callback(updated);
    };

    return (
        <div>
            {/* Tozalash */}
            <button
                className="w-full text-center mt-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={onClearFilters}
            >
                Barcha filtrlarni tozalash
            </button>
            {/* Kategoriyalar */}
            <div className="border rounded-md p-2 mt-3">
                <h2
                    
                    className="mb-2 font-semibold font-oswald text-2xl"
                >
                    Kategoriyalar
                </h2>

                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`p-1 rounded-md w-full text-left mb-1
            ${selectedCategory === cat.name ? 'bg-black text-white' : 'bg-white text-black'}`}
                        onClick={() => {
                            if (cat.id === cat.id) {
                                window.location.href = `/category/${cat.id}`;
                            } else {
                                setSelectedCategory(selectedCategory === cat.name ? null : cat.name);
                                onCategoryChange(cat.name);
                            }
                        }}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Narx filteri */}
            <div className="border rounded-md p-2 my-3">
                <h2  className="mb-2 font-semibold font-oswald text-2xl">Narx bo‘yicha filter</h2>
                <div className="flex items-center space-x-1">
                    <input
                        type="number"
                        className="w-1/2 px-1 outline-none"
                        placeholder="Minimal narx"
                        value={minPrice}
                        onChange={e => setMinPrice(e.target.value)}
                    />
                    <span>-</span>
                    <input
                        type="number"
                        className="w-1/2 px-1 outline-none"
                        placeholder="Maksimal narx"
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value)}
                    />
                </div>
                <button
                    className="bg-black text-white w-full rounded py-1 mt-5"
                    onClick={() => onPriceChange({ minPrice, maxPrice })}
                >
                    Filter qo‘llash
                </button>
            </div>

            {/* O‘lchamlar */}
            <div className="border p-2 rounded-md my-3">
                <h2  className="mb-2 font-semibold font-oswald text-2xl">O‘lchamlar</h2>
                <div className="grid grid-cols-4 gap-2">
                    {variantsSizes.map(size => (
                        <button
                            key={size}
                            className={`border rounded p-2 text-sm cursor-pointer
                                ${selectedSizes.includes(size) ? 'bg-black text-white' : 'bg-white text-black'}`}
                            onClick={() => toggleArrayItem(selectedSizes, setSelectedSizes, size, onSizeChange)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Ranglar */}
            <div className="border rounded-md p-2 my-3">
                <h2  className="font-semibold mb-2 font-oswald text-2xl">Ranglar</h2>
                <div className="grid grid-cols-4 gap-2">
                    {variantsColors.map(color => (
                        <button
                            key={color}
                            className={`border rounded p-2 text-sm cursor-pointer capitalize
                    ${selectedColors.includes(color) ? 'bg-black text-white' : 'bg-white text-black'}`}
                            onClick={() => toggleArrayItem(selectedColors, setSelectedColors, color, onColorChange)}
                        >
                            {color}
                        </button>
                    ))}
                </div>
            </div>

            {/* Brendlar */}
            <div className="border rounded-md p-2 mb-5">
                <h2  className="mb-2 font-semibold font-oswald text-2xl">Brendlar</h2>
                {brands.map(brand => (
                    <button
                        key={brand}
                        className={`p-1 rounded-md w-full text-left mb-1
                ${selectedBrands === brand ? 'bg-black text-white' : 'bg-white text-black'}`}
                        onClick={() => {
                            setSelectedBrands(selectedBrands === brand ? null : brand);
                            onBrandChange(brand);
                        }}
                    >
                        {brand}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterSidebar;
