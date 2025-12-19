import React, { useState, useMemo } from "react";
import axios from "axios";
import { ImStarFull, ImStarEmpty } from "react-icons/im";
import favoriteImg from "@images/favorite.png";
import { useToast } from "@/hooks/use-toast"; // Agar sizda mavjud bo'lsa
import { Link } from "@inertiajs/react";

const EmptyFavorites = ({ favorites = [], products = [] }) => {
    const { toast } = useToast();
    const productList = Array.isArray(products) ? products : products?.data || [];
    const [localFavorites, setLocalFavorites] = useState(favorites);
    const favoriteProducts = useMemo(
        () =>
            productList.filter((product) =>
                localFavorites?.some((fav) => fav.id === product.id)
            ),
        [productList, localFavorites]
    );
    const initialStars = useMemo(() => {
        const stars = {};
        favoriteProducts.forEach((product) => {
            stars[product.id] = true;
        });
        return stars;
    }, [favoriteProducts]);

    const [starredCards, setStarredCards] = useState(initialStars);
    const handleClick = async (id) => {
        try {
            if (starredCards[id]) {
                await axios.delete(`/favorites/${id}`);
                toast({
                    title: "Sevimlilardan o'chirildi",
                    description: "✅ Mahsulot o'chirildi",
                });
                // Lokal state dan ham o'chirish
                setLocalFavorites((prev) => prev.filter((fav) => fav.id !== id));
            } else {
                await axios.post("/favorites", { product_id: id });
                toast({
                    title: "Sevimlilarga qo'shildi",
                    description: "✅ Mahsulot qo'shildi",
                });
                // Lokal state ga qo'shish
                const addedProduct = productList.find((p) => p.id === id);
                setLocalFavorites((prev) => [...prev, addedProduct]);
            }

            setStarredCards((prev) => ({ ...prev, [id]: !prev[id] }));
        } catch (error) {
            console.error(error);
            alert(
                starredCards[id]
                    ? "Sevimlilardan o'chirishda xatolik ❌"
                    : "Sevimlilarga qo'shishda xatolik ❌"
            );
        }
    };

    // Agar sevimli mahsulotlar mavjud bo'lsa
    if (favorites.length > 0 && favoriteProducts.length > 0) {
        return (
            <div className="w-10/12 mx-auto min-h-screen">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 mt-24">SEVIMLILAR</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favoriteProducts.map((product) => {
                        const isStarred = starredCards[product.id];
                        return (
                            <div
                                key={product.id}
                                className="relative rounded-lg"
                            >
                                <img
                                    src={`/storage/${product.photo1}`}
                                    loading="lazy"
                                    alt={product.product_name}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="flex justify-between items-end">
                                    <div className="">
                                        <h3 className="text-lg font-semibold">{product.product_name}</h3>
                                        <p className="text-black font-bold mt-1">
                                            {product.variants?.length > 0
                                                ? `${product.variants[0].price.toLocaleString()} so'm`
                                                : "Narx mavjud emas"}
                                        </p>
                                    </div>
                                    <Link href={`/detail/${product.id}`} className='hidden sm:block' aria-label="View More Button">
                                        <button className='bg-black text-white w-full p-2 rounded-lg hover:bg-gray-800 transition xl:px-8'>
                                            Ko'proq
                                        </button>
                                    </Link>
                                </div>
                                <button
                                    onClick={() => handleClick(product.id)}
                                    className="absolute top-4 right-4 z-10"
                                    aria-label="Star Button"
                                >
                                    {isStarred ? (
                                        <ImStarFull className="text-2xl text-yellow-400" />
                                    ) : (
                                        <ImStarEmpty className="text-2xl text-black" />
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Agar sevimli mahsulotlar yo'q bo'lsa
    return (
        <div className="mt-24 px-5 md:px-10 xl:px-20 min-h-screen">
            <h1 className="text-3xl md:text-4xl font-bold">SEVIMLILAR</h1>
            <div className="flex flex-col items-center justify-center w-full h-screen mb-32 px-4 text-center">
                <div className="w-24 h-24 mb-6">
                    <img
                        src={favoriteImg}
                        loading="lazy"
                        alt="Bo'sh sevimlilar ikonkasi"
                        className="w-full h-full object-contain"
                    />
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">
                    SEVIMLI MAHSULOTLARINGIZ HALI YO‘Q.
                </h2>
                <p className="max-w-md text-gray-600 mb-6">
                    Yoqtirgan mahsulotlaringizni yo‘qotmaslik uchun ularni sevimlilarga
                    qo‘shing. "Katalog" sahifasida siz ko‘plab qiziqarli mahsulotlarni
                    topishingiz mumkin.
                </p>
                <button
                    className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
                    onClick={() => (window.location.href = "/")}
                >
                    KATALOGGA O‘TISH
                </button>
            </div>
        </div>
    );
};

export default EmptyFavorites;
