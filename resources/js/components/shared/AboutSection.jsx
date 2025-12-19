import React from 'react'
import { inbox, user, check } from '../../images';

const AboutSection = () => {
    return (
        <div className='px-5 xl:px-20 grid lg:grid-cols-3 grid-cols-1 gap-5 xl:gap-32 mt-10'>
            <div className='col-span-2'>
                <h2  className='text-lg md:text-2xl lg:text-5xl mb-2 font-oswald'>Xwear onlayn do'koni haqida</h2>
                <p className='text-sm lg:text-2xl'>
                    XWEAR jamoasi Xitoyning eng yirik Poizon bozoridagi original mahsulotlarni yetkazib berish xizmatini taqdim etadi, shuning uchun mijozlarimiz har bir xaridda 40% dan ko'proq tejaydi.
                    Biz vositachilarsiz ishlaymiz, bu bizga eng yaxshi narxni taklif qilish imkonini beradi. Tez, bepul yetkazib berish.
                    Xitoyning Poizon mobil ilovasini yuklab olmasdan, juda ko'p miqdordagi tovarlarni qulay filtrlash, shuningdek, tovarlarning yakuniy narxini darhol ko'rish imkoniyati bilan qulay xarid qilishingiz mumkin bo'lgan sayt
                </p>
            </div>
            <div className='my-5 flex flex-col gap-5 sm:flex-row lg:flex-col xl:max-w-sm bg-slate-100 p-5'>
                <div className="flex flex-col gap-3">
                    <div className='flex items-center md:items-center gap-3'>
                        <img src={inbox} alt="inbox image icon" style={{ width: "30px", height: "30px" }} />
                        <div className="flex flex-col">
                            <h3 className='font-bold text-md sm:text-xs md:text-base'>Rossiyaga bepul yetkazib berish</h3>
                            <p className=' text-xs'>Buyurtmangizni Rossiyaga mutlaqo bepul yetkazib beramiz</p>
                        </div>
                    </div>
                    <div className='flex items-center md:items-center gap-3'>
                        <img src={user} alt="user image icon" style={{ width: "30px", height: "30px" }} />
                        <div className="flex flex-col">
                            <h3 className='font-bold text-md sm:text-xs md:text-base'>Biz vositachilarsiz ishlaymiz</h3>
                            <p className=' text-xs'>Biz va mijoz o'rtasida uchinchi g'ildirak yo'q.</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center lg:items-center gap-3'>
                    <img src={check} alt="check image icon" style={{ width: "30px", height: "30px" }} />
                    <div className="flex flex-col">
                        <h3 className='font-bold text-xs md:text-base'>Buyurtma berish va ishlatish oson</h3>
                        <p className='text-xs'>Poizondan buyurtma berish uchun sizga hech qanday ilova kerak emas</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutSection
