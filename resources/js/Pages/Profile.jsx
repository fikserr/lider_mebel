import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import ProfileSidebar from "@/components/shared/profile-sidebar";
import { BiUser } from "react-icons/bi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { RxLockOpen2 } from "react-icons/rx";
import { VscChecklist } from "react-icons/vsc";
import { MdOutlineAddLocationAlt, MdOutlineLocationOn } from "react-icons/md";

const Profile = () => {
    const handleLogOut = () => {
        router.post("/logout");
    };
    return (
        <div className="my-24 px-5 xl:px-32">
            <Link href={"/"}>
                <h1
                    className="font-bold text-5xl font-oswald"
                    aria-label="Profile Link"
                >
                    Profile
                </h1>
            </Link>
            <div className="grid lg:grid-cols-4 gap-5">
                <ProfileSidebar />
                <div className="col-span-3 lg:col-span-3 my-3">
                    <h2 className="font-oswald text-3xl">Salom, Mehmon!</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 text-center p-5 gap-5">
                        <Link
                            aria-label="Profile Link"
                            href={"/profile"}
                            className="border text-center p-10 max-w-xs hover:bg-black hover:text-white duration-500 rounded-lg"
                        >
                            <p className="flex justify-center text-3xl">
                                <BiUser />
                            </p>
                            <p className="font-oswald">Mening profilim</p>
                        </Link>
                        <Link
                            aria-label="Orders Link"
                            href={"/history-order"}
                            className="border text-center p-10 max-w-xs hover:bg-black hover:text-white duration-500 rounded-lg"
                        >
                            <p className="flex justify-center text-3xl">
                                <VscChecklist />
                            </p>
                            <p className="font-oswald">Buyurtmalar</p>
                        </Link>
                        <Link
                            aria-label="Address Link"
                            href={"/address"}
                            className="border text-center p-10 max-w-xs hover:bg-black hover:text-white duration-500 rounded-lg"
                        >
                            <p className="flex justify-center text-3xl">
                                <MdOutlineLocationOn />
                            </p>
                            <p className="font-oswald">Mening manzilim</p>
                        </Link>
                        <Link
                            aria-label="Add Address Link"
                            href={"/address-add"}
                            className="border text-center p-10 max-w-xs hover:bg-black hover:text-white duration-500 rounded-lg"
                        >
                            <p className="flex justify-center text-3xl">
                                <MdOutlineAddLocationAlt />
                            </p>
                            <p className="font-oswald">Manzil qo'shish</p>
                        </Link>
                        <Link
                        aria-label="Edit Password Link"
                            href={"/edit-password"}
                            className="border text-center p-10 max-w-xs hover:bg-black hover:text-white duration-500 rounded-lg"
                        >
                            <p className="flex justify-center text-3xl">
                                <RxLockOpen2 />
                            </p>
                            <p className="font-oswald">Parol</p>
                        </Link>
                        <button
                            aria-label="Log Out Button"
                            onClick={handleLogOut}
                            className="border text-center p-10 max-w-xs hover:bg-black hover:text-white duration-500 rounded-lg "
                        >
                            <p className="flex justify-center text-3xl">
                                <RiLogoutBoxRLine />
                            </p>
                            <p className="font-oswald">Chiqish</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
