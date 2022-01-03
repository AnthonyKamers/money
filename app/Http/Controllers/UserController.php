<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show(Request $request, $id) {
        $user = User::find($id);

        return response()->json(
            ['user' => $user->toArray()], 200);
    }
}
