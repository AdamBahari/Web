<?php

namespace Traits;

trait ResponseFormatter{
    Public function ResponseFormatter($code, $message, $data = null){
        return json_encode([
            "code" => $code,
            "message" => $message,
            "data" => $data
        ]);
    }
}