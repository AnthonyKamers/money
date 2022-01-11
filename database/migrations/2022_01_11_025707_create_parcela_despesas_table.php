<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParcelaDespesasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parcelas_despesa', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('despesa_id');
            $table->integer('parcela');
            $table->double('valor');
            $table->date('data');
            $table->boolean('ja_debitado');
            $table->timestamps();

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
        Schema::dropIfExists('parcelas_despesa');
    }
}
