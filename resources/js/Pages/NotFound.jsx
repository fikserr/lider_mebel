import React from 'react'
import { Link } from '@inertiajs/react'

const NotFound = () => {
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <h1 className="text-8xl font-extrabold">404</h1>
                    <p className="mt-4 text-2xl text-gray-700">Sahifa topilmadi</p>
                    <p className="mt-2 text-gray-500">Kechirasiz, qidirayotgan sahifangiz mavjud emas.</p>
                    <Link href="/" className="mt-6 inline-block px-10 py-3 bg-black text-white rounded-lg" aria-label='Go to Home Button'>
                        Bosh sahifaga qaytish
                    </Link>
                </div>
            </div>
        </div>
    )
}
NotFound.layout = null; // ❗ Bu yer eng muhim qism

export default NotFound
