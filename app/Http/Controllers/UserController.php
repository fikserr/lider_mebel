<?php

namespace App\Http\Controllers;

use App\Mail\VerifyCodeMail;
use App\Models\User;
use App\Models\VerificationCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Mail;

class UserController extends Controller
{
    // 🟢 LOGIN
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return to_route($user->is_admin ? 'admin.dashboard' : 'home');
        }

        return back()->withErrors(['email' => 'Email yoki parol noto‘g‘ri.'])->withInput();
    }

    // 🔐 LOGOUT
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return Inertia::location('/login');
    }

    // 🧾 RO‘YXATDAN O‘TISH – 1-qadam: kod yuborish
    // 🧾 RO‘YXATDAN O‘TISH – 1-qadam: kod yuborish
    public function requestRegister(Request $request)
    {
        $rawCode = random_int(100000, 999999);
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);

        // Foydalanuvchini yaratish
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if ($user) {
            // 🟢 Kod yaratish
            $code = VerificationCode::create([
                'verifiable_type' => get_class($user),
                'verifiable_id' => $user->id,
                'code' => bcrypt($rawCode),
                'expires_at' => now()->addMinutes(3),
            ]);
            // Mail::to($user->email)->send(new SendVerificationCode($rawCode));
            // 🟡 Sessionga saqlaymiz
            session(['pending_user_id' => $user->id]);

            Mail::to($user->email)->send(new VerifyCodeMail($rawCode));
            // Mail::raw("Sizning tasdiqlash kodingiz: {$rawCode}", function ($message) use ($user) {
            //     $message->to($user->email)->subject('Tasdiqlash kodingiz');
            // });
        }

        return back()->with('success', 'Foydalanuvchi ro‘yxatdan o‘tdi, tasdiqlash kodi yuborildi.');
    }

    // ✅ RO‘YXATDAN O‘TISH – 2-qadam: kodni tasdiqlash

    public function verifyRegister(Request $request)
    {
        // dd($request->all()); // <-- vaqtincha
        $request->validate([
            'code' => 'required|string',
        ]);

        $userId = session('pending_user_id');

        if (!$userId) {
            return back()->withErrors(['code' => 'Session yo‘qolgan.']);
        }

        $user = User::find($userId);

        if (!$user) {
            return back()->withErrors(['code' => 'Foydalanuvchi topilmadi.']);
        }

        if (!VerificationCode::verify($request->code, $user)) {
            return back()->withErrors(['code' => 'Kod noto‘g‘ri yoki muddati o‘tgan.']);
        }
        $user->markEmailAsVerified(); // ✅ ADD THIS
        auth()->login($user);
        return redirect()->route('login');
    }

    // 👥 Admin panel uchun barcha userlar
    public function adminUsers(Request $request)
    {
        $search = $request->input('search');

        $users = User::query()
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/users', [
            'users' => $users,
            'search' => $search,
        ]);
    }

    // 🧾 Ro‘yxat sahifasi
    public function showRegisterForm()
    {
        return Inertia::render('Register');
    }

    // 🧍Userni ko‘rsatish
    public function show(User $user)
    {
        return response()->json($user);
    }

    // ✏️ Userni yangilash (masalan: is_admin)
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'is_admin' => 'required|boolean',
        ]);

        $user->update($data);
        return redirect()->back();
    }

    // ❌ Userni o‘chirish
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'User o‘chirildi']);
    }

    // 🔐 Login sahifasi orqali kirish
    public function index()
    {
        $users = User::all();
        return inertia('Login', ['users' => $users]);
    }
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|confirmed|min:6',
        ]);
    
        $user = auth()->user();
    
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'errors' => [
                    'current_password' => ['Joriy parol noto‘g‘ri.']
                ]
            ], 422);
        }
    
        $user->password = Hash::make($request->new_password);
        $user->save();
    
        // 🔐 Email tasdiqlash uchun kod yuborish
        $code = random_int(100000, 999999);
        VerificationCode::create([
            'verifiable_type' => get_class($user),
            'verifiable_id' => $user->id,
            'code' => bcrypt($code),
            'expires_at' => now()->addMinutes(3),
        ]);
    
        Mail::to($user->email)->send(new VerifyCodeMail($code));
    
        return response()->json(['message' => 'Kod yuborildi']); // ✅ onSuccess ishlaydi
    }
    
    public function verifyPasswordCode(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        $user = Auth::user(); // Hozirgi userni olamiz

        if (!$user || !VerificationCode::verify($request->code, $user)) {
            return response()->json(['message' => 'Kod noto‘g‘ri yoki muddati tugagan.'], 422);
        }

        return response()->json(['message' => 'Tasdiqlandi!']); // ✅ BU ON_SUCCESS ISHLAYDI
    }

}
