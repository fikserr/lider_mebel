<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Auth\MustVerifyEmail as MustVerifyEmailTrait;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;
    use Notifiable;
    use MustVerifyEmailTrait;
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin', // 👈 Qo‘shildi
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean', // 👈 Cast qilish ham tavsiya etiladi
        ];
    }
    public function favorites()
    {
        return $this->belongsToMany(Product::class, 'favorites');
    }
    public function address()
    {
        return $this->hasOne(Address::class);
    }
}
