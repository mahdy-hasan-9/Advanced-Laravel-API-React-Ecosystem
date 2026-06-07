<?php

namespace App\Services\Backend\Authentication;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function register(array $data)
    {
        if (User::where('email', $data['email'])->exists()) {
            return [
                'success' => false,
                'status' => 422,
                'message' => 'Email already registered.'
            ];
        }
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'is_active' => 1,
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        return [
            'success' => true,
            'status' => 201,
            'token' => $token,
            'message' => 'User registered successfully.',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ]
            ]
        ];
    }

    public function login(array $data)
    {
        $user = User::where('email', $data['email'])->first();
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return [
                'success' => false,
                'status' => 401,
                'message' => 'Invalid credentials.'
            ];
        }
        if (!$user->is_active) {
            return [
                'success' => false,
                'status' => 403,
                'message' => 'Your account is inactive.'
            ];
        }
        $token = $user->createToken('auth_token')->plainTextToken;
        return [
            'success' => true,
            'status' => 200,
            'token' => $token,
            'message' => 'Login successful.',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ]
            ]
        ];
    }

    public function logout(User $user)
    {
        $user->tokens()->delete();
        return [
            'success' => true,
            'status' => 200,
            'message' => 'Logout successful.',
        ];
    }
}
