<?php

// database/migrations/xxxx_xx_xx_create_addresses_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('street');
            $table->string('city');
            $table->string('house_number');
            $table->string('region');
            $table->string('phone');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('addresses');
    }
};

