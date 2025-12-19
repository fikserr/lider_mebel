import EmptyCart from "@/components/shared/EmptyCart";
import { BiSolidTrash } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { router } from "@inertiajs/react";
import axios from "axios";

const CartPage = ({ cartItems, address }) => {
    const [items, setItems] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [processingOrder, setProcessingOrder] = useState(false);
    const { toast } = useToast();
    
    useEffect(() => {
        if (address && address.length > 0) {
            setSelectedAddressId(address[0].id);
        }
    }, [address]);

    useEffect(() => {
        setItems(cartItems || []);
    }, [cartItems]);

    const calculateTotal = (items) => {
        return items.reduce((total, item) => {
            return total + (item.price ?? 0) * item.quantity;
        }, 0);
    };

    const handleDelete = (id) => {
        router.delete(`/cart/${id}`, {
            onSuccess: () => {
                toast({
                    title: "Mahsulot o‘chirildi",
                    description: "Sizning savatingizdan mahsulot o‘chirildi.",
                });
                setItems((prev) => prev.filter((item) => item.id !== id));
            },
            onError: () => {
                toast({
                    title: "Xatolik",
                    description: "Mahsulotni o‘chirishda xatolik yuz berdi.",
                });
            },
        });
    };

    const handlePlaceOrder = () => {
        if (!selectedAddressId) {
            toast({
                title: "Manzil tanlanmadi",
                description: "Iltimos, yetkazish manzilini tanlang.",
            });
            return;
        }
        setProcessingOrder(true);
        axios
            .post("/place-order", {
                address_id: Number(selectedAddressId),
            })
            .then(() => {
                window.location.href = "/order-success";
            })
            .catch(() => {
                toast({
                    title: "Xatolik",
                    description: "Buyurtma berishda xatolik yuz berdi.",
                });
            })
            .finally(() => {
                setProcessingOrder(false);
            });
    };

    if (!items || items.length === 0) {
        return <EmptyCart cartItems={items} />;
    }

    return (
        <div className="px-10 sm:px-10 md:px-20 lg:px-44 xl:px-64 py-10 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 mt-16">Savat</h1>
            <div className="grid lg:grid-cols-2 gap-3">
                {items.map((item) => {
                    const selectedColor = item.color || "Noma'lum";
                    const selectedSize = item.size || "Noma'lum";
                    const price = item.price ?? 0;

                    return (
                        <div
                            key={item.id}
                            className="border w-full rounded-lg p-4 flex items-center justify-between"
                        >
                            <div className="flex items-start gap-4">
                                <img
                                    src={`/storage/${item.product?.photo1}`}
                                    loading="lazy"
                                    alt={item.product?.product_name}
                                    className="w-20 h-20 sm:w-32 sm:h-32 object-cover rounded"
                                />
                                <div className="space-y-1">
                                    <h2 className="font-semibold text-xl">
                                        {item.product?.product_name}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Size: {selectedSize}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Color: {selectedColor}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Narxi: {price.toLocaleString()} so‘m
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-4">
                                <button
                                    className="text-red-500 hover:text-red-700 text-xl"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <BiSolidTrash />
                                </button>
                                <p className="flex gap-2">
                                    {item.quantity} <span>dona</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-slate-200 p-3 rounded-lg mt-5">
                <div className="my-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Yetkazish manzili
                    </label>
                    <select
                        value={selectedAddressId}
                        onChange={(e) => setSelectedAddressId(e.target.value)}
                        className="border px-4 py-2 rounded w-full outline-none bg-slate-100"
                    >
                        {address?.map((addr) => (
                            <option key={addr.id} value={addr.id}>
                                {addr.region}, {addr.city}, {addr.street},{" "}
                                {addr.house_number}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-10 flex justify-between items-center border-t pt-6">
                    <h3 className="text-xl font-bold">
                        Umumiy: {calculateTotal(items).toLocaleString()} so‘m
                    </h3>
                    <button
                        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition disabled:opacity-50"
                        onClick={handlePlaceOrder}
                        disabled={processingOrder}
                    >
                        {processingOrder ? "Yuborilmoqda..." : "Buyurtma berish"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
