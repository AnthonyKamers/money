<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DespesaFixa extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'despesas_fixas';

    // Primary Key
    public $primaryKey = 'id';

    // Timestamps
    public $timestamps = true;
}
