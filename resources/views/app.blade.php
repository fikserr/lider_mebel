<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
<meta name="description" content="Lider Mebel — buyurtma asosida sifatli va zamonaviy mebellar. Oshxona, yotoqxona va ofis mebellari.">
    <meta name="robots" content="index, follow">
    <title>Lider Mebel Lux</title>
    {{-- Preload Google Fonts --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="icon" href="{{ Vite::asset('public/storage/assets/favicon.ico') }}" type="image/x-icon">

    {{-- Preload Vite build CSS/JS for faster FCP --}}
    @viteReactRefresh
    @vite('resources/js/app.jsx')

    {{-- Inertia Head --}}
    @inertiaHead
</head>
<body class="antialiased bg-white">
    @inertia
</body>
</html>
