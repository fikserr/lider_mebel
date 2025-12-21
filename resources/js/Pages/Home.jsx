import { useEffect, useState, lazy, Suspense, useMemo } from "react";
import { Link, usePage } from "@inertiajs/react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { Spinner } from "@/components/shared/spinner";

const HomeHero = lazy(() => import("../Pages/home-hero"));
const HomeProducts = lazy(() => import("@/components/shared/homeProducts").then(m => ({ default: m.HomeProducts })));
const ClothesProducts = lazy(() => import("@/components/shared/homeProducts").then(m => ({ default: m.ClothesProducts })));
const AccessoryProducts = lazy(() => import("@/components/shared/homeProducts").then(m => ({ default: m.AccessoryProducts })));
const BlogSection = lazy(() => import("@/components/shared/BlogSection"));
const PriceSection = lazy(() => import("@/components/shared/PriceSection"));
const AboutSection = lazy(() => import("@/components/shared/AboutSection"));

const Section = ({ title, link, children }) => (
  <div className='my-3'>
    <div className='flex items-center justify-between'>
      <h3 className='font-bold text-2xl font-oswald'>{title}</h3>
      <h4 className='border-b-2 border-black text-xl flex items-center p-1 font-oswald'>
        <Link href={link} className='md:hidden'>Ko'proq</Link>
        <Link href={link} className='hidden md:block mb-3'>Ko'proq maxsulot</Link>
        <HiOutlineChevronRight />
      </h4>
    </div>
    {children}
  </div>
);

const Home = ({ products, banners, favorites }) => {
  const [showShoes, setShowShoes] = useState(false);
  const [showClothes, setShowClothes] = useState(false);
  const [showAccessories, setShowAccessories] = useState(false);
  const [showBlog, setShowBlog] = useState(false);

  const { url } = usePage();
  const searchParams = new URLSearchParams(url.split('?')[1]);
  const searchQuery = searchParams.get('search') || '';

  // Qidiruv bo'yicha filterlangan mahsulotlar
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;

    return products.filter(product => {
      const query = searchQuery.toLowerCase();
      
      // Mahsulot nomida qidirish
      const nameMatch = product.product_name?.toLowerCase().includes(query);
      
      // Brend bo'yicha qidirish
      const brandMatch = product.brend?.toLowerCase().includes(query);
      
      // Kategoriya bo'yicha qidirish
      const categoryMatch = product.category?.name?.toLowerCase().includes(query);
      
      // Variant ma'lumotlari bo'yicha qidirish
      const variantMatch = product.variants?.some(variant => {
        const colorMatch = variant.colors?.some(color => 
          color.toLowerCase().includes(query)
        );
        const sizeMatch = variant.sizes?.some(size => 
          size.toLowerCase().includes(query)
        );
        return colorMatch || sizeMatch;
      });

      return nameMatch || brandMatch || categoryMatch || variantMatch;
    });
  }, [products, searchQuery]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const shoesTimer = setTimeout(() => setShowShoes(true), 1000);
    const clothesTimer = setTimeout(() => setShowClothes(true), 2000);
    const accessoryTimer = setTimeout(() => setShowAccessories(true), 3000);
    const blogTimer = setTimeout(() => setShowBlog(true), 4000);

    return () => {
      clearTimeout(shoesTimer);
      clearTimeout(clothesTimer);
      clearTimeout(accessoryTimer);
      clearTimeout(blogTimer);
    };
  }, []);

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <HomeHero banner={banners} />
      </Suspense>

      <div className='px-5 xl:px-20'>
        {/* Qidiruv natijalari bo'limi */}
        {searchQuery && (
          <div className="my-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold font-oswald mb-2 text-blue-900">
              Qidiruv natijalari: "{searchQuery}"
            </h2>
            <p className="text-blue-700 mb-4">
              {filteredProducts.length} ta mahsulot topildi
            </p>
            
            {filteredProducts.length > 0 ? (
              <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3'>
                {filteredProducts.map((item) => {
                  const minPrice = Math.min(...item.variants.map(v => v.price));
                  
                  return (
                    <Link 
                      href={`/detail/${item.id}`} 
                      key={item.id} 
                      className='rounded relative border bg-white hover:shadow-lg transition-shadow' 
                      aria-label={`View details for ${item.product_name}`}
                    >
                      <div className='flex justify-center rounded-t-lg overflow-hidden'>
                        <img
                          src={`/storage/${item.photo1}?v=${Date.now()}`}
                          loading="lazy"
                          alt={item.product_name}
                          className="w-full object-cover h-56"
                        />
                      </div>
                      <div className='p-3'>
                        <p className='text-xl font-semibold truncate'>
                          {item.product_name}
                        </p>
                        <p className='text-lg font-bold text-blue-600'>
                          {minPrice.toLocaleString()} <span className='text-sm text-slate-500'>so'm</span>
                        </p>
                        <p className='text-sm text-slate-500 truncate'>
                          {item.variants.map((variant, index) => (
                            <span key={variant.id}>
                              {variant.sizes?.join(', ')}
                              {index < item.variants.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded-lg">
                <p className="text-xl text-gray-500">
                  Hech qanday mahsulot topilmadi
                </p>
                <p className="text-gray-400 mt-2">
                  Boshqa kalit so'zlar bilan qidirib ko'ring
                </p>
              </div>
            )}
          </div>
        )}

        {/* Barcha sectionlar doimo ko'rinadi */}
        {showShoes && (
          <Section title="Oyoq kiyimlar" link="/category/3">
            <Suspense fallback={
              <div className="w-full min-h-[400px] flex items-center justify-center">
                <Spinner />
              </div>
            }>
              <HomeProducts data={products} favorites={favorites} />
            </Suspense>
          </Section>
        )}

        {showClothes && (
          <Section title="Kiyimlar" link="/category/3">
            <Suspense fallback={<Spinner />}>
              <ClothesProducts data={products} favorites={favorites} />
            </Suspense>
          </Section>
        )}

        {showAccessories && (
          <Section title="Aksesuarlar" link="/category/1">
            <Suspense fallback={<Spinner />}>
              <AccessoryProducts data={products} favorites={favorites} />
            </Suspense>
          </Section>
        )}
      </div>

      <Suspense fallback={<Spinner />}>
        <PriceSection />
      </Suspense>

      <Suspense fallback={<Spinner />}>
        <AboutSection />
      </Suspense>

      {showBlog && (
        <Suspense fallback={<Spinner />}>
          <BlogSection />
        </Suspense>
      )}
    </div>
  );
};

export default Home;