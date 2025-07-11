<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Cartao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartaoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $cartoes = Cartao::where("banco_id", $request->banco_id)->get();
        
        return response()->json($cartoes);
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
        $cartao = new Cartao;
        $cartao->banco_id = $request->banco_id;
        $cartao->nome = $request->nome;
        $cartao->tipo = $request->tipo;
        $cartao->final = $request->final;
        $cartao->mensalidade = $request->mensalidade;
        $cartao->vencimento_fatura = $request->vencimento_fatura;
        $cartao->fechamento_fatura = $request->fechamento_fatura;
        $cartao->limite = $request->limite;
        $cartao->cor = $request->cor;
        $cartao->save();

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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $cartao = Cartao::find($request->id);
        $cartao->delete();

        return response()->json("success");
    }
}
