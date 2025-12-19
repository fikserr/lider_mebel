import React, { useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from './productCard';
import { useToast } from '@/hooks/use-toast';

export const HomeProducts = ({ data, favorites }) => {
    const [starredCards, setStarredCards] = useState(() => {
        const initialStars = {};
        favorites.forEach((item) => {
            initialStars[item.id] = true;
        });
        return initialStars;
    });

    const { toast } = useToast();

    const handleClick = async (event, id) => {
        event.preventDefault();
        if (starredCards[id]) {
            try {
                await axios.delete(`/favorites/${id}`);
                setStarredCards((prev) => ({ ...prev, [id]: false }));
                toast({
                    title: "Sevimlilardan o'chirildi",
                    description: "✅ Mahsulot o'chirildi",
                });
            } catch (error) {
                console.error(error);
                alert("Sevimlilardan o'chirishda xatolik ❌");
            }
        } else {
            try {
                await axios.post("/favorites", { product_id: id });
                setStarredCards((prev) => ({ ...prev, [id]: true }));
                toast({
                    title: "Sevimlilarga qo'shildi",
                    description: "✅ Mahsulot qo'shildi",
                });
            } catch (error) {
                console.error(error);
                alert("Sevimlilarga qo'shishda xatolik ❌");
            }
        }
    };

    return (
        <div>
            <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={2}
                navigation
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    992: { slidesPerView: 4 },
                }}
            >
                {data.slice(0, 5).map((item, index) => (
                    <SwiperSlide key={item.id}>
                        <ProductCard
                            item={item}
                            delay={index * 8000}
                            handleClick={handleClick}
                            isStarred={starredCards[item.id]}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

HomeProducts;

export const ClothesProducts = ({ data, favorites }) => {
    const [starredCards, setStarredCards] = useState(() => {
        const initialStars = {};
        favorites.forEach((item) => {
            initialStars[item.id] = true;
        });
        return initialStars;
    });

    const { toast } = useToast();

    const handleClick = async (event, id) => {
        event.preventDefault();
        if (starredCards[id]) {
            try {
                await axios.delete(`/favorites/${id}`);
                setStarredCards((prev) => ({ ...prev, [id]: false }));
                toast({
                    title: "Sevimlilardan o'chirildi",
                    description: "✅ Mahsulot o'chirildi",
                });
            } catch (error) {
                console.error(error);
                alert("Sevimlilardan o'chirishda xatolik ❌");
            }
        } else {
            try {
                await axios.post("/favorites", { product_id: id });
                setStarredCards((prev) => ({ ...prev, [id]: true }));
                toast({
                    title: "Sevimlilarga qo'shildi",
                    description: "✅ Mahsulot qo'shildi",
                });
            } catch (error) {
                console.error(error);
                alert("Sevimlilarga qo'shishda xatolik ❌");
            }
        }
    };

    return (
        <div>
            <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={2}
                navigation
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    992: { slidesPerView: 4 },
                }}
            >
                {data.slice(4, 9).map((item, index) => (
                    <SwiperSlide key={item.id}>
                        <ProductCard
                            item={item}
                            delay={index * 8000}
                            handleClick={handleClick}
                            isStarred={starredCards[item.id]}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

ClothesProducts;

export const AccessoryProducts = ({ data, favorites }) => {
    const [starredCards, setStarredCards] = useState(() => {
        const initialStars = {};
        favorites.forEach((item) => {
            initialStars[item.id] = true;
        });
        return initialStars;
    });

    const { toast } = useToast();

    const handleClick = async (event, id) => {
        event.preventDefault();
        if (starredCards[id]) {
            try {
                await axios.delete(`/favorites/${id}`);
                setStarredCards((prev) => ({ ...prev, [id]: false }));
                toast({
                    title: "Sevimlilardan o'chirildi",
                    description: "✅ Mahsulot o'chirildi",
                });
            } catch (error) {
                console.error(error);
                alert("Sevimlilardan o'chirishda xatolik ❌");
            }
        } else {
            try {
                await axios.post("/favorites", { product_id: id });
                setStarredCards((prev) => ({ ...prev, [id]: true }));
                toast({
                    title: "Sevimlilarga qo'shildi",
                    description: "✅ Mahsulot qo'shildi",
                });
            } catch (error) {
                console.error(error);
                alert("Sevimlilarga qo'shishda xatolik ❌");
            }
        }
    };

    return (
        <div>
            <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={2}
                navigation
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    992: { slidesPerView: 4 },
                }}
            >
                {data.slice(8, 12).map((item, index) => (
                    <SwiperSlide key={item.id}>
                        <ProductCard
                            item={item}
                            delay={index * 8000}
                            handleClick={handleClick}
                            isStarred={starredCards[item.id]}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

AccessoryProducts;
