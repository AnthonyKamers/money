<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FaturaCartao extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'faturas_cartoes';

    // Primary Key
    public $primaryKey = 'id';

    // Timestamps
    public $timestamps = true;

    public function despesas() {
        return $this->hasMany(DespesaFatura::class, 'fatura_id', 'id');
    }

    public function cartao() {
        return $this->belongsTo(Cartao::class, 'cartao_id', 'id');
    }
}
