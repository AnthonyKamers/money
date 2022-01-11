<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormaPagamento extends Model
{
    use HasFactory;

    // Table Name
    protected $table = 'formas_pagamento';

    // Primary Key
    public $primaryKey = 'id';

    // Timestamps
    public $timestamps = false;
}
