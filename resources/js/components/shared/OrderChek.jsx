import React from 'react';

const OrderCheck = ({ data }) => {
    const total = data.items.reduce((sum, item) => sum + item.total, 0);

    return (
        <div className="max-w-[280px] text-[10px] font-mono ">
            <h2 className="text-center text-[14px] font-bold">STROY LIGHT</h2>
            <p className="text-center">YANGI BOZOR XITOY QATOR 5-BLOK 46-DO'KON</p>
            <p className="text-center mb-1">Tel: +998910900070</p>
            <p className="text-center text-gray-500 text-[9px] mb-2">Kamchiliklar haqida 3 kun ichida xabar bering</p>

            <div className="flex justify-between mb-1">
                <div>
                    <p><strong>Mijoz:</strong> {data.address.first_name}</p>
                    <p><strong>Tel:</strong> {data.address.phone}</p>
                    <p><strong>Chek №:</strong> {data.items.length > 0 ? data.items[0].order_id : 'Nomaʼlum'}</p>
                </div>
                <div className="text-right">
                    <p><strong>Sana:</strong></p>
                    <p>{new Date(data.created_at).toLocaleString()}</p>
                </div>
            </div>

            <table className="w-full border-t border-b text-[9px]">
                <thead>
                    <tr className="border-y text-center">
                        <th className="py-1">№</th>
                        <th className='text-left px-2'>Nomi</th>
                        <th>O‘lch</th>
                        <th>Rang</th>
                        <th>Miqdor</th>
                        <th>Narx</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {data.items.map((item, idx) => (
                        <tr key={item.id} className="align-top">
                            <td>{idx + 1}.</td>
                            <td className='px-2 pr-5 text-left'>{item.product.product_name}</td>
                            <td>{item.size}</td>
                            <td>{item.color}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                    <tr className="font-semibold border-t">
                        <td colSpan="4" className="text-right">Jami:</td>
                        <td>{data.total_price}</td>
                    </tr>
                </tbody>
            </table>

            <p className="mt-3 text-center font-semibold text-[10px]">Xaridingiz uchun rahmat!</p>
        </div>
    );
};

export default OrderCheck;
