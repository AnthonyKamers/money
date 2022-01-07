<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RendaFixa extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'rendas_fixas';

    // Primary Key
    public $primaryKey = 'id';

    // Timestamps
    public $timestamps = true;

    public function categoria() {
        return $this->belongsTo(CategoriaRenda::class, 'categoria_id', 'id');
    }
}
