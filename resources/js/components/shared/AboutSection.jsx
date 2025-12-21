import React from 'react'
import { inbox, user, check } from '../../images';

const AboutSection = () => {
    return (
        <div className='px-5 xl:px-20 grid lg:grid-cols-3 grid-cols-1 gap-5 xl:gap-32 mt-10'>
            <div className='col-span-2'>
                <h2 className='text-lg md:text-2xl lg:text-5xl mb-2 font-oswald'>Lider Mebel haqida</h2>
                <p className='text-sm lg:text-2xl'>
                    Lider Mebel — zamonaviy va sifatli mebellarni qulay narxlarda taqdim etuvchi onlayn va oflayn do‘kon.
                    Biz mijozlarimizga ishlab chiqaruvchidan to‘g‘ridan-to‘g‘ri yetkazib berish orqali ortiqcha vositachilarsiz ishlaymiz, bu esa narxlarni yanada hamyonbop qiladi.
                    <br />
                    Har bir buyurtmada siz sifat, qulaylik va ishonchlilikni his qilasiz.
                    Mahsulotlarimiz keng tanlovga ega bo‘lib, ularni dizayn, o‘lcham va funksionallik bo‘yicha oson tanlashingiz mumkin.
                    <br />
                    Tez va ishonchli yetkazib berish, shaffof narxlar hamda individual buyurtma imkoniyati — bizning asosiy ustunliklarimizdan biridir.
                    Lider Mebel bilan uyingiz yanada chiroyli va qulay bo‘ladi.
                </p>
            </div>
            <div className='my-5 flex flex-col gap-5 sm:flex-row lg:flex-col xl:max-w-sm bg-slate-100 p-5'>
                <div className="flex flex-col gap-3">
                    <div className='flex items-center md:items-center gap-3'>
                        <img src={inbox} alt="inbox image icon" style={{ width: "30px", height: "30px" }} />
                        <div className="flex flex-col">
                            <h3 className='font-bold text-md sm:text-xs md:text-base'>O‘zbekiston bo‘ylab bepul yetkazib berish</h3>
                            <p className=' text-xs'>Buyurtmangizni O‘zbekiston hududi bo‘ylab tez va mutlaqo bepul yetkazib beramiz.</p>
                        </div>
                    </div>
                    <div className='flex items-center md:items-center gap-3'>
                        <img src={user} alt="user image icon" style={{ width: "30px", height: "30px" }} />
                        <div className="flex flex-col">
                            <h3 className='font-bold text-md sm:text-xs md:text-base'>Biz vositachilarsiz ishlaymiz</h3>
                            <p className=' text-xs'>Biz ishlab chiqaruvchi va mijoz o‘rtasida to‘g‘ridan-to‘g‘ri ishlaymiz. Ortiqcha xarajatlar yo‘q — faqat adolatli narxlar.</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center lg:items-center gap-3'>
                    <img src={check} alt="check image icon" style={{ width: "30px", height: "30px" }} />
                    <div className="flex flex-col">
                        <h3 className='font-bold text-xs md:text-base'>Buyurtma berish oson va qulay</h3>
                        <p className='text-xs'>Buyurtma berish uchun hech qanday ilova talab qilinmaydi. Sayt yoki Telegram/WhatsApp orqali tezda buyurtma berishingiz mumkin.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutSection
