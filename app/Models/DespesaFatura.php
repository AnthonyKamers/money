<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DespesaFatura extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'despesas_fatura';

    // Primary Key
    public $primaryKey = 'id';

    // Timestamps
    public $timestamps = true;

    public function fatura() {
        return $this->belongsTo(FaturaCartao::class, 'fatura_id', 'id');
    }

    public function despesa() {
        return $this->belongsTo(Despesa::class, 'despesa_id', 'id');
    }
}
