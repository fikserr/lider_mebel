import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import { Pagination, PaginationContent, PaginationItem } from "@ui/pagination";
import { HiOutlineSearch } from "react-icons/hi";

const ProductStock = ({ products }) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedPhotoKeys, setSelectedPhotoKeys] = useState([]);
    const [imageIndexes, setImageIndexes] = useState({});
    const [modalImage, setModalImage] = useState(null);
    const { toast } = useToast();
    const openImgModal = (productId, imagePath, photos) => {
        setModalImage(imagePath);
        setCurrentProductId(productId);
        setCurrentPhotos(photos);
    };
    const [currentProductId, setCurrentProductId] = useState(null);
    const [currentPhotos, setCurrentPhotos] = useState([]);
    const [search, setSearch] = useState("");
    const confirmPhotoDelete = (productId, photoKeys) => {
        setSelectedProductId(productId);
        setSelectedPhotoKeys(photoKeys);
        setShowConfirmModal(true);
    };
    const closeConfirmModal = () => {
        setShowConfirmModal(false);
        setSelectedProductId(null);
        setSelectedPhotoKeys([]);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndexes((prev) => {
                const updated = {};
                products.data.forEach((product) => {
                    const photos = [
                        product.photo1,
                        product.photo2,
                        product.photo3,
                    ].filter(Boolean);
                    const currentIndex = prev[product.id] || 0;
                    updated[product.id] = (currentIndex + 1) % photos.length;
                });
                return updated;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [products]);

    const closeModal = () => {
        setModalImage(null);
    };
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        // Laravel route bilan sozlanishi kerak: route('admin.users')
        router.get("/admin-users", { search: value }, { preserveState: true });
    };

    const deleteProduct = async (productId) => {
        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            const response = await fetch(`/admin-delete-product/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                    "X-Requested-With": "XMLHttpRequest",
                },
            });

            if (response.ok) {
                const data = await response.json();
                toast({
                    title: "✅ Mahsulot o‘chirildi",
                    description: data.message,
                });

                // Refresh qilsin:
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                toast({
                    variant: "destructive",
                    title: "❌ Xatolik",
                    description: "Mahsulotni o‘chirishda muammo yuz berdi.",
                });
            }
        } catch (error) {
            console.error("Xatolik:", error);
            toast({
                variant: "destructive",
                title: "❌ Server xatosi",
                description: "Tarmoqda muammo yuz berdi.",
            });
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get(
                "/admin-productStock",
                { search },
                { preserveState: true }
            );
        }, 500); // 500ms kutadi, foydalanuvchi yozishni to‘xtatguncha

        return () => clearTimeout(delayDebounceFn);
    }, [search]);
    return (
        <div className="p-6 mx-5 w-[1200px]">
            <h1 className="text-3xl font-bold mb-4">Product Stock</h1>
            <div className="mb-4 flex items-center border max-w-sm rounded-lg px-3">
                <input
                    placeholder="Tovarlar nomi bilan izlash..."
                    value={search}
                    onChange={handleSearchChange}
                    className="w-full border-none outline-none p-1"
                />
                <HiOutlineSearch style={{ fontSize: "22px" }} />
            </div>
            <div className="">
                <table className="w-full text-sm">
                    <thead className="text-left border-b">
                        <tr>
                            <th className="py-2">Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Brand</th>
                            <th>Available Color</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.data.map((product, idx) => {
                            const photos = [
                                product.photo1,
                                product.photo2,
                                product.photo3,
                            ].filter(Boolean);
                            const currentImage =
                                photos[imageIndexes[product.id] || 0];
                            return (
                                <tr
                                    key={idx}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="py-2">
                                        <div className="relative w-24 h-24 flex items-center justify-center">
                                            <img
                                                src={`/storage/${currentImage}?v=${Date.now()}`}
                                                loading="lazy"
                                                alt={product.product_name}
                                                className="w-20 h-20 rounded object-cover cursor-zoom-in"
                                                onClick={() =>
                                                    openImgModal(
                                                        product.id,
                                                        `/storage/${currentImage}`,
                                                        photos
                                                    )
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td>{product.product_name}</td>
                                    <td>{product.category?.name || "—"}</td>
                                    <td>{product.price}</td>
                                    <td>{product.brend}</td>
                                    <td>{product.colors}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            <Button
                                                size="icon"
                                                variant="outline"
                                            >
                                                <Link
                                                    href={`/admin-products/${product.id}/edit`}
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="text-red-500"
                                                onClick={() =>
                                                    deleteProduct(product.id)
                                                }
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {modalImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                        <div className="relative max-w-3xl w-full mx-4">
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-xl"
                                title="Yopish"
                            >
                                ✖
                            </button>
                            {currentPhotos.length > 1 && (
                                <button
                                    onClick={() => {
                                        const index = currentPhotos.findIndex(
                                            (img) =>
                                                `/storage/${img}` === modalImage
                                        );
                                        const prevIndex =
                                            (index - 1 + currentPhotos.length) %
                                            currentPhotos.length;
                                        setModalImage(
                                            `/storage/${currentPhotos[prevIndex]}`
                                        );
                                    }}
                                    className="absolute left-2 top-1/2 hover:bg-black duration-700 bg-opacity-55 text-white p-2 px-4 rounded"
                                >
                                    &#8249;
                                </button>
                            )}
                            <img
                                src={modalImage}
                                loading="lazy"
                                alt="Product preview"
                                className="max-h-[70vh] w-full object-cover rounded shadow-lg"
                            />
                            {currentPhotos.length > 1 && (
                                <button
                                    onClick={() => {
                                        const index = currentPhotos.findIndex(
                                            (img) =>
                                                `/storage/${img}` === modalImage
                                        );
                                        const nextIndex =
                                            (index + 1) % currentPhotos.length;
                                        setModalImage(
                                            `/storage/${currentPhotos[nextIndex]}`
                                        );
                                    }}
                                    className="absolute right-2 top-1/2 hover:bg-black duration-700 bg-opacity-50 text-white p-2 px-4 rounded"
                                >
                                    &#8250;
                                </button>
                            )}
                        </div>
                    </div>
                )}
                {showConfirmModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                            <h2 className="text-xl font-semibold mb-4">
                                Tovarni o‘chirishni tasdiqlang
                            </h2>
                            <p className="mb-6">
                                Ushbu tovarni rostdan ham o‘chirib
                                tashlamoqchimisiz?
                            </p>
                            <div className="flex justify-end gap-4">
                                <Button
                                    variant="outline"
                                    onClick={closeConfirmModal}
                                >
                                    Bekor qilish
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={deleteProduct}
                                >
                                    O‘chirish
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
                {products.total ? (
                    <Pagination className="mt-5">
                        <PaginationContent>
                            {products.links.map((item, i) => (
                                <PaginationItem key={i}>
                                    {item.url ? (
                                        <Link
                                            href={item.url}
                                            className={`px-3 py-1 rounded hover:bg-gray-200 ${
                                                item.active
                                                    ? "bg-gray-300 font-bold"
                                                    : ""
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: item.label,
                                            }}
                                        />
                                    ) : (
                                        <span
                                            className="px-3 py-1 text-gray-400"
                                            dangerouslySetInnerHTML={{
                                                __html: item.label,
                                            }}
                                        />
                                    )}
                                </PaginationItem>
                            ))}
                        </PaginationContent>
                    </Pagination>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default ProductStock;
