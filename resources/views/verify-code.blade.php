<!DOCTYPE html>
<html>

<body style="font-family: Arial, sans-serif;">
    <div style="max-width: 600px; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea;">
        <h2 style="color: #333">👋 Salom!</h2>
        <p>Sizning tasdiqlash kodingiz:</p>
        <div style="
            font-size: 32px;
            font-weight: bold;
            color: #007BFF;
            background: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            text-align: center;">
            {{ $code }}
        </div>
        <p>Ushbu kod <strong>3 daqiqa</strong> davomida amal qiladi. Iltimos, uni boshqa hech kim bilan ulashmang!</p>
        <p>Rahmat, <br> <strong>{{ config('app.name') }}</strong></p>
    </div>
</body>

</html>