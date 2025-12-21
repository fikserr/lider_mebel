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

const Home = ({ categories, banners, favorites}) => {
  const [showShoes, setShowShoes] = useState(false);
  const [showClothes, setShowClothes] = useState(false);
  const [showAccessories, setShowAccessories] = useState(false);
  const [showBlog, setShowBlog] = useState(false);

  const { url } = usePage();
  const searchParams = new URLSearchParams(url.split('?')[1]);
  const searchQuery = searchParams.get('search') || '';
  console.log(categories);
  
  // Qidiruv bo'yicha filterlangan mahsulotlar
  // const filteredProducts = useMemo(() => {
  //   if (!searchQuery.trim()) return products;

  //   return products.filter(product => {
  //     const query = searchQuery.toLowerCase();
      
  //     // Mahsulot nomida qidirish
  //     const nameMatch = product.product_name?.toLowerCase().includes(query);
      
  //     // Brend bo'yicha qidirish
  //     const brandMatch = product.brend?.toLowerCase().includes(query);
      
  //     // Kategoriya bo'yicha qidirish
  //     const categoryMatch = product.category?.name?.toLowerCase().includes(query);
      
  //     // Variant ma'lumotlari bo'yicha qidirish
  //     const variantMatch = product.variants?.some(variant => {
  //       const colorMatch = variant.colors?.some(color => 
  //         color.toLowerCase().includes(query)
  //       );
  //       const sizeMatch = variant.sizes?.some(size => 
  //         size.toLowerCase().includes(query)
  //       );
  //       return colorMatch || sizeMatch;
  //     });

  //     return nameMatch || brandMatch || categoryMatch || variantMatch;
  //   });
  // }, [products, searchQuery]);

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
      <div>
        {categories.map((category) => (
          <div key={category.id}>
           <img src={`storage/${category.image}`} alt={category.name} />
           <h1>{category.name}</h1>
          </div>
        ))} 
      </div>
      <Suspense fallback={<Spinner />}>
        <HomeHero banner={banners} />
      </Suspense>


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