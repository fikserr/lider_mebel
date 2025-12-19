import React, { useMemo, useState } from 'react'
import { Link } from '@inertiajs/react';
import { HiOutlineChevronLeft } from "react-icons/hi";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import ProfileSidebar from '@/components/shared/profile-sidebar';
import ProfileDropdown from '@/components/shared/profile-dropdown';

const statusColors = {
    pending: 'text-yellow-500',
    confirmed: 'text-blue-600',
    success: 'text-green-600',
    cancelled: 'text-red-600',
};
const limit = 6
const HistoryOrders = ({ orders }) => {
    const getStatusColor = (status) => statusColors[status] || 'text-gray-600';
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(orders.length / limit);
    const paginateOrders = useMemo(() => {
        const startIndex = (page - 1) * limit;
        return orders.slice(startIndex, startIndex + limit);
    }, [orders, page]);
    const goToPreviousPage = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };
    const goToNextPage = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    }


    return (
        <div className='my-24 px-5 xl:px-32'>
            <div className='flex items-center gap-2'>
                <HiOutlineChevronLeft className='text-2xl' />
                <Link href={"/profile"} aria-label='Profile link'><h1 className='font-bold text-5xl font-oswald' >Tarix</h1></Link>
            </div>
            <div className='grid lg:grid-cols-4 gap-5'>
                <ProfileSidebar />
                <div className='col-span-3 my-3'>
                    <div className='grid grid-cols-4 items-center'>
                        <h2 className='col-span-3 font-oswald' >Buyurtmalar</h2>
                        <ProfileDropdown />
                    </div>
                    <div className='grid grid-cols-1 sm500:grid-cols-2 md:grid-cols-3 p-5 gap-5'>
                        {
                            paginateOrders.map((order) => (
                                <div key={order.id} className='border p-3 flex justify-between py-5 rounded-lg'>
                                    <div className='space-y-1 font-bold'>
                                        <p>T/r</p>
                                        <p>Sanasi</p>
                                        <p>Tasnif</p>
                                        <p>Summa</p>
                                    </div>
                                    <div className='space-y-1 text-slate-600 text-end'>
                                        <p>{order.id}</p>
                                        <p>{new Date(order.created_at).toLocaleDateString()}</p>
                                        <p className={`${getStatusColor(order.status)} font-medium`}>{order.status}</p>
                                        <p>{order.total_price} so'm</p>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="flex items-center gap-2">
                            <button
                                onClick={goToPreviousPage}
                                disabled={page === 1}
                                className="px-6 py-1 border rounded disabled:opacity-50"
                            >
                                <ChevronLeft className="w-4" />
                            </button>
                            <span>Page {page} of {totalPages}</span>
                            <button
                                onClick={goToNextPage}
                                disabled={page === totalPages}
                                className="px-6 py-1 border rounded disabled:opacity-50"
                            >
                                <ChevronRight className="w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoryOrders
