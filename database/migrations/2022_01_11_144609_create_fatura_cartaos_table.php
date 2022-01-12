<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFaturaCartaosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('faturas_cartoes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('banco_id');
            $table->unsignedBigInteger('cartao_id')->nullable();

            $table->integer('mes_fatura');
            $table->integer('ano_fatura');
            $table->date('data_vencimento');

            $table->boolean('ja_debitado');
            $table->timestamps();

            $table->foreign('banco_id')
                  ->references('id')->on('bancos')
                  ->onDelete('cascade');
            
            $table->foreign('cartao_id')
                  ->references('id')->on('cartoes')
                  ->onDelete("SET NULL");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fatura_cartaos');
    }
}
