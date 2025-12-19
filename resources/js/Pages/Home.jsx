import { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "@inertiajs/react";
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
        <Link href={link}  className='md:hidden' >Ko'proq</Link>
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


  useEffect(() => {
    window.scrollTo(0, 0);

    const shoesTimer = setTimeout(() => setShowShoes(true), 1000);
    const clothesTimer = setTimeout(() => setShowClothes(true), 2000);
    const accessoryTimer = setTimeout(() => setShowAccessories(true), 3000);
    const blogTimer = setTimeout(() => setShowBlog(true), 4000); // Blog bo'limini ham kech yuklaymiz

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
