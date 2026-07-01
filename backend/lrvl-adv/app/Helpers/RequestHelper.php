<?php

if (!function_exists('clean_request_param')) {
    function clean_request_param($value)
    {
        if ($value === null || $value === 'undefined' || $value === 'null' || $value === '') {
            return null;
        }
        return $value;
    }
}

if (!function_exists('clean_request_params')) {
    function clean_request_params(array $keys): array
    {
        $cleaned = [];
        foreach ($keys as $key) {
            $cleaned[$key] = clean_request_param(request()->query($key));
        }
        return $cleaned;
    }
}
