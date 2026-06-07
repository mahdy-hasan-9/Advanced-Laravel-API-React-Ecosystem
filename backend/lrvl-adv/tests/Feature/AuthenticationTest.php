<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('user can register', function () {
    $response = $this->postJson('/api/auth/register', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'Password123',
    ]);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'success',
            'status',
            'token',
            'message',
            'necessary_data' => [
                'user' => ['id', 'name', 'email']
            ]
        ]);

    $this->assertDatabaseHas('users', [
        'email' => 'john@example.com',
    ]);
});

test('user cannot register with existing email', function () {
    User::factory()->create([
        'email' => 'john@example.com',
    ]);

    $response = $this->postJson('/api/auth/register', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'Password123',
    ]);

    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
        ]);
});

test('user can login', function () {
    $user = User::factory()->create([
        'email' => 'jane@example.com',
        'password' => 'Password123',
    ]);

    $response = $this->postJson('/api/auth/login', [
        'email' => 'jane@example.com',
        'password' => 'Password123',
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'token',
            'message',
        ]);
});

test('user cannot login with invalid credentials', function () {
    $user = User::factory()->create([
        'email' => 'jane@example.com',
        'password' => 'Password123',
    ]);

    $response = $this->postJson('/api/auth/login', [
        'email' => 'jane@example.com',
        'password' => 'WrongPassword123',
    ]);

    $response->assertStatus(401)
        ->assertJson([
            'success' => false,
            'message' => 'Invalid credentials.',
        ]);
});

test('user can access protected route with token', function () {
    $user = User::factory()->create();
    $token = $user->createToken('test-token')->plainTextToken;

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->getJson('/api/auth/user');

    $response->assertStatus(200)
        ->assertJsonPath('data.email', $user->email);
});

test('user cannot access protected route without token', function () {
    $response = $this->getJson('/api/auth/user');

    $response->assertStatus(401);
});

test('user can logout', function () {
    $user = User::factory()->create();
    $token = $user->createToken('test-token')->plainTextToken;

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->postJson('/api/auth/logout');

    $response->assertStatus(200)
        ->assertJson([
            'success' => true,
            'message' => 'Logged out successfully.'
        ]);

    // Verify token is gone from DB
    $this->assertDatabaseCount('personal_access_tokens', 0);

    // Clear resolved user from auth manager to force re-authentication in next request
    $this->app['auth']->forgetUser();

    // Verify token is revoked
    $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->getJson('/api/auth/user');
    
    $response->assertStatus(401);
});
