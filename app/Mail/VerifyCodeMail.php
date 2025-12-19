<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;

class VerifyCodeMail extends Mailable
{
    use Queueable;

    public $code;

    public function __construct($code)
    {
        $this->code = $code;
    }

    public function build()
    {
        return $this->subject('Sizning tasdiqlash kodingiz')
                    ->view('verify-code')
                    ->with(['code' => $this->code]);
    }
}
