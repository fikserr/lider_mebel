import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({});
  const { toast } = useToast();
  const [previewImages, setPreviewImages] = useState({
    photo1: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await axios.post('/admin/categories', { name });

      toast({
        title: 'Muvaffaqiyatli',
        description: `Kategoriya "${name}" qo‘shildi`,
      });

      setName('');
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        toast({
          title: 'Xatolik',
          description: 'Kategoriya qo‘shishda xatolik yuz berdi',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setImage((prev) => ({ ...prev, [key]: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prev) => ({ ...prev, [key]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 min-h-screen font-sans xl:w-[1200px] my-10">
      <h1 className="text-3xl font-bold mb-4">Yangi kategoriya qo‘shish</h1>
      
      <div className='flex flex-col'>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
        <div className="flex gap-24 justify-center">
        {[1].map((i) => (
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
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Kategoriya nomi (masalan: Telefon)"
            className="max-w-xl border px-4 py-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white px-6 py-2 rounded max-w-xs hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {loading ? 'Yuklanmoqda...' : 'Saqlash'}
          </button>
        </form>
      </div>

    </div>
  );
};

export default AddCategory;
