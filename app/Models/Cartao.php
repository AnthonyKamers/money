<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cartao extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'cartoes';

    // Primary Key
    public $primaryKey = 'id';

    // Timestamps
    public $timestamps = true;

    public function faturas() {
        return $this->hasMany(FaturaCartao::class, 'cartao_id', 'id');
    }
}
