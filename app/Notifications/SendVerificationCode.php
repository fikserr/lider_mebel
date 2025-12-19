<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendVerificationCode extends Notification
{
    use Queueable;

    public string $code;

    public function __construct($code)
    {
        $this->code = $code;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Tasdiqlash kodi')
            ->line("Sizning tasdiqlash kodingiz: **{$this->code}**")
            ->line('Agar bu siz bo‘lmasangiz, iltimos, e’tibor bermang.');
    }
}
