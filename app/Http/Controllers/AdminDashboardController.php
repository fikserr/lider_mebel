<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function dashboard()
    {
        // 👤 Userlar
        $usersCount = User::count();

        // 📦 Orderlar
        $ordersCount = Order::count();

        // 🛒 Tovarlar
        $productsCount = Product::count();

        // 💰 Sotuvlar (FAOL orderlar bo‘yicha)
        $salesCount = Order::where('status', 'completed')->count();

        // DB driver olish
        $driver = DB::getDriverName();

        if ($driver === 'sqlite') {
            $monthlySales = Order::select(
                DB::raw("strftime('%m', created_at) as month"),
                DB::raw('COUNT(*) as total')
            )
            ->where('status', 'completed')
            ->groupBy('month')
            ->orderBy('month')
            ->get();
        } else {
            // MySQL, PostgreSQL va boshqalar
            $monthlySales = Order::select(
                DB::raw("MONTH(created_at) as month"),
                DB::raw('COUNT(*) as total')
            )
            ->where('status', 'completed')
            ->groupBy('month')
            ->orderBy('month')
            ->get();
        }

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'users'    => $usersCount,
                'orders'   => $ordersCount,
                'products' => $productsCount,
                'sales'    => $salesCount,
                'monthlySales'  => $monthlySales,
            ]
        ]);
    }
}
