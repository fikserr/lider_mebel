import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { HiOutlineChevronLeft } from "react-icons/hi";
import { toast } from '@/hooks/use-toast';

const EditAddress = () => {
  const { props } = usePage();
  const address = props.address || {};

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    street: '',
    city: '',
    house_number: '',
    region: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setFormData({
      first_name: address.first_name || '',
      last_name: address.last_name || '',
      street: address.street || '',
      city: address.city || '',
      house_number: address.house_number || '',
      region: address.region || '',
      phone: address.phone || '',
    });
  }, [address]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    router.put(`/address-update/${address.id}`, formData, {
      onSuccess: () => {
        toast({ title: "✅ Muvaffaqiyatli", description: "Manzil yangilandi!" });
        router.visit('/address');
      },
      onError: (errors) => {
        setErrors(errors);
        toast({ title: "❌ Xatolik", description: "Ma'lumotni tekshiring." });
      },
      onFinish: () => setProcessing(false),
    });
  };



  return (
    <div className='my-24 px-5 xl:px-32'>
      <div className='flex items-center gap-2 mb-6'>
        <HiOutlineChevronLeft className='text-2xl' />
        <Link href="/address" aria-label='Back to Address'>
          <h1 className='font-bold text-5xl font-oswald'>Joylashuv</h1>
        </Link>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-5'>
        <div className='col-span-4 my-5 px-10'>
          <div className='grid grid-cols-4 items-center pl-6'>
            <h2 className='col-span-3 text-2xl font-oswald' >Joylashuvni tahrirlash</h2>
          </div>

          <form onSubmit={handleSubmit} className='grid p-5 gap-5'>
            <InputBlock label="Ismingiz:" name="first_name" value={formData.first_name} onChange={setFormData} error={errors.first_name} />
            <InputBlock label="Familiyangiz:" name="last_name" value={formData.last_name} onChange={setFormData} error={errors.last_name} />
            <InputBlock label="Ko'changiz:" name="street" value={formData.street} onChange={setFormData} className="sm:col-span-2" error={errors.street} />
            <InputBlock label="Shahar:" name="city" value={formData.city} onChange={setFormData} error={errors.city} />
            <InputBlock label="Uy raqami / xonadon:" name="house_number" value={formData.house_number} onChange={setFormData} error={errors.house_number} />
            <InputBlock label="Viloyat / tuman:" name="region" value={formData.region} onChange={setFormData} error={errors.region} />
            <InputBlock label="Telefon raqamingiz:" name="phone" value={formData.phone} onChange={setFormData} error={errors.phone} />
            <div className='flex gap-4 pt-4'>
              <button
                type="submit"
                disabled={processing}
                className='bg-black text-white px-6 py-2 rounded'>
                Saqlash
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const InputBlock = ({ label, name, value, onChange, className = '', error }) => (
  <div className={`bg-slate-100 p-3 rounded-lg space-y-2 ${className}`}>
    <h3 className='font-oswald'>{label}</h3>
    <input
      type="text"
      value={value}
      onChange={e => onChange(prev => ({ ...prev, [name]: e.target.value }))}
      placeholder={`${label}ni kiriting`}
      className='bg-transparent w-full outline-none'
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default EditAddress;
