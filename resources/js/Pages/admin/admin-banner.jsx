import React, { useState } from 'react'
import { useForm } from '@inertiajs/react'

const AdminBanner = () => {
    const [banner, setBanner] = useState(null)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        image: null,
    })

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setData('image', file)

            const reader = new FileReader()
            reader.onloadend = () => {
                setBanner(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/banners', {
            onSuccess: () => {
                toast.success('Banner muvaffaqiyatli qo‘shildi!')
                reset()
                setBanner(null)
            },
            onError: () => {
                toast.error('Xatolik yuz berdi')
            },
        })
    }

    return (
        <div className="p-6 min-h-screen font-sans xl:w-[1200px] mx-auto">
            <h1 className="text-3xl font-bold mb-4">Banner Qo‘shish Sahifasi</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <input
                        type="text"
                        placeholder="Enter banner description"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="border p-2 px-3 rounded-lg w-full outline-none"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="flex items-center justify-center w-full">
                    <label
                        htmlFor="dropzone-file"
                        className="relative flex flex-col items-center justify-center w-full h-[500px] border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden"
                    >
                        {!banner ? (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Rasm yuklash uchun buyerga bosing</span>
                                </p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (Yuklanishi tavfsiya qilinadigan Rasm hajmi 2 mb)</p>
                            </div>
                        ) : (
                            <img src={banner} alt="Preview" className="object-cover w-full h-full" loading="lazy"/>
                        )}
                        <input
                            id="dropzone-file"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>
                {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Saqlash
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AdminBanner
