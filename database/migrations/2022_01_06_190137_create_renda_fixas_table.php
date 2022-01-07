<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRendaFixasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rendas_fixas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('banco_id');
            $table->unsignedBigInteger('categoria_id')->nullable();
            $table->double('valor');
            $table->integer('qtd_mes');
            $table->integer('dia_mes')->nullable();
            $table->timestamps();

            $table->foreign('banco_id')
                  ->references('id')->on('bancos')
                  ->onDelete('cascade');
            
            $table->foreign('categoria_id')
                  ->references('id')->on('categoria_rendas')
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
        Schema::dropIfExists('rendas_fixas');
    }
}
