import React from 'react';

const OrderModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-5">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-72 text-center">
                <h2 className="text-xl font-semibold mb-4">Mahsulot muvaffaqiyatli yuborildi ✅</h2>
                <p className='text-slate-500'>Xaridingizdan mamnunmiz</p>
                <p className='text-slate-500'>Bizning mahsulotlarimizni tanlaganingiz uchun rahmat</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-green-900 transition duration-200"
                >
                    Yopish
                </button>
            </div>
        </div>
    );
};

export default OrderModal;
