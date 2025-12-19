<?php

use App\Http\Controllers\AddressController;

use App\Http\Controllers\BannerController;

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerifyCodeController;;

use App\Http\Middleware\IsAdmin;
use App\Http\Middleware\IsUser;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 🌐 Root yo‘naltirish (admin yoki user)
Route::get('/', function () {
    if (auth()->check() && auth()->user()->is_admin) {
        return redirect('/admin-dashboard');
    }
    return inertia('Home');
});
Route::middleware('web')->group(function () {
    // 🔐 Auth sahifalari (login, register, logout)
    Route::get('/login', [UserController::class, 'index'])->name('login');
    Route::post('/login', [UserController::class, 'login'])->name('login.attempt');
    Route::get('/register', [UserController::class, 'showRegisterForm'])->name('register');
    Route::post('/request-register', [UserController::class, 'requestRegister']);
    Route::post('/verify-register', [UserController::class, 'verifyRegister']);
    Route::post('/logout', [UserController::class, 'logout'])->name('logout');

    Route::middleware('auth')->post('/verify-code', [VerifyCodeController::class, 'verify'])->name('verify.code');
});
// 📧 Test email
Route::get('/test-email', function () {
    Mail::raw('Salom! Laraveldan test email.', function ($message) {
        $message->to('fixprogram7897894@gmail.com')->subject('Laravel Test Email');
    });
    return '✅ Email yuborildi!';
});

// 👤 Faqat USER (oddiy foydalanuvchi) uchun sahifalar
Route::middleware([auth::class, IsUser::class])->group(function () {
    Route::get('/', [ProductController::class, 'userProduct'])->name('home');
    Route::get('/category/{id}', [ProductController::class, 'ShoesProducts'])->name('category.products');
    Route::get('/category/{id}', [ProductController::class, 'ClothesProducts'])->name('category.products');
    Route::get('/category/{id}', [ProductController::class, 'AccesProducts'])->name('category.products');
    Route::get('/detail', fn() => inertia('detail'));
    Route::get('/detail/{id}', [ProductController::class, 'show'])->name('product.detail');
    Route::get('/profile', fn() => inertia('Profile'));
    Route::get('/profile-edit', fn() => inertia('EditProfile'));
    Route::get('/edit-password', fn() => inertia('EditPass'));
    Route::post('/update-password', [UserController::class, 'updatePassword']);
    Route::post('/verify-password-code', [UserController::class, 'verifyPasswordCode']);
    // Address
    Route::get('/address', [AddressController::class, 'show'])->name('address.show');
    Route::get('/address-add', fn() => inertia('AddAddress'))->name('address.add');
    Route::get('/edit-address/{id}', [AddressController::class, 'edit'])->name('address.edit');
    Route::post('/address-create', [AddressController::class, 'store'])->name('address.store');
    Route::put('/address-update/{address}', [AddressController::class, 'update'])->name('address.update');
    Route::delete('/address-delete/{id}', [AddressController::class, 'destroy'])->name('address.destroy');

    // Cart & Orders
    Route::get('/basket', [CartController::class, 'showCart'])->name('cart.index');
    Route::post('/add-to-cart', [CartController::class, 'addToCart'])->name('cart.add');
    Route::delete('/cart/{id}', [CartController::class, 'removeFromCart'])->name('cart.remove');

    Route::post('/place-order', [OrderController::class, 'placeOrder']);
    Route::get('/order-success', [OrderController::class, 'success'])->name('order.success');
    Route::get('/history-order', [OrderController::class, 'userOrders'])->name('order.history');

    // Favorites
    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/favorites', [FavoriteController::class, 'store'])->name('favorites.store');
    Route::delete('/favorites/{product}', [FavoriteController::class, 'destroy'])->name('favorites.destroy');

    // Qo‘shimcha sahifalar
    Route::get('/policy', fn() => inertia('Policy'));
});

// 🛠️ Admin uchun sahifalar
Route::middleware(['auth', IsAdmin::class])->group(function () {
    // Dashboard
    Route::get('/admin-dashboard', fn() => inertia('admin/dashboard'))->name('admin.dashboard');
    Route::get('/admin/orders/{id}', [OrderController::class, 'show'])->name('admin.orders.show');
    Route::get('/admin/orders/pos/{id}', [OrderController::class, 'showPos'])->name('admin.orders.showPos');
    // Category
    Route::get('/admin/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/admin/categories/create', [CategoryController::class, 'create'])->name('categories.create');
    Route::post('/admin/categories', [CategoryController::class, 'store'])->name('categories.store');
    // Banners
    Route::post('/banners', [BannerController::class, 'store'])->name('banners.store');
    Route::delete('/banners/{id}', [BannerController::class, 'destroy'])->name('banners.destroy');
    Route::get('/admin-banner', fn() => inertia('admin/admin-banner'));
    Route::get('/admin-products', [BannerController::class, 'index'])->name('banners.index');
    // Products
    Route::get('/admin-productStock', [ProductController::class, 'index'])->name('admin.products.index');
    Route::get('/admin-add-product', [ProductController::class, 'create'])->name('admin.products.create');
    Route::post('/admin-add-store', [ProductController::class, 'store'])->name('admin.products.store');
    Route::get('/admin-products/{product}/edit', [ProductController::class, 'edit'])->name('admin.products.edit');
    Route::put('/admin-products/{product}', [ProductController::class, 'update'])->name('admin.products.update');
    Route::delete('/admin-delete-product/{product}', [ProductController::class, 'deleteProduct']);
    Route::delete('/admin-delete-photo/{product}/{key}', [ProductController::class, 'deletePhoto']);
    // Orders
    Route::get('/admin-order-lists', [OrderController::class, 'adminOrders'])->name('admin.orders');
    Route::patch('/admin/orders/{order}/status', [OrderController::class, 'updateStatus']);
    // Users
    Route::get('/admin-users', [UserController::class, 'adminUsers'])->name('admin.users');
    Route::put('/admin/users/{user}', [UserController::class, 'update'])->name('admin.users.update');

    // Favorites (agar kerak bo‘lsa admin tomonda)
    Route::get('/admin-favorites', fn() => inertia('admin/favorites'));
});
// ❌ 404 page
Route::fallback(function () {
    return Inertia::render('NotFound');
});
