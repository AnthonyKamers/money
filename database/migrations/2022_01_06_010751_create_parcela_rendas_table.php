<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParcelaRendasTable extends Migration
{
    /**
     * Run the migrations.
     *e
     * @return void
     */
    public function up()
    {
        Schema::create('parcelas_renda', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("renda_id");
            $table->double("valor");
            $table->date('data');
            $table->boolean("ja_em_conta");
            $table->timestamps();

            $table->foreign("renda_id")
                  ->references('id')->on('rendas')
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
        Schema::dropIfExists('parcelas_renda');
    }
}
