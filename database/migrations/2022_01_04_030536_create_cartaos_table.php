<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartaosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cartoes', function (Blueprint $table) {
            $table->id();
            $table->string("nome");
            $table->tinyInteger("tipo"); //0 ou 1 (débito ou crédito)
            $table->mediumInteger("final"); //últimos 4 dígitos do cartão
            $table->double("mensalidade")->nullable();
            $table->tinyInteger("vencimento_fatura");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cartoes');
    }
}
