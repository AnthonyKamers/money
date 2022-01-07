<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Renda extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'rendas';

    // Primary Key
    public $primaryKey = 'id';

    // Timestamps
    public $timestamps = true;

    public function categoria() {
        return $this->belongsTo(CategoriaRenda::class, 'categoria_id', 'id');
    }

    public function parcelas_all() {
        return $this->hasMany(ParcelaRenda::class);
    }

    public function renda_fixa() {
        return $this->belongsTo(RendaFixa::class);
    }
}
