<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Teste extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('despesas', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('banco_id');
            $table->unsignedBigInteger('forma_pagamento_id');
            $table->unsignedBigInteger('categoria_id')->nullable();
            $table->unsignedBigInteger('cartao_id')->nullable();

            $table->string('descricao');
            $table->double('valor');
            $table->date('data');
            $table->boolean('ja_debitado');

            $table->boolean('parcelado');
            $table->integer('parcelas')->nullable();

            $table->unsignedBigInteger('despesa_fixa_id')->nullable();
            
            $table->timestamps();


            $table->foreign('banco_id')
                  ->references('id')->on('bancos')
                  ->onDelete('cascade');
            
            $table->foreign('forma_pagamento_id')
                  ->references('id')->on('formas_pagamento')
                  ->onDelete('cascade');
            
            $table->foreign('categoria_id')
                  ->references('id')->on('categoria_despesas')
                  ->onDelete('SET NULL');

            $table->foreign('cartao_id')
                  ->references('id')->on('cartoes')
                  ->onDelete('SET NULL');
            
            $table->foreign('despesa_fixa_id')
                  ->references('id')->on('despesas_fixas')
                  ->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('despesas');
    }
}
