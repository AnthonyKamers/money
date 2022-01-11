<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriaDespesasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categoria_despesas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('banco_id');
            $table->string('nome');
            $table->string('cor');
            $table->timestamps();

            $table->foreign('banco_id')
                  ->references('id')->on('bancos')
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
        Schema::dropIfExists('categoria_despesas');
    }
}
