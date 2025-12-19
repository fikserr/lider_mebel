import React, { useEffect, useState } from 'react';
import { ImStarFull, ImStarEmpty } from "react-icons/im";
import { Link } from '@inertiajs/react';

const ProductCard = ({ item, handleClick, isStarred, delay = 0, src, alt, className = "", fallback = "/fallback.jpg" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Faqat mavjud rasmlarni olish
  const images = [item.photo1, item.photo2, item.photo3]
    .filter(Boolean)
    .map(photo => `/storage/${photo}`);

  // Variantlar massivini tayyorlash
  const parsedVariants = item.variants?.map(variant => ({
    ...variant,
    sizes: Array.isArray(variant.size) ? variant.size : [],
    color: Array.isArray(variant.color) ? variant.color : [],
  })) || [];

  // O'lchamlar va narxlar
  const sizes = [...new Set(parsedVariants.flatMap(v => v.size))];
  const prices = parsedVariants.map(v => v.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

  // Slideshow uchun rasm almashinuvi
  useEffect(() => {
    if (images.length <= 1) return;

    // Dastlab delay bilan boshlaymiz
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % images.length);
      }, 5000);

      // cleanup interval
      return () => clearInterval(interval);
    }, delay);

    // cleanup timeout
    return () => clearTimeout(start);
  }, [delay, images.length]);

  return (
    <Link href={`/detail/${item.id}`} className='rounded-lg flex flex-col h-80' aria-label='Product Card Link'>
      <div className='relative h-[65%] overflow-hidden rounded-t-lg'>
        <div
          className="flex transition-transform duration-700 ease-in-out w-full h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => {
            const [imgLoaded, setImgLoaded] = useState(false); // har rasm uchun alohida holat

            return (
              <img
                key={index}
                src={`${src}?v=${Date.now()}`} // cache break
                loading="lazy"
                alt={alt || item.product_name}
                onLoad={() => setImgLoaded(true)}
                // onError={(e) => {
                //   e.currentTarget.src = fallback;
                // }}
                className={`
        w-full flex-shrink-0 object-cover h-full
        transition-all duration-700 ease-in-out
        ${imgLoaded ? "blur-0 scale-100" : "blur-md scale-105"}
        ${className}
      `}
              />
            );
          })}

        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleClick(e, item.id);
          }}
          className='absolute top-4 right-4 z-10'
          aria-label='Star Button'
        >
          {isStarred ? (
            <ImStarFull className="text-2xl text-yellow-400" />
          ) : (
            <ImStarEmpty className="text-2xl text-black" />
          )}
        </button>
      </div>

      <div className='flex items-end justify-between'>
        <div className='p-2'>
          <p className='text-base font-semibold'>{item.product_name.toUpperCase()}</p>
          <p className='text-base'>
            {minPrice.toLocaleString()} <span className='text-sm text-slate-500'>so'm</span>
          </p>
          <p className='text-sm text-slate-500'>
            {sizes.join(', ')}
          </p>
        </div>
        <Link href={`/detail/${item.id}`} className='hidden sm:block' aria-label="View More Button">
          <button className='bg-black text-white w-full p-2 rounded-lg hover:bg-gray-800 transition xl:px-8'>
            Ko'proq
          </button>
        </Link>
      </div>
    </Link>
  );
};

export default ProductCard;
