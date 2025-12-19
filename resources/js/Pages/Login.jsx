import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { PiEyeClosed, PiEye } from "react-icons/pi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login'); // Laravelda `route('/login')` POST
  };
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff] perspective-1000 overflow-hidden relative font-sans">
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-[90%] max-w-xl bg-white/70 rounded-xl backdrop-blur-xl border p-10 shadow-[0_0_40px_#c0eaff60] animate-fadeIn"
      >
        <h2 className="text-center text-4xl font-bold tracking-widest text-black mb-10 uppercase">
          Kirish
        </h2>
        <div className="space-y-6">
          <div className='bg-slate-100 p-3 rounded-lg space-y-2'>
            <h3 className='font-oswald'>Elektron pochtangiz:</h3>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder='Emailni kiriting'
              className='bg-transparent w-full outline-none'
            />
            {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
          </div>

          <div className='bg-slate-100 p-3 rounded-lg space-y-2 relative'>
            <h3 className='font-oswald'>Parol:</h3>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder='Parol kiriting'
              className='bg-transparent w-full outline-none'
            />
            <span
              onClick={() => setShowPassword(prev => !prev)}
              className='absolute cursor-pointer right-2 top-6 p-3 text-2xl'
            >
              {showPassword ? <PiEye /> : <PiEyeClosed />}
            </span>
            {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
          </div>
        </div>

        <div className="mt-10 flex justify-between items-center">
          <button
            type='submit'
            disabled={processing}
            className='p-3 bg-black text-white w-[40%] sm:w-[30%] rounded-lg text-center'
            aria-label='Login Button'
          >
            Saqlash
          </button>
          <Link href="/register" className="text-black underline hover:text-blue-800 text-sm transition" aria-label='Register Link'>
            Registratsiya
          </Link>
        </div>
      </form>
    </div>


  );
};

export default Login;
