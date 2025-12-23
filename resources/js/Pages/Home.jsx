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

const Home = ({ categories, banners, favorites }) => {
  const [showShoes, setShowShoes] = useState(false);
  const [showClothes, setShowClothes] = useState(false);
  const [showAccessories, setShowAccessories] = useState(false);
  const [showBlog, setShowBlog] = useState(false);

  const { url } = usePage();
  const searchParams = new URLSearchParams(url.split('?')[1]);
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;
    return categories.filter(category =>
      category.name.toLowerCase().includes(searchQuery)
    );
  }, [categories, searchQuery]);

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

      <div className="px-5 md:px-10 xl:px-20 py-8">
        <h2 className="text-3xl font-bold font-oswald mb-6">Kategoriyalar</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 1xl:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-6">
          {filteredCategories.map((category) => (
            <Link 
              key={category.id} 
              href={`/category/${category.id}`}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white">
                <img 
                  src={`/storage/${category.image}`} 
                  alt={category.name}
                  className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.png';
                  }}
                />
              </div>
              <h3 className="mt-3 text-lg md:text-xl font-semibold font-oswald text-center group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
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