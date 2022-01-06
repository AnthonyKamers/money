<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRendasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rendas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("banco_id");
            $table->unsignedBigInteger("categoria_id")->nullable();
            $table->string("descricao");
            $table->double("valor");
            $table->date("data");
            $table->boolean("ja_em_conta");
            $table->boolean("parcelado");
            $table->timestamps();

            $table->foreign("banco_id")
                  ->references('id')->on("bancos")
                  ->onDelete('cascade');
            
            $table->foreign("categoria_id")
                  ->references('id')->on("categoria_rendas")
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
        Schema::dropIfExists('rendas');
    }
}
