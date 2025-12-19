import { Link } from "@inertiajs/react";
import React from "react";

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">MAHSULOT SAVATI</h1>

            <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-6">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                        alt="Bo'sh savat ikon"
                        className="w-full h-auto object-contain"
                    />
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">
                    SAVATINGIZ HOZIRDA BO‘SH.
                </h2>
                <p className="max-w-md text-gray-600 mb-6">
                    Buyurtma berishdan oldin, iltimos, bir nechta mahsulotlarni savatga qo‘shing. "Katalog" sahifasida siz ko‘plab qiziqarli mahsulotlarni topishingiz mumkin.
                </p>
                <Link
                    className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
                    href="/"
                    aria-label="Go to Catalog Button"
                >
                    KATALOGGA O‘TISH
                </Link>
            </div>
        </div>
    );
};

export default EmptyCart;