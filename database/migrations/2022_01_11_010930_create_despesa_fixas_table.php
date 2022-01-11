<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDespesaFixasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('despesas_fixas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('banco_id');
            $table->unsignedBigInteger('categoria_id')->nullable();
            $table->double('valor');
            $table->string('descricao');
            $table->integer('qtd_mes');
            $table->integer('dia_mes')->nullable();
            $table->timestamps();

            $table->foreign('banco_id')
                  ->references('id')->on('bancos')
                  ->onDelete('cascade');
            
            $table->foreign('categoria_id')
                  ->references('id')->on('categoria_despesas')
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
        Schema::dropIfExists('despesa_fixas');
    }
}
