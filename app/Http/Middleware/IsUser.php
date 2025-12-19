<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsUser
{
    public function handle(Request $request, Closure $next): Response
    {
        // Agar foydalanuvchi admin bo‘lsa, ruxsat bermaymiz
        if (auth()->check() && auth()->user()->is_admin) {
            abort(403, 'Siz oddiy foydalanuvchilar sahifasiga kira olmaysiz.');
        }

        return $next($request);
    }
}
