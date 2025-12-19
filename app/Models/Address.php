<?php

// app/Models/Address.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'street',
        'city',
        'house_number',
        'region',
        'phone',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
