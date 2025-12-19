<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BannerController extends Controller
{
    public function index()
    {
        $banners = \App\Models\Banner::latest()->get();

        return Inertia::render('admin/products', [
            'banners' => $banners,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|max:2048', // 2MB gacha ruxsat
        ]);

        $path = $request->file('image')->store('banners', 'public');
        Banner::create([
            'name' => $request->name,
            'image' => $path,
        ]);

        return Inertia::location(route('banners.index'));
    }
    public function destroy($id)
    {
        $banner = Banner::findOrFail($id);

        // Agar faylni storage dan ham o'chirmoqchi bo‘lsang:
        if ($banner->image && \Storage::disk('public')->exists($banner->image)) {
            \Storage::disk('public')->delete($banner->image);
        }

        $banner->delete();

        return redirect()->back()->with('success', 'Banner o‘chirildi.');
    }
}
