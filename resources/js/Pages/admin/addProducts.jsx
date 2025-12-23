import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import { Plus, X } from "lucide-react";

const AddProductForm = ({ categories }) => {
    const { toast } = useToast();
    const [previewImages, setPreviewImages] = useState({
        photo1: null,
        photo2: null,
        photo3: null,
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        product_name: "",
        category_id: "",
        brend: "",
        photo1: null,
        photo2: null,
        photo3: null,
        variants: [], 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleFileUpload = (e, key) => {
        const file = e.target.files[0];
        if (file) {
            setData(key, file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImages((prev) => ({ ...prev, [key]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVariantChange = (index, field, value) => {
        const updatedVariants = [...data.variants];
        if (field === "sizes" || field === "colors") {
            updatedVariants[index][field] = value
                .split(",")
                .map((i) => i.trim());
        } else {
            updatedVariants[index][field] = value;
        }
        setData("variants", updatedVariants);
    };

    const addVariant = () => {
        setData("variants", [
            ...data.variants,
            { sizes: "", colors: "", price: "" },
        ]);
    };

    const removeVariant = (index) => {
        const updatedVariants = data.variants.filter((_, i) => i !== index);
        setData("variants", updatedVariants);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast({
            title: "Saqlanmoqda...",
            description: "Mahsulot qo'shilmoqda, iltimos kuting...",
        });

        post("/admin-add-store", {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setPreviewImages({ photo1: null, photo2: null, photo3: null });
                toast({
                    title: "Success",
                    description: "Mahsulot muvaffaqiyatli qo'shildi",
                });
                window.location.href = "/admin-productStock";
            },
            onError: () => {
                toast({
                    title: "Xatolik",
                    description: "Ma'lumotlarni to'ldirishda xatolik bor.",
                });
            },
        });
    };

    return (
        <div className="px-5 w-[1200px]">
            <h1 className="text-3xl font-bold mb-4 p-5">Mahsulot qo'shish</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 max-w-4xl mx-auto"
            >
                <div className="flex gap-24 justify-center">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center hover:scale-110 transition-all duration-700"
                        >
                            <div className="relative group w-24 h-24">
                                <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                    {previewImages[`photo${i}`] ? (
                                        <img
                                            src={previewImages[`photo${i}`]}
                                            loading="lazy"
                                            alt={`Preview ${i}`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-5xl animate-pulse">
                                            📷
                                        </span>
                                    )}
                                </div>
                                <label className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-0 hover:bg-opacity-30 rounded-full transition">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) =>
                                            handleFileUpload(e, `photo${i}`)
                                        }
                                    />
                                    <span className="text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded-full">
                                        Upload
                                    </span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <input
                        name="product_name"
                        value={data.product_name}
                        onChange={handleChange}
                        placeholder="Product name"
                        className="w-full border p-5 rounded-lg outline-none"
                    />
                    {errors.product_name && (
                        <div className="text-red-600">
                            {errors.product_name}
                        </div>
                    )}

                    <select
                        name="category_id"
                        value={data.category_id}
                        onChange={handleChange}
                        className="w-full border p-5 rounded-lg outline-none"
                    >
                        <option value="">Kategoriya tanlang</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && (
                        <div className="text-red-600">{errors.category_id}</div>
                    )}

                    <input
                        name="brend"
                        value={data.brend}
                        onChange={handleChange}
                        placeholder="Brend"
                        className="w-full border p-5 rounded-lg outline-none"
                    />
                </div>

                <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">
                            Mahsulot variantlari
                        </h2>
                        <button
                            type="button"
                            onClick={addVariant}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            <Plus className="w-5 h-5" />
                            Variant qo'shish
                        </button>
                    </div>

                    {data.variants.length > 0 && (
                        <div className="space-y-3 mt-4">
                            {data.variants.map((variant, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all"
                                >
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Razmerlar (masalan: S, M, L)"
                                            value={
                                                Array.isArray(variant.sizes)
                                                    ? variant.sizes.join(", ")
                                                    : variant.sizes
                                            }
                                            onChange={(e) =>
                                                handleVariantChange(
                                                    index,
                                                    "sizes",
                                                    e.target.value
                                                )
                                            }
                                            className="border p-3 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-300"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Ranglar (masalan: qizil, ko'k)"
                                            value={
                                                Array.isArray(variant.colors)
                                                    ? variant.colors.join(", ")
                                                    : variant.colors
                                            }
                                            onChange={(e) =>
                                                handleVariantChange(
                                                    index,
                                                    "colors",
                                                    e.target.value
                                                )
                                            }
                                            className="border p-3 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-300"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <input
                                            type="number"
                                            placeholder="Narx (masalan: 100000)"
                                            value={variant.price}
                                            onChange={(e) =>
                                                handleVariantChange(
                                                    index,
                                                    "price",
                                                    e.target.value
                                                )
                                            }
                                            className="border p-3 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-300"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeVariant(index)}
                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    {data.variants.length === 0 && (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <p className="text-gray-500">
                                Hozircha variant qo'shilmagan. "Variant qo'shish" tugmasini bosing.
                            </p>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg mt-6 font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? "Saqlanmoqda..." : "💾 Saqlash"}
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;