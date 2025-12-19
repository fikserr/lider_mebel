import { Link } from '@inertiajs/react'
import React from 'react'

const OrderSuccess = () => {
    return (
        <div className="px-4 sm:px-10 md:px-20 lg:px-44 xl:px-64 py-10 min-h-screen pt-48">
            <h1 className="text-3xl font-bold mb-6 mt-16 text-center">Buyurtma muvaffaqiyatli rasmiylashtirildi!</h1>
            <p className="text-lg text-center mb-4">Rahmat! Sizning buyurtmangiz qabul qilindi.</p>
            <p className="text-center mt-4">Tez orada siz bilan bog‘lanamiz.</p>
            <div className="mt-8 text-center">
                <Link href={"/"} className="bg-black text-white px-6 py-2 rounded hover:bg-slate-600 transition-colors" aria-label='Go to Home Button'>
                    Bosh sahifaga qaytish
                </Link>
            </div>
        </div>
    )
}

export default OrderSuccess
