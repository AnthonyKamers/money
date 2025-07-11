<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParcelaRenda extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'parcelas_renda';

    // Primary Key
    public $primaryKey = 'id';

    // Timestamps
    public $timestamps = true;

    public function renda() {
        return $this->belongsTo(Renda::class, 'renda_id', 'id');
    }
}
