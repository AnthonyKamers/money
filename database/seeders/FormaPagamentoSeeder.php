<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\FormaPagamento;

class FormaPagamentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('formas_pagamento')->insert([
            ['descricao' => 'Dinheiro'],
            ['descricao' => 'Cheque'],
            ['descricao' => 'Transferência'],
            ['descricao' => 'PIX'],
            ['descricao' => 'Cartão de crédito'],
            ['descricao' => 'Cartão de débito']
        ]);
    }
}
