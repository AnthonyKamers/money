<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDespesaFaturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('despesas_fatura', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cartao_id');
            $table->unsignedBigInteger('fatura_id');
            $table->unsignedBigInteger('despesa_id');

            $table->integer('parcela_now');
            $table->double('valor_parcela');
            $table->timestamps();


            $table->foreign('cartao_id')
                  ->references('id')->on('cartoes')
                  ->onDelete('cascade');

            $table->foreign('fatura_id')
                  ->references('id')->on('faturas_cartoes')
                  ->onDelete('cascade');

            $table->foreign('despesa_id')
                  ->references('id')->on('despesas')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('despesas_fatura');
    }
}
