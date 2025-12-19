import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyCodeModal = ({ isOpen, onClose, onSubmit, email }) => {
    const [code, setCode] = useState("");
    const [timeLeft, setTimeLeft] = useState(180);

    useEffect(() => {
        let timer;
        if (isOpen) {
            setTimeLeft(180);
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isOpen]);

    const handleVerify = () => {
        if (code.length === 6) {
            onSubmit(code);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-md w-[90%] sm:w-[400px]">
                <h2 className="text-xl font-semibold mb-2">Tasdiqlash kodi</h2>
                <p className="mb-1 text-sm text-gray-600">
                    Emailga yuborilgan 6 xonali kodni kiriting: <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-500 mb-3">
                    Kod muddati tugash vaqti: <strong>{formatTime(timeLeft)}</strong>
                </p>

                <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={setCode}
                >
                    <InputOTPGroup className="w-full p-2 rounded mb-3 outline-none flex justify-center">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        Bekor qilish
                    </button>
                    <button
                        onClick={handleVerify}
                        disabled={timeLeft === 0 || code.length < 6}
                        className={`px-4 py-2 rounded text-white ${
                            timeLeft === 0 || code.length < 6
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-black"
                        }`}
                    >
                        Tasdiqlash
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyCodeModal;
