import { Link } from '@inertiajs/react';
import FilterModal from '@/components/shared/filter-modal';
import FilterSidebar from '@/components/shared/filter-sidebar';
import { ImStarFull, ImStarEmpty } from "react-icons/im";
import { useEffect, useState } from 'react';
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const Shoes = ({ products, categories, favorites = [] }) => {
    const [priceFilter, setPriceFilter] = useState({ minPrice: '', maxPrice: '' });
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [starredItems, setStarredItems] = useState(favorites.map(f => f.id));
    const { toast } = useToast();

    // Filterlash
    const filteredProducts = products?.filter(item => {
        if (!item.variants || item.variants.length === 0) return false;

        const hasMatchingPrice = item.variants.some(variant => {
            const price = Number(variant.price);
            if (priceFilter.minPrice && price < Number(priceFilter.minPrice)) return false;
            if (priceFilter.maxPrice && price > Number(priceFilter.maxPrice)) return false;
            return true;
        });
        if (!hasMatchingPrice) return false;

        if (selectedSizes.length > 0) {
            const hasMatchingSize = item.variants.some(variant =>
                variant.sizes?.some(size => selectedSizes.includes(size))
            );
            if (!hasMatchingSize) return false;
        }

        if (selectedColors.length > 0) {
            const hasMatchingColor = item.variants.some(variant =>
                variant.colors?.some(color => selectedColors.includes(color))
            );
            if (!hasMatchingColor) return false;
        }

        if (selectedBrands.length > 0 && !selectedBrands.includes(item.brend)) {
            return false;
        }

        if (selectedCategories.length > 0 && !selectedCategories.includes(item.category?.name)) {
            return false;
        }

        return true;
    });

    useEffect(() => {
        if (favorites && favorites.length > 0) {
            setStarredItems(favorites.map(f => f.id));
        }
    }, [favorites]);

    const handleClick = async (e, productId) => {
        e.preventDefault();

        if (starredItems.includes(productId)) {
            try {
                await axios.delete(`/favorites/${productId}`);
                setStarredItems(prev => prev.filter(id => id !== productId));
                toast({
                    title: "Sevimlilardan o'chirildi",
                    description: "✅ Mahsulot olib tashlandi",
                });
            } catch (error) {
                console.error(error);
                toast({
                    title: "Xatolik",
                    description: "❌ Sevimlilardan o‘chirishda muammo",
                });
            }
        } else {
            try {
                await axios.post(`/favorites`, { product_id: productId });
                setStarredItems(prev => [...prev, productId]);
                toast({
                    title: "Sevimlilarga qo'shildi",
                    description: "✅ Mahsulot qo‘shildi",
                });
            } catch (error) {
                console.error(error);
                toast({
                    title: "Xatolik",
                    description: "❌ Sevimlilarga qo‘shishda muammo",
                });
            }
        }
    };

    // Unikal qiymatlar
    const allColors = Array.from(new Set(
        products?.flatMap(product =>
            product.variants.flatMap(variant => variant.colors || [])
        ) || []
    ));
    const allSizes = Array.from(new Set(
        products?.flatMap(product =>
            product.variants.flatMap(variant => variant.sizes || [])
        ) || []
    ));
    const allBrands = Array.from(new Set(
        products?.map(p => p.brend).filter(Boolean)
    ));
    const allCategories = Array.from(new Set(
        products?.map(p => p.category?.name).filter(Boolean)
    ));

    return (
        <div className='px-5 xl:px-20 mt-20'>
            <h2  className='text-2xl font-oswald'>Mahsulotlar</h2>

            <FilterModal
                onPriceChange={setPriceFilter}
                onSizeChange={setSelectedSizes}
                onColorChange={setSelectedColors}
                sizes={allSizes}
                colors={allColors}
                brands={allBrands}
                categories={categories}
            />

            <div className='grid xl:grid-cols-4 xl:gap-5 w-full'>
                <div className='hidden xl:block px-3'>
                    <FilterSidebar
                        colors={allColors}
                        sizes={allSizes}
                        brands={allBrands}
                        categories={categories}
                        variantsColors={allColors}
                        variantsSizes={allSizes}
                        onPriceChange={setPriceFilter}
                        onSizeChange={setSelectedSizes}
                        onColorChange={setSelectedColors}
                        onBrandChange={setSelectedBrands}
                        onCategoryChange={setSelectedCategories}
                        onClearFilters={() => {
                            setPriceFilter({ minPrice: '', maxPrice: '' });
                            setSelectedSizes([]);
                            setSelectedColors([]);
                            setSelectedBrands([]);
                            setSelectedCategories([]);
                        }}
                    />
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:col-span-3 xl:h-2/5 gap-3'>
                    {filteredProducts?.map((item) => {
                        const minPrice = Math.min(...item.variants.map(v => v.price));
                        return (
                            <Link href={`/detail/${item.id}`} key={item.id} className='rounded relative' aria-label='View details for {item.product_name}'>
                                <div className='flex justify-end rounded-t-lg'>
                                    <img
                                        src={`/storage/${item.photo1}?v=${Date.now()}`}
                                        loading="lazy"
                                        alt={item.product_name}
                                        className="w-full overflow-hidden object-cover h-56 rounded"
                                    />
                                </div>
                                <div className='flex items-end justify-between '>
                                    <div className=' overflow-hidden rounded-t-lg p-2'>
                                        <p className='text-2xl font-semibold'>{item.product_name}</p>
                                        <p className='text-lg'>
                                            {minPrice.toLocaleString()} <span className='text-sm text-slate-500'>so'm</span>
                                        </p>
                                        <p className='text-sm text-slate-500'>
                                            {item.variants.map((variant, index) => (
                                                <span key={variant.id}>
                                                    {variant.sizes?.join(', ')}
                                                    {index < item.variants.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => handleClick(e, item.id)}
                                        className='absolute top-4 right-4'
                                    >
                                        {starredItems.includes(item.id) ? (
                                            <ImStarFull className="text-2xl text-yellow-400" />
                                        ) : (
                                            <ImStarEmpty className="text-2xl text-black" />
                                        )}
                                    </button>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Shoes;
