<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Banco;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BancoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $bancos = Banco::where("user_id", Auth::user()->id)->get();

        return response()->json($bancos);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $banco = new Banco;
        $banco->user_id = Auth::user()->id;
        $banco->nome = $request->nome;
        $banco->agencia = $request->agencia;
        $banco->conta = $request->conta;
        $banco->saldo = $request->saldo;
        $banco->save();

        return response()->json("success");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $banco = Banco::find(intval($request->id));
        $banco->nome = $request->banco["nome"];
        $banco->agencia = $request->banco["agencia"];
        $banco->conta = $request->banco["conta"];
        $banco->saldo = $request->banco["saldo"];
        $banco->save();

        return response()->json("success");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $banco = Banco::find($request->id);
        $banco->delete();

        return response()->json("success");
    }
}
