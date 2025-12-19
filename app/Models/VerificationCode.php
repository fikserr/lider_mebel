<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class VerificationCode extends Model
{
    protected $fillable = [
        'verifiable_type',
        'verifiable_id',
        'code',
        'expires_at',
    ];

    protected $hidden = ['code'];
    protected $casts = ['expires_at' => 'datetime'];

    public function verifiable()
    {
        return $this->morphTo();
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($verificationCode) {
            if (!$verificationCode->expires_at) {
                $verificationCode->expires_at = now()->addMinutes(3); // yoki configdan o‘qib olish mumkin
            }

            if (Hash::needsRehash($verificationCode->code)) {
                $verificationCode->code = Hash::make($verificationCode->code);
            }
        });

        static::created(function ($verificationCode) {
            $maxCodes = 1;
            $verifiable = $verificationCode->verifiable;

            if (!$verifiable) return;

            $oldVerificationCodeIds = self::for($verifiable)
                ->orderByDesc('expires_at')
                ->orderByDesc('id')
                ->skip($maxCodes)
                ->take(PHP_INT_MAX)
                ->pluck('id');

            self::whereIn('id', $oldVerificationCodeIds)->delete();
        });
    }

    public function scopeFor(Builder $query, Model $verifiable): Builder
    {
        return $query->where('verifiable_type', get_class($verifiable))
            ->where('verifiable_id', $verifiable->getKey());
    }

    public function scopeNotExpired(Builder $query): Builder
    {
        return $query->where('expires_at', '>=', now());
    }

    public static function verify(string $code, Model $user): bool
    {
        $record = self::for($user)->notExpired()->latest()->first();

        if (!$record) return false;

        return Hash::check($code, $record->code);
    }
}
