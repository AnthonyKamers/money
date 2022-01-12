<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Despesa extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'despesas';

    // Primary Key
    public $primaryKey = 'id';

    // Timestamps
    public $timestamps = true;

    public function categoria() {
        return $this->belongsTo(CategoriaDespesa::class, 'categoria_id', 'id');
    }

    public function forma_pagamento() {
        return $this->belongsTo(FormaPagamento::class, 'forma_pagamento_id', 'id');
    }

    public function cartao() {
        return $this->belongsTo(Cartao::class, 'cartao_id', 'id');
    }

    // parcelas sem ser de fatura de cartão de crédito (boleto/cheque)
    public function parcelas_normais() {
        return $this->hasMany(ParcelaDespesa::class);
    }

    // parcelas de cartões
    public function parcelas_cartao() {
        return $this->hasMany(DespesaFatura::class);
    }
}
