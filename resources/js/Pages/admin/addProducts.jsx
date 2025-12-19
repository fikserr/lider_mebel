import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";

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
        variants: [{ sizes: "", colors: "", price: "" }], // 👈 to‘g‘rilandi
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
            { sizes: "", colors: "", price: "" }, // 👈 to‘g‘rilandi
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
                    description: "Mahsulot muvaffaqiyatli qo‘shildi",
                });
                window.location.href = "/admin-productStock";
            },
            onError: () => {
                toast({
                    title: "Xatolik",
                    description: "Ma'lumotlarni to‘ldirishda xatolik bor.",
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

                {/* ✅ Variantlar bo‘limi */}
                <div>
                    <h2 className="text-xl font-semibold mb-2 mt-6">
                        Mahsulot variantlari
                    </h2>
                    {data.variants.map((variant, index) => (
                        <div
                            key={index}
                            className="flex gap-4 mb-2 items-center"
                        >
                            <input
                                type="text"
                                placeholder="Razmerlar (e.g. S, M, L)"
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
                                className="border p-3 rounded w-1/3"
                            />

                            <input
                                type="text"
                                placeholder="Ranglar (e.g. red, blue)"
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
                                className="border p-3 rounded w-1/3"
                            />

                            <input
                                type="number"
                                placeholder="Narx (e.g. 100000)"
                                value={variant.price}
                                onChange={(e) =>
                                    handleVariantChange(
                                        index,
                                        "price",
                                        e.target.value
                                    )
                                }
                                className="border p-3 rounded w-1/3"
                            />
                            <button
                                type="button"
                                onClick={() => removeVariant(index)}
                                className="text-red-600 text-xl font-bold"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addVariant}
                        className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
                    >
                        ➕ Variant qo‘shish
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-6"
                >
                    {processing ? "Saqlanmoqda..." : "💾 Saqlash"}
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;
