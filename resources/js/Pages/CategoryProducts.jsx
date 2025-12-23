import { useState, useMemo } from "react";
import { Link, Head } from "@inertiajs/react";
import { HiOutlineChevronLeft } from "react-icons/hi";

const CategoryProducts = ({ category, products }) => {
  const [sortBy, setSortBy] = useState("default");

  // Debug uchun
  // console.log('Category:', category);
  // console.log('Products:', products);
  // console.log('Products length:', products?.length);

  // Mahsulotlarni saralash
  const sortedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    let sorted = [...products];

    switch (sortBy) {
      case "name-asc":
        return sorted.sort((a, b) => a.product_name.localeCompare(b.product_name));
      case "name-desc":
        return sorted.sort((a, b) => b.product_name.localeCompare(a.product_name));
      case "newest":
        return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case "oldest":
        return sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      default:
        return sorted;
    }
  }, [products, sortBy]);

  return (
    <>
      <Head title={`${category.name} - Mahsulotlar`} />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm mt-14">
          <div className="px-5 md:px-10 xl:px-20 py-6">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <HiOutlineChevronLeft className="mr-2" />
              Bosh sahifaga qaytish
            </Link>

            <div className="flex items-center gap-4">
              {category.image && (
                <img
                  src={`/storage/${category.image}`}
                  alt={category.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-oswald">
                  {category.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  {sortedProducts.length} ta mahsulot
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 md:px-10 xl:px-20 py-8">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="w-full md:w-64">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Saralash
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border w-full border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="default">Standart</option>
                  <option value="name-asc">Nomi: A-Z</option>
                  <option value="name-desc">Nomi: Z-A</option>
                  <option value="newest">Eng yangi</option>
                  <option value="oldest">Eng eski</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {sortedProducts.map((product) => {
                // To'g'ridan-to'g'ri photo1 dan foydalanish
                const productImage = product.photo1 || product.photo2 || product.photo3;

                // console.log(`Product ${product.id}:`, product.product_name);
                // console.log('photo1:', product.photo1);
                // console.log('productImage:', productImage);

                return (
                  <Link
                    key={product.id}
                    href={`/detail/${product.id}`}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="overflow-hidden rounded-t-lg relative bg-gray-100">
                      {productImage ? (
                        <img
                          src={`/storage/${productImage}`}
                          alt={product.product_name}
                          className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            console.error('Image load error:', productImage);
                            e.target.onerror = null;
                            e.target.parentElement.innerHTML = `
                              <div class="w-full h-48 md:h-64 bg-gray-200 flex items-center justify-center">
                                <span class="text-gray-400">Rasm yuklanmadi</span>
                              </div>
                            `;
                          }}
                        />
                      ) : (
                        <div className="w-full h-48 md:h-64 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">Rasm yo'q</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-sm md:text-base line-clamp-2 group-hover:text-blue-600 transition-colors  mb-2">
                        {product.product_name}
                      </h3>
                      {product.brend && (
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          {product.brend}
                        </p>
                      )}

                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Mahsulotlar topilmadi
              </h3>
              <p className="text-gray-500">
                Bu kategoriyada hozircha mahsulotlar yo'q
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;