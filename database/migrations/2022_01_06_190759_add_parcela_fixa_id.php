<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddParcelaFixaId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("rendas", function (Blueprint $table) {
            $table->unsignedBigInteger('renda_fixa_id')->nullable();
            
            $table->foreign('renda_fixa_id')
                  ->references('id')->on('rendas_fixas')
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
        //
    }
}
