import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

const AddCategory = ({categoriesList}) => {
  const { toast } = useToast();

  
  /* ================= STATES ================= */
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
console.log(categoriesList);

  /* ================= FETCH ================= */
  const fetchCategories = async () => {
    try {
      const res = await axios.get('/admin/categories');

      if (Array.isArray(res.data)) {
        setCategories(res.data);
      } else if (Array.isArray(res.data.categories)) {
        setCategories(res.data.categories);
      } else {
        setCategories([]);
      }
    } catch {
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= CREATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      if (image) formData.append('image', image);

      await axios.post('/admin/categories', formData);

      toast({
        title: 'Muvaffaqiyatli',
        description: 'Kategoriya qo‘shildi',
      });

      setName('');
      setImage(null);
      setPreviewImage(null);
      fetchCategories();
    } catch {
      toast({
        title: 'Xatolik',
        description: 'Kategoriya qo‘shilmadi',
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= IMAGE ================= */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  /* ================= RENDER ================= */
  return (
    <div className="p-6 min-h-screen xl:w-[1200px] my-10 space-y-10">

      {/* ===== ADD FORM ===== */}
      <div>
        <h1 className="text-3xl font-bold mb-6">Yangi kategoriya qo‘shish</h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">

          <div className="flex justify-center">
            <div className="relative w-28 h-28">
              <div className="w-full h-full bg-slate-200 rounded-full overflow-hidden flex items-center justify-center">
                {previewImage ? (
                  <img
                    src={previewImage}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-5xl">📷</span>
                )}
              </div>

              <label className="absolute inset-0 cursor-pointer flex items-center justify-center hover:bg-black/30 rounded-full">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                <span className="text-xs text-white bg-black/60 px-2 py-1 rounded-full">
                  Upload
                </span>
              </label>
            </div>
          </div>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Kategoriya nomi"
            className="border px-4 py-2 rounded w-full"
            required
          />

          <button
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Yuklanmoqda...' : 'Saqlash'}
          </button>
        </form>
      </div>

      {/* ===== TABLE ===== */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Kategoriyalar</h2>

        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Rasm</th>
              <th className="border px-4 py-2">Nomi</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 && (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-500">
                  Kategoriya yo‘q
                </td>
              </tr>
            )}

            {categories.map((cat, i) => (
              <tr key={cat.id} className="text-center">
                <td className="border px-4 py-2">{i + 1}</td>

                <td className="border px-4 py-2">
                  {cat.image && (
                    <img
                      src={`/storage/${cat.image}`}
                      className="w-10 h-10 object-cover rounded-full mx-auto"
                    />
                  )}
                </td>

                <td className="border px-4 py-2">
                  {cat.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AddCategory;
