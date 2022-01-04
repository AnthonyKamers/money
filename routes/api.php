<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BancoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('refresh', [AuthController::class, 'refresh']);

    Route::group(['middleware' => 'auth:api'], function(){
        Route::get('user', [AuthController::class, 'user']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

Route::group(['middleware' => 'auth:api'], function() {
    // CRUD bancos
    Route::post('bancos/create', [BancoController::class, 'store']);
    Route::get('bancos/read', [BancoController::class, 'index']);
    Route::post('bancos/update', [BancoController::class, 'update']);
    Route::post('bancos/delete', [BancoController::class, 'destroy']);

    // CRUD cartoes
    Route::get('cartoes/read', [CartaoController::class, 'index']);
});
