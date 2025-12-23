import { useState, useMemo } from "react";
import { Link, Head } from "@inertiajs/react";
import { HiOutlineChevronLeft } from "react-icons/hi";
import FilterModal from "@/components/shared/filter-modal";
import FilterSidebar from "@/components/shared/filter-sidebar";

const CategoryProducts = ({ category, products = [], categories = [] }) => {
  const [sortBy, setSortBy] = useState("default");

  // Filter state'lari
  const [selectedCategory, setSelectedCategory] = useState(category?.id ?? null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState({ minPrice: "", maxPrice: "" });
  
  // Debug
  console.log('=== CategoryProducts Debug ===');
  console.log('category:', category);
  console.log('categories:', categories);
  console.log('categories.length:', categories.length);
  console.log('products:', products);
  console.log('products.length:', products.length);
  
  /* ================== BRAND ================== */
  const allBrands = useMemo(() => {
    return [...new Set(products.map(p => p.brend).filter(Boolean))];
  }, [products]);

  /* ================== COLORS ================== */
  const allColors = useMemo(() => {
    const list = [];
    products.forEach(p => {
      p.variants?.forEach(v => {
        v.colors?.forEach(c => list.push(c));
      });
    });
    return [...new Set(list)];
  }, [products]);

  /* ================== SIZES ================== */
  const allSizes = useMemo(() => {
    const list = [];
    products.forEach(p => {
      p.variants?.forEach(v => {
        v.sizes?.forEach(s => list.push(s));
      });
    });
    return [...new Set(list)];
  }, [products]);

  console.log('allBrands:', allBrands);
  console.log('allColors:', allColors);
  console.log('allSizes:', allSizes);

  /* ================== FILTER + SORT ================== */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory) {
      result = result.filter(p => p.category_id === selectedCategory);
    }

    // Brand filter
    if (selectedBrands.length) {
      result = result.filter(p => selectedBrands.includes(p.brend));
    }

    // Colors filter
    if (selectedColors.length) {
      result = result.filter(p =>
        p.variants?.some(v =>
          v.colors?.some(c => selectedColors.includes(c))
        )
      );
    }

    // Sizes filter
    if (selectedSizes.length) {
      result = result.filter(p =>
        p.variants?.some(v =>
          v.sizes?.some(s => selectedSizes.includes(s))
        )
      );
    }

    // Price filter
    if (priceRange.minPrice || priceRange.maxPrice) {
      const min = Number(priceRange.minPrice || 0);
      const max = Number(priceRange.maxPrice || Infinity);
      result = result.filter(p =>
        p.variants?.some(v => v.price >= min && v.price <= max)
      );
    }

    return result;
  }, [products, selectedCategory, selectedBrands, selectedColors, selectedSizes, priceRange]);

  const clearFilters = () => {
    setSelectedCategory(category?.id ?? null);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange({ minPrice: "", maxPrice: "" });
    setSortBy("default");
  };

  return (
    <>
      <Head title={category.name} />

      <div className="px-5 xl:px-20 mt-20">
        <Link
          href="/"
          className="inline-flex items-center mb-4 hover:opacity-70"
        >
          <HiOutlineChevronLeft className="mr-2 text-xl" />
          <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
        </Link>

        <div className="mb-6 pl-7">
          <p className="text-gray-600 ">{filteredProducts.length} ta mahsulot</p>
        </div>

        <div className="flex gap-6">
          {/* SIDEBAR - Desktop only */}
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <FilterSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                brands={allBrands}
                variantsColors={allColors}
                variantsSizes={allSizes}
                onBrandChange={setSelectedBrands}
                onColorChange={setSelectedColors}
                onSizeChange={setSelectedSizes}
                onPriceChange={setPriceRange}
                onClearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* CONTENT */}
          <div className="flex-1">
            {/* Filter Modal - Mobile & Tablet only */}
            <div className="xl:hidden">
              <FilterModal
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                brands={allBrands}
                colors={allColors}
                sizes={allSizes}
                onBrandChange={setSelectedBrands}
                onColorChange={setSelectedColors}
                onSizeChange={setSelectedSizes}
                onPriceChange={setPriceRange}
              />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map(p => (
                <Link
                  key={p.id}
                  href={`/detail/${p.id}`}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="overflow-hidden rounded-t-lg">
                    <img
                      src={`/storage/${p.photo1}`}
                      alt={p.product_name}
                      className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder.png';
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold line-clamp-2 mb-1">{p.product_name}</h3>
                    <p className="text-sm text-gray-500">{p.brend}</p>
                    {p.variants?.[0]?.price && (
                      <p className="text-sm font-bold mt-1">
                        {p.variants[0].price.toLocaleString()} so'm
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {!filteredProducts.length && (
              <div className="text-center mt-16 py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Mahsulotlar topilmadi
                </h3>
                <p className="text-gray-500">
                  Filtr shartlariga mos mahsulot yo'q
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Filtrlarni tozalash
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;