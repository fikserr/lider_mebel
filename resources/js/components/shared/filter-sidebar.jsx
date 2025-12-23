import React, { useState } from 'react';

const FilterSidebar = ({
    brands = [],
    categories = [],
    variantsColors = [],
    variantsSizes = [],
    selectedCategory = null,
    onPriceChange = () => { },
    onSizeChange = () => { },
    onCategoryChange = () => { },
    onBrandChange = () => { },
    onColorChange = () => { },
    onClearFilters = () => { }
}) => {
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    console.log('FilterSidebar categories:', categories);
    console.log('FilterSidebar selectedCategory:', selectedCategory);

    const toggleArrayItem = (arr, setArr, val, callback) => {
        const updated = arr.includes(val) ? arr.filter(i => i !== val) : [...arr, val];
        setArr(updated);
        callback && callback(updated);
    };

    const handleClearFilters = () => {
        setSelectedSizes([]);
        setSelectedBrands([]);
        setSelectedColors([]);
        setMinPrice('');
        setMaxPrice('');
        onClearFilters();
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-4">
            {/* Tozalash */}
            <button
                className="w-full text-center py-2 bg-gray-200 rounded hover:bg-gray-300 font-medium transition-colors"
                onClick={handleClearFilters}
            >
                Barcha filtrlarni tozalash
            </button>

            {/* Kategoriyalar */}
            {categories.length > 0 && (
                <div className="border rounded-md p-3 mt-4">
                    <h2 className="mb-3 font-semibold font-oswald text-xl">
                        Kategoriyalar ({categories.length})
                    </h2>
                    <div className="space-y-1">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`p-2 rounded-md w-full text-left transition-colors
                                    ${selectedCategory === cat.id 
                                        ? 'bg-black text-white' 
                                        : 'bg-gray-50 hover:bg-gray-100 text-black'}`}
                                onClick={() => {
                                    // Kategoriya bosilganda to'g'ridan-to'g'ri o'sha sahifaga o'tish
                                    window.location.href = `/category/${cat.id}`;
                                }}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Narx filteri */}
            <div className="border rounded-md p-3 my-4">
                <h2 className="mb-3 font-semibold font-oswald text-xl">
                    Narx bo'yicha filter
                </h2>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        className="w-full px-2 py-2 border rounded outline-none focus:border-blue-500"
                        placeholder="Min"
                        value={minPrice}
                        onChange={e => setMinPrice(e.target.value)}
                    />
                    <span className="text-gray-400 font-bold">-</span>
                    <input
                        type="number"
                        className="w-full px-2 py-2 border rounded outline-none focus:border-blue-500"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value)}
                    />
                </div>
                <button
                    className="bg-black text-white w-full rounded py-2 mt-3 hover:bg-gray-800 transition-colors"
                    onClick={() => onPriceChange({ minPrice, maxPrice })}
                >
                    Qo'llash
                </button>
            </div>

            {/* O'lchamlar */}
            {variantsSizes.length > 0 && (
                <div className="border p-3 rounded-md my-4">
                    <h2 className="mb-3 font-semibold font-oswald text-xl">
                        O'lchamlar
                    </h2>
                    <div className="grid grid-cols-4 gap-2">
                        {variantsSizes.map(size => (
                            <button
                                key={size}
                                className={`border rounded p-2 text-sm cursor-pointer transition-colors
                                    ${selectedSizes.includes(size) 
                                        ? 'bg-black text-white border-black' 
                                        : 'bg-white text-black border-gray-300 hover:border-black'}`}
                                onClick={() => toggleArrayItem(selectedSizes, setSelectedSizes, size, onSizeChange)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Ranglar */}
            {variantsColors.length > 0 && (
                <div className="border rounded-md p-3 my-4">
                    <h2 className="font-semibold mb-3 font-oswald text-xl">
                        Ranglar
                    </h2>
                    <div className="grid grid-cols-3 gap-2">
                        {variantsColors.map(color => (
                            <button
                                key={color}
                                className={`border rounded p-2 text-xs cursor-pointer capitalize transition-colors
                                    ${selectedColors.includes(color) 
                                        ? 'bg-black text-white border-black' 
                                        : 'bg-white text-black border-gray-300 hover:border-black'}`}
                                onClick={() => toggleArrayItem(selectedColors, setSelectedColors, color, onColorChange)}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Brendlar */}
            {brands.length > 0 && (
                <div className="border rounded-md p-3 mb-4">
                    <h2 className="mb-3 font-semibold font-oswald text-xl">
                        Brendlar
                    </h2>
                    <div className="space-y-1">
                        {brands.map(brand => (
                            <button
                                key={brand}
                                className={`p-2 rounded-md w-full text-left transition-colors
                                    ${selectedBrands.includes(brand) 
                                        ? 'bg-black text-white' 
                                        : 'bg-gray-50 hover:bg-gray-100 text-black'}`}
                                onClick={() => {
                                    toggleArrayItem(selectedBrands, setSelectedBrands, brand, onBrandChange);
                                }}
                            >
                                {brand}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterSidebar;