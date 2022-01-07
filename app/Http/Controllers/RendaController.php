<?php

namespace App\Http\Controllers;

use App\Models\CategoriaRenda;
use App\Models\Renda;
use App\Models\RendaFixa;
use App\Models\ParcelaRenda;
use Illuminate\Http\Request;

class RendaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $rendas = Renda::where('banco_id', $request->banco_id)->with('categoria')->get();

        return response()->json($rendas);
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

    private function renda_renda_fixa($renda, $renda_fixa) {
        // cadastrar primeiro a renda fixa
        $new_renda_fixa = new RendaFixa;
        $new_renda_fixa->banco_id = $renda['banco_id'];
        $new_renda_fixa->categoria_id = $renda['categoria_id'];
        $new_renda_fixa->valor = floatval($renda['valor']);
        $new_renda_fixa->qtd_mes = intval($renda_fixa['qtd_mes']);
        $new_renda_fixa->descricao = $renda['descricao'];
        
        if ($renda_fixa['mensal'] && $renda_fixa['sempre_dia']) {
            $new_renda_fixa->dia_mes = intval($renda_fixa['dia_mes']);
        }

        $new_renda_fixa->save();

        // cadastrar a renda
        $renda1 = new Renda;
        $renda1->banco_id = $renda['banco_id'];
        $renda1->categoria_id = $renda['categoria_id'];
        $renda1->descricao = $renda['descricao'];
        $renda1->valor = floatval($renda['valor']);
        $renda1->data = $renda['data'];
        $renda1->ja_em_conta = $renda['ja_em_conta'];
        $renda1->parcelado = false;
        $renda1->renda_fixa_id = $new_renda_fixa->id;
        $renda1->save();
    }

    private function renda_parcelada($renda, $parcelas) {
        // cadastrar a renda
        $renda1 = new Renda;
        $renda1->banco_id = $renda['banco_id'];
        $renda1->categoria_id = $renda['categoria_id'];
        $renda1->descricao = $renda['descricao'];
        $renda1->valor = floatval($renda['valor']);
        $renda1->data = $renda['data'];
        $renda1->ja_em_conta = $renda['ja_em_conta'];
        $renda1->parcelado = true;
        $renda1->parcelas = count($parcelas);
        $renda1->save();

        // cadastrar as parcelas
        foreach($parcelas as $key => $parcela) {
            $parcela1 = new ParcelaRenda;
            $parcela1->renda_id = $renda1->id;
            $parcela1->parcela = $key + 1;
            $parcela1->valor = floatval($parcela['valor']);
            $parcela1->data = $parcela['data'];
            $parcela1->ja_em_conta = $parcela['ja_em_conta'];
            $parcela1->save();
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $renda = $request->renda;
        $parcelas = $request->parcelas;
        $renda_fixa = $request->renda_fixa;

        // primeiro, ver se é renda fixa
        if ($renda["renda_fixa"] == true) {
            $this->renda_renda_fixa($renda, $renda_fixa);

            return response()->json('success');
        }
        else if ($renda['parcelado'] == true) {
            $this->renda_parcelada($renda, $parcelas);

            return response()->json('success');
        }
        else {
            // cadastrar renda (sem renda fixa e sem parcelas)
            $renda1 = new Renda;
            $renda1->banco_id = intval($renda['banco_id']);
            $renda1->categoria_id = $renda['categoria_id'];
            $renda1->descricao = $renda['descricao'];
            $renda1->valor = floatval($renda['valor']);
            $renda1->data = $renda['data'];
            $renda1->ja_em_conta = $renda['ja_em_conta'];
            $renda1->parcelado = false;
            $renda1->save();

            return response()->json('success');
        }

        return response()->json("error");
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function readParcelas(Request $request) {
        $parcelas = Renda::where('id', $request->renda_id)
                           ->with('parcelas_all')
                           ->with('categoria')
                           ->get();
        
        return response()->json($parcelas);
    }

    public function readRendaFixa(Request $request) {
        $renda_fixa = RendaFixa::find($request->renda_fixa_id)->with('categoria')->get();
        
        if (!$request->busca) {
            $data_hoje = date('Y-m-d');
            $data_3_meses = date('Y-m-d', strtotime(date('Y-m-d')." -3 month"));
            $rendas_especificas = Renda::whereBetween('data', [$data_3_meses, $data_hoje])
                                        ->where('renda_fixa_id', $request->renda_fixa_id)
                                        ->get();
        } else {
            $rendas_especificas = Renda::whereBetween('data', [$request->dataDe, $request->dataAte])
                                        ->where('renda_fixa_id', $request->renda_fixa_id)
                                        ->get();
        }

        $data = [
            'renda_fixa' => $renda_fixa,
            'rendas' => $rendas_especificas
        ];
        
        return response()->json($data);
    }
}
