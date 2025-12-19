<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="Prosys biznesingizni avtomatlashtiradigan va web dasturlar ishlab chiqadigan kompaniya. 1C integratsiyasi, mobil ilovalar va Telegram botlar yaratamiz.">
    <meta name="robots" content="index, follow">
    <title>Prosys – Avtomatlashtirish va IT yechimlari</title>
    {{-- Preload Google Fonts --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

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
