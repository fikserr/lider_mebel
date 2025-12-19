import { useState, useEffect, useMemo, act } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import OrderModal from "@/components/shared/orderModal";

const Index = ({ detail }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [mainPhoto, setMainPhoto] = useState(detail?.photo1);
    const [activeSize, setActiveSize] = useState(null);
    const [activeColor, setActiveColor] = useState(null);
    const [activeVariant, setActiveVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [processing, setProcessing] = useState(false);
    const { toast } = useToast();

    const parsedVariants = useMemo(() => {
        return detail.variants.map((v) => ({
            ...v,
            sizes: Array.isArray(v.sizes) ? v.sizes : [],
            colors: Array.isArray(v.colors) ? v.colors : [],
        }));
    }, [detail.variants]);

    const sizes = useMemo(() => {
        const allSizes = parsedVariants.flatMap((v) => v.sizes);
        return [...new Set(allSizes)];
    }, [parsedVariants]);

    const availableColors = useMemo(() => {
        if (!activeSize) {
            return [...new Set(parsedVariants.flatMap((v) => v.colors))];
        }
        return [
            ...new Set(
                parsedVariants
                    .filter((v) => v.sizes.includes(activeSize))
                    .flatMap((v) => v.colors)
            ),
        ];
    }, [parsedVariants, activeSize]);

    useEffect(() => {
        if (activeSize && activeColor) {
            const found = parsedVariants.find(
                (v) =>
                    v.sizes.includes(activeSize) &&
                    v.colors.includes(activeColor)
            );
            setActiveVariant(found || null);
        } else {
            setActiveVariant(null);
        }
    }, [activeSize, activeColor, parsedVariants]);

    useEffect(() => {
        if (activeVariant) {
            if (!activeSize && activeVariant.sizes.length > 0) {
                setActiveSize(activeVariant.sizes[0]);
            }
            if (!activeColor && activeVariant.colors.length > 0) {
                setActiveColor(activeVariant.colors[0]);
            }
        }
    }, [activeVariant]);

    const handleAddToCart = () => {
        if (!activeVariant || !activeSize || !activeColor) {
            toast({
                title: "Xatolik",
                description: "Iltimos, o‘lcham va rangni tanlang",
                variant: "destructive",
            });
            return;
        }
        setProcessing(true);
       
        
        axios
            .post("/add-to-cart", {
                product_id: detail.id,
                quantity: quantity,
                size: activeSize,
                color: activeColor,
                price: activeVariant.price,
            })
            .then(() => {
                toast({
                    title: "Savatga qo‘shildi ✅",
                    description: `${detail.product_name} (${activeSize}, ${activeColor}) savatga qo‘shildi!`,
                });
                setModalOpen(true);
            })
            .catch((err) => {
                console.error(err.response?.data);
                toast({
                    title: "Xatolik",
                    description: "Savatga qo‘shishda xatolik yuz berdi.",
                    variant: "destructive",
                });
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    return (
        <div className="my-20 px-5 xl:px-32">
            <div className="grid sm:grid-cols-2 gap-5 md:gap-10 xl:grid-cols-2">
                {/* Rasm */}
                <div className="border-b-blue-300 grid gap-4 border-b-2">
                    {mainPhoto && (
                        <img
                            src={`/storage/${mainPhoto}?v=${Date.now()}`}
                            loading="lazy"
                            alt={detail.product_name || "Product image"}
                            className="w-full h-[350px] rounded-2xl object-cover"
                        />
                    )}
                    <div className="grid grid-cols-3 gap-3 mb-3">
                        {[detail.photo1, detail.photo2, detail.photo3].map(
                            (photo, index) =>
                                photo && (
                                    <img
                                        key={index}
                                        src={`/storage/${photo}?v=${Date.now()}`}
                                        loading="lazy"
                                        alt={`Product ${index + 1}`}
                                        className={`w-full h-[130px] object-cover rounded-lg cursor-pointer ${mainPhoto === photo
                                                ? "ring-2 ring-blue-400"
                                                : ""
                                            }`}
                                        onClick={() => setMainPhoto(photo)}
                                    />
                                )
                        )}
                    </div>
                </div>
                <div className="my-5">
                    <h1
                        className="text-2xl font-bold mb-4 font-oswald"

                    >
                        {detail.product_name}
                    </h1>
                    <h2 className="font-semibold mb-2 text-lg">O‘lchamlar:</h2>
                    <div className="flex gap-2 flex-wrap mb-4">
                        {sizes.map((size, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setActiveSize(size);
                                    setActiveColor(null);
                                }}
                                className={`border rounded-lg px-4 py-1 cursor-pointer ${activeSize === size
                                        ? "bg-black text-white"
                                        : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    <h2 className="font-semibold mb-2 text-lg">Ranglar:</h2>
                    <div className="flex gap-2 flex-wrap mb-4">
                        {availableColors.map((color, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveColor(color)}
                                className={`border rounded-full px-4 py-1 cursor-pointer ${activeColor === color
                                        ? "bg-black text-white"
                                        : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center justify-between mt-5">
                        <p
                        className="font-oswald"
                        >
                            Narxi:{" "}
                            {(activeVariant?.price ?? detail.price)}{" "}
                            <span className="text-sm text-slate-500">so'm</span>
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() =>
                                    setQuantity((prev) => Math.max(1, prev - 1))
                                }
                                className="border px-2"
                            >
                                -
                            </button>
                            <span>{quantity}</span>
                            <button
                                onClick={() => setQuantity((prev) => prev + 1)}
                                className="border px-2"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        disabled={processing}
                        className="mt-4 w-full bg-black text-white py-2 rounded-md disabled:opacity-50"
                    >
                        {processing ? "Yuklanmoqda..." : "Savatga qo‘shish"}
                    </button>
                    <div className="my-5 px-2 pt-2">
                        <p className="text-black border-b-blue-700 border-b-2 pb-2 cursor-pointer">
                            Tafsilotlar
                        </p>
                    </div>

                    <div className="space-y-2">
                        {["Kategoriya", "Brend", "Rangi"].map(
                            (label, index) => {
                                const values = [
                                    detail?.category?.name || "Noma'lum",
                                    detail?.brend || "Yo‘q",
                                    activeColor || "Noma'lum",
                                ];
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between font-oswald"
                                    >
                                        <h3 style={{ fontSize: "20px" }}>
                                            {label}
                                        </h3>
                                        <span className="text-slate-600 flex items-center">
                                            {values[index]}{" "}
                                            <HiOutlineChevronRight />
                                        </span>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>

            <OrderModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
};

export default Index;
