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
}
