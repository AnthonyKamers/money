<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriaDespesa extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'categoria_despesas';

    // Primary Key
    public $primaryKey = 'id';

    // Timestamps
    public $timestamps = true;
}
