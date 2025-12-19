import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { PiEyeClosed, PiEye } from "react-icons/pi";
import { Inertia } from "@inertiajs/inertia";
import VerifyCodeModal from "@shared/VerifyCodeModal";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const toats = useToast();
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/request-register", {
            onSuccess: () => {
                setShowModal(true);
            },
        });
    };

    const handleVerifyCode = async (code) => {
    try {
        const response = await axios.post("/verify-register", { code });

        // Agar success bo‘lsa (200 OK)
        setShowModal(false);
        window.location.href = "/login"; // yoki Inertia.visit("/login");
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            console.error("Xatolik:", error.response.data.errors);
        } else {
            console.error("Noma'lum xatolik:", error);
        }
    }
};

    return (
        <div className="px-5 xl:px-32 my-20 flex justify-center">
            <form
                onSubmit={handleSubmit}
                className="relative z-10 w-[90%] max-w-xl bg-white/70 rounded-xl backdrop-blur-xl border p-10 shadow-[0_0_40px_#c0eaff60] animate-fadeIn"
            >
                <h2 className="text-center text-4xl font-bold tracking-widest text-black mb-5 uppercase">
                    Register
                </h2>
                <div className="grid grid-cols-1 p-5 gap-5">
                    <div className="bg-slate-100 p-3 rounded-lg space-y-2">
                        <h3 className="font-oswald">Ismingiz:</h3>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Ismingizni kiriting"
                            className="bg-transparent w-full outline-none"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="bg-slate-100 p-3 rounded-lg space-y-2">
                        <h3 className="font-oswald">
                            Elektron pochtangiz:
                        </h3>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Emailni kiriting"
                            className="bg-transparent w-full outline-none"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="bg-slate-100 p-3 rounded-lg space-y-2 relative">
                        <h3 className="font-oswald">Parol:</h3>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            placeholder="Parol kiriting"
                            className="bg-transparent w-full outline-none"
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute cursor-pointer right-2 top-6 p-3 text-2xl"
                        >
                            {showPassword ? <PiEye /> : <PiEyeClosed />}
                        </span>
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="bg-slate-100 p-3 rounded-lg space-y-2 relative">
                        <h3 className="font-oswald">
                            Parolni takrorlang:
                        </h3>
                        <input
                            type={repeatPassword ? "text" : "password"}
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={handleChange}
                            placeholder="Parolni takrorlang"
                            className="bg-transparent w-full outline-none"
                        />
                        <span
                            onClick={() => setRepeatPassword((prev) => !prev)}
                            className="absolute cursor-pointer right-2 top-6 p-3 text-2xl"
                        >
                            {repeatPassword ? <PiEye /> : <PiEyeClosed />}
                        </span>
                    </div>
                </div>

                <div className="px-5 flex items-end justify-between">
                    <button
                        type="submit"
                        disabled={processing}
                        className="p-3 bg-black text-white w-[40%] sm:w-[30%] rounded-lg text-center"
                    >
                        Saqlash
                    </button>

                    <a
                        href="/login"
                        className="underline hover:text-blue-500 duration-300"
                    >
                        LogIn
                    </a>
                </div>
            </form>

            <VerifyCodeModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleVerifyCode}
                email={data.email}
            />
        </div>
    );
};

export default Register;
