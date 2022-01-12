<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BancoController;
use App\Http\Controllers\CartaoController;
use App\Http\Controllers\CategoriaRendaController;
use App\Http\Controllers\CategoriaDespesaController;
use App\Http\Controllers\RendaController;
use App\Http\Controllers\DespesaController;
use App\Http\Controllers\FaturaController;

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
    Route::post('cartoes/create', [CartaoController::class, 'store']);
    Route::post('cartoes/delete', [CartaoController::class, 'destroy']);

    // rendas
    // CRUD categorias
    Route::get('rendas/categoria/read', [CategoriaRendaController::class, 'index']);
    Route::post('rendas/categoria/create', [CategoriaRendaController::class, 'store']);
    Route::post('rendas/categoria/delete', [CategoriaRendaController::class, 'destroy']);
    
    // CRUD rendas
    Route::get('rendas/read', [RendaController::class, 'index']);
    Route::post('rendas/create', [RendaController::class, 'store']);
    Route::post('rendas/delete', [RendaController::class, 'destroy']);

    // contabilizar renda
    Route::post('rendas/contabilizar', [RendaController::class, 'contabilizar']);

    // parcelas
    Route::get('rendas/parcelas/read', [RendaController::class, 'readParcelas']);

    // renda fixa
    Route::get('renda-fixa/read', [RendaController::class, 'readRendaFixa']);
    Route::get('renda-fixa/all', [RendaController::class, 'readRendaFixaAll']);


    // formas pagamento
    Route::get('formaspagamento/read', [DespesaController::class, 'getFormasPagamento']);

    // despesas
    // CRUD categorias
    Route::get('despesas/categoria/read', [CategoriaDespesaController::class, 'index']);
    Route::post('despesas/categoria/create', [CategoriaDespesaController::class, 'store']);
    Route::post('despesas/categoria/delete', [CategoriaDespesaController::class, 'destroy']);

    // CRUD despesas
    Route::get('despesas/read', [DespesaController::class, 'index']);
    Route::post('despesas/create', [DespesaController::class, 'store']);

    // parcelas
    Route::get('despesas/parcelas/read', [DespesaController::class, 'readParcelas']);

    // despesa fixa
    Route::get('despesa-fixa/read', [DespesaController::class, 'readDespesaFixa']);
    Route::get('despesa-fixa/all', [DespesaController::class, 'readDespesaFixaAll']);

    // faturas
    Route::get('faturas/read', [FaturaController::class, 'index']);
    Route::get('faturas/show', [FaturaController::class, 'show']);
});
