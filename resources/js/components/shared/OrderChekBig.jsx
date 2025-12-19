import React from 'react';

const CheckView = ({ data }) => {

  return (
    <div className="w-full p-2 font-sans text-sm">
      <h1 className="text-4xl font-extrabold text-center mb-2">STROY LIGHT</h1>
      <p className="text-center">YANGI BOZOR XITOY QATOR 5-BLOK 46-DO'KON</p>
      <p className="text-center mb-4">Telefon: +998910900070</p>

      <div className="grid grid-cols-2 text-sm gap-y-1 mb-4">
        <p><strong>Mijoz:</strong> {data.address.first_name} {data.address.last_name}</p>
        <p><strong>Chek №:</strong> {data.items.length > 0 ? data.items[0].order_id : 'Nomaʼlum'}</p>
        <p><strong>Mijoz tel:</strong> {data.address.phone}</p>
        <p><strong>Sana:</strong> {new Date(data.created_at).toLocaleString()}</p>
      </div>

      <table className="w-full border border-collapse mt-2">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-5 py-3 w-[5%]">№</th>
            <th className="border px-5 py-3 w-[100%] text-left">Nomi</th>
            <th className="border px-5 py-3 w-[5%]">O‘lcham</th>
            <th className="border px-5 py-3 w-[5%]">Rangi</th>
            <th className="border px-10 py-3 w-[20%]">Miqdor</th>
            <th className="border px-10 py-3 w-[20%]">Narx</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={item.id}>
              <td className="border px-5 py-3 text-center">{i + 1}</td>
              <td className="border px-5 w-96 py-3 text-left font-semibold">{item.product.product_name}</td>
              <td className="border px-10 py-3 text-center">{item.size}</td>
              <td className="border px-10 py-3 text-center">{item.color}</td>
              <td className="border px-10 py-3 text-center">{item.quantity}</td>
              <td className="border px-10 py-3 text-center">{item.price}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className="border px-10 py-3 text-right font-bold">Jami:</td>
            <td className="border px-10 py-3 text-right font-bold">{data.total_price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CheckView;
