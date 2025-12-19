import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import LogoFooter from "@images/LogoFooter.WebP";
import telegram from "@images/telegram.WebP";
import whatsapp from "@images/whatsapp.WebP";
import vk from "@images/vk.WebP";
import { Link } from "@inertiajs/react";

const Footer = () => {
    return (
        <footer className="bg-[rgb(18,18,20)]  ">
            {/* Mobile logo */}
            <div className="flex justify-center py-5 md:hidden">
                <img
                    src={LogoFooter}
                    alt="Pro Sys Logo"
                    loading="lazy"
                    width="100"
                    height="50"
                    className="w-[100px] h-auto"
                />
            </div>

            {/* Mobile dropdowns */}
            <div className="md:hidden px-5 space-x-2 sm:space-x-4 flex flex-col w-full font-oswald">
                <Accordion type="single" collapsible className="w-full">
                    {/* Ma'lumot */}
                    <AccordionItem value="malumot">
                        <AccordionTrigger className="px-5 text-3xl text-white rounded-md uppercase">
                            Ma'lumot
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col space-y-2 py-2 text-white">
                            <Link href="#" aria-label="Information Link">
                                <span>Ma'lumot</span>
                            </Link>
                            <Link href="#" aria-label="Blog Link">
                                <span>Blog</span>
                            </Link>
                            <Link href="#" aria-label="Contacts Link">
                                <span>Kontaktlar</span>
                            </Link>
                            <Link href="#" aria-label="Delivery Link">
                                <span>To'lov</span>
                            </Link>
                            <Link href="#" aria-label="FAQ Link">
                                <span>FAQ</span>
                            </Link>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Katalog */}
                    <AccordionItem value="katalog">
                        <AccordionTrigger className="px-5 text-3xl text-white rounded-md uppercase">
                            Katalog
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col space-y-2 py-2 text-white">
                            <Link href="#" aria-label="Catalog Link">
                                <span>Katalog</span>
                            </Link>
                            <Link href="/category/3" aria-label="Clothes Link">
                                <span>Kiyimlar</span>
                            </Link>
                            <Link href="/category/4" aria-label="Shoes Link">
                                <span>Oyoq kiyimlar</span>
                            </Link>
                            <Link
                                href="/category/1"
                                aria-label="Accessories Link"
                            >
                                <span>Aksessuarlar</span>
                            </Link>
                            <Link href="#" aria-label="Calculate Expenses Link">
                                <span>Xarajatlarni hisoblash</span>
                            </Link>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Kontaktlar */}
                    <AccordionItem value="kontaktlar">
                        <AccordionTrigger className="px-5 text-3xl text-white rounded-md uppercase">
                            Kontaktlar
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col space-y-2 py-2 text-white">
                            <Link href="#" aria-label="Contacts Link">
                                <span>Kontaktlar</span>
                            </Link>
                            <Link
                                href="mailto:info@xwear.info"
                                aria-label="Email Link"
                            >
                                <span>info@xwear.info</span>
                            </Link>
                            <Link
                                href="tel:+79936083885"
                                aria-label="Phone Number Link"
                            >
                                <span>+7 993 608 38 85</span>
                            </Link>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            {/* Desktop footer */}
            <div className="hidden md:block py-10">
                <div className="flex justify-evenly">
                    {/* Katalog */}
                    <ul className="text-white flex flex-col gap-1 text-lg font-oswald">
                        <li className="text-2xl">Katalog</li>
                        <li className="text-base">
                            <Link href="/category/3" aria-label="Clothes Link">
                                Kiyimlar
                            </Link>
                        </li>
                        <li className="text-base">
                            <Link href="/category/4" aria-label="Shoes Link">
                                Oyoq kiyimlar
                            </Link>
                        </li>
                        <li className="text-base">
                            <Link
                                href="/category/1"
                                aria-label="Accessories Link"
                            >
                                Aksessuarlar
                            </Link>
                        </li>
                    </ul>

                    {/* Ma'lumot */}
                    <ul className="text-white flex flex-col gap-1 text-lg font-oswald">
                        <li className="text-2xl">Ma'lumot</li>
                        <li className="text-base ">Blog</li>
                        <li className="text-base">Kontaktlar</li>
                        <li className="text-base">Yetkazib berish</li>
                        <li className="text-base">To'lov</li>
                        <li className="text-base">FAQ</li>
                    </ul>

                    {/* Kontaktlar */}
                    <ul className="text-white flex flex-col gap-1 text-lg font-oswald">
                        <li className="text-2xl">Kontaktlar</li>
                        <li className="text-base">info@xwear.info</li>
                        <li className="text-base">+7 993 608 38 85</li>
                        <li>Messengerlar</li>
                        <li className="flex gap-1">
                            <img
                                src={telegram}
                                alt="Telegram"
                                width="25"
                                height="25"
                                className="w-7 h-7 cursor-pointer"
                                loading="lazy"
                            />
                            <img
                                src={whatsapp}
                                alt="Whatsapp"
                                width="25"
                                height="25"
                                className="w-7 h-7 cursor-pointer"
                                loading="lazy"
                            />
                        </li>
                    </ul>
                </div>
            </div>

            {/* Socials bottom */}
            <div className="pb-5 md:hidden">
                <div className="flex gap-2 justify-center py-5">
                    <img
                        src={telegram}
                        alt="Telegram"
                        width="30"
                        height="30"
                        className="w-[30px] h-[30px] cursor-pointer"
                        loading="lazy"
                    />
                    <img
                        src={whatsapp}
                        alt="Whatsapp"
                        width="30"
                        height="30"
                        className="w-[30px] h-[30px] cursor-pointer"
                        loading="lazy"
                    />
                    <img
                        src={vk}
                        alt="VK"
                        width="30"
                        height="30"
                        className="w-[30px] h-[30px] cursor-pointer"
                        loading="lazy"
                    />
                </div>
                <div className="text-white text-center">
                    <p className="font-oswald">Yangiliklarga obuna bo'ling</p>
                    <p className="text-xs">
                        Chegirmalar va yangiliklardan xabardor bo'ling
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
