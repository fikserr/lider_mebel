import React from 'react'
import { favoriteProducts } from '@/components/shared/lists';

const AdminFavorites = () => {
  
  const stars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };
  return (
    <div className='w-[1200px] px-5 mx-5'>
      <h1 className="text-3xl font-bold mb-4 p-5">Favorites</h1>
      <div className='grid grid-cols-4 gap-3'>
        {favoriteProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-lg shadow p-6 flex flex-col items-center"
          >
            <div className="relative w-40 h-40 mb-4">
              <img
                src={p.image}
                loading="lazy"
                alt={p.title}
                className="object-contain w-full h-full"
              />
              <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 rounded-full w-6 h-6 flex items-center justify-center text-gray-700">
                ‹
              </button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 rounded-full w-6 h-6 flex items-center justify-center text-gray-700">
                ›
              </button>
            </div>
            <div className="w-full flex justify-between items-center mb-1">
              <div>
                <h4 className="text-sm font-medium">{p.title}</h4>
                <p className="text-blue-600 font-semibold">${p.price.toFixed(2)}</p>
                <div className="text-orange-400 text-xs flex items-center">
                  <span>{stars(p.rating)}</span>
                  <span className="ml-1 text-gray-500 text-[10px]">
                    ({p.reviews})
                  </span>
                </div>
              </div>
              <button
                aria-label="Add to favorites"
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
                  />
                </svg>
              </button>
            </div>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs rounded px-3 py-1">
              Edit Product
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminFavorites
