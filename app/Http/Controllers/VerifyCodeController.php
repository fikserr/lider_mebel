<?php
namespace App\Http\Controllers;

class VerifyCodeController extends Controller
{
    public static function verify($inputCode, $user)
    {
        $latest = self::where('verifiable_type', get_class($user))
            ->where('verifiable_id', $user->id)
            ->where('expires_at', '>', now())
            ->latest()
            ->first();

        return $latest && \Hash::check($inputCode, $latest->code);
    }

}
