<?php

namespace App\Http\Controllers;

use App\Models\Despesa;
use App\Models\DespesaFixa;
use App\Models\ParcelaDespesa;
use App\Models\FormaPagamento;

use App\Models\Cartao;
use App\Models\FaturaCartao;
use App\Models\DespesaFatura;

use Illuminate\Http\Request;

class DespesaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $despesas = Despesa::where('banco_id', $request->banco_id)
                            ->with('categoria')
                            ->with('forma_pagamento')
                            ->get();

        return response()->json($despesas);
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

    private function get_next_mes_ano($mes, $ano) {
        if ($mes == 12) {
            $mes_proximo = 01;
            $ano_proximo = $ano + 1;
        } else {
            $mes_proximo = $mes + 1;
            $ano_proximo = $ano;
        }

        return [$mes_proximo, $ano_proximo];
    }

    private function criar_faturas_cartao($fatura, $despesa, $parcelas, $cartao, $mes_atual, $ano_atual) {
        // tem faturas, sendo que a primeira vai ser a que já foi criada
        foreach($parcelas as $key => $parcela) {
            if ($key == 0) {
                // cadastrar a primeira despesa como na fatura já criada
                $despesa_fatura = new DespesaFatura;
                $despesa_fatura->cartao_id = $despesa->cartao_id;
                $despesa_fatura->fatura_id = $fatura->id;
                $despesa_fatura->despesa_id = $despesa->id;
                $despesa_fatura->parcela_now = $key + 1;
                $despesa_fatura->valor_parcela = floatval($parcela['valor']);
                $despesa_fatura->save();
            } else {
                // primeiro criar a nova fatura, depois cadastrar a despesa nessa fatura
                $fatura1 = new FaturaCartao;
                $fatura1->banco_id = $despesa->banco_id;
                $fatura1->cartao_id = $despesa->cartao_id;

                [$mes_atual, $ano_atual] = $this->get_next_mes_ano($mes_atual, $ano_atual);

                $fatura1->mes_fatura = $mes_atual;
                $fatura1->ano_fatura = $ano_atual;

                $data_vencimento = $ano_atual . '-' . $mes_atual . '-' . $cartao->vencimento_fatura;

                $fatura1->data_vencimento = $data_vencimento;
                $fatura1->ja_debitado = false;
                $fatura1->save();

                // cadastrar a parcela
                $despesa_fatura = new DespesaFatura;
                $despesa_fatura->cartao_id = $despesa->cartao_id;
                $despesa_fatura->fatura_id = $fatura1->id;
                $despesa_fatura->despesa_id = $despesa->id;
                $despesa_fatura->parcela_now = $key + 1;
                $despesa_fatura->valor_parcela = floatval($parcela['valor']);
                $despesa_fatura->save();
            }
        }
    }

    private function criar_uma_despesa_fatura($fatura, $despesa) {
        $despesa_fatura = new DespesaFatura;
        $despesa_fatura->cartao_id = $despesa->cartao_id;
        $despesa_fatura->fatura_id = $fatura->id;
        $despesa_fatura->despesa_id = $despesa->id;
        $despesa_fatura->parcela_now = 1;
        $despesa_fatura->valor_parcela = floatval($despesa->valor);
        $despesa_fatura->save();
    }

    private function fatura_cartao_credito($despesa, $mes_fatura, $ano_fatura, $parcelas = null) {
        $cartao = Cartao::find($despesa->cartao_id);

        // ver se já existe fatura com mês e ano
        $fatura = FaturaCartao::where('mes_fatura', $mes_fatura)
                                ->where('ano_fatura', $ano_fatura)
                                ->where('cartao_id', $despesa->cartao_id)
                                ->first();
        
        // variáveis auxiliares de data
        $mes_atual = $mes_fatura;
        $ano_atual = $ano_fatura;

        // ainda não existe a fatura
        if ($fatura == null) {
            $fatura = new FaturaCartao;
            $fatura->banco_id = $despesa->banco_id;
            $fatura->cartao_id = $despesa->cartao_id;
            $fatura->mes_fatura = $mes_fatura;
            $fatura->ano_fatura = $ano_fatura;

            $data_vencimento = $ano_fatura . '-' . $mes_fatura . '-' . $cartao->vencimento_fatura;
            $fatura->data_vencimento = $data_vencimento;
            $fatura->ja_debitado = false;
            $fatura->save();

            // cadastrar como despesa da fatura
            if (!$parcelas) {
                // se não tem parcela, basta cadastrar a própria despesa
                $this->criar_uma_despesa_fatura($fatura, $despesa);
            } else {
                $this->criar_faturas_cartao($fatura, $despesa, $parcelas, $cartao, $mes_atual, $ano_atual);
            }
        } else {
            // se já tiver fatura e não tiver parcela, basta cadastrar a própria despesa
            if (!$parcelas) {
                // se não tem parcela, basta cadastrar a própria despesa
                $this->criar_uma_despesa_fatura($fatura, $despesa);
            } else {
                $this->criar_faturas_cartao($fatura, $despesa, $parcelas, $cartao, $mes_atual, $ano_atual);
            }
        }
    }

    private function despesa_despesa_fixa($despesa, $despesa_fixa) {
        $formas_pagamento = config('enums.formas_pagamento');

        // cadastrar primeiro a despesa fixa
        $new_despesa_fixa = new DespesaFixa;
        $new_despesa_fixa->banco_id = $despesa['banco_id'];
        $new_despesa_fixa->categoria_id = $despesa['categoria_id'];
        $new_despesa_fixa->forma_pagamento_id = $despesa['forma_pagamento_id'];
        $new_despesa_fixa->valor = floatval($despesa['valor']);
        $new_despesa_fixa->qtd_mes = intval($despesa_fixa['qtd_mes']);
        $new_despesa_fixa->descricao = $despesa['descricao'];

        if ($despesa_fixa['mensal'] && $despesa_fixa['sempre_dia']) {
            $new_despesa_fixa->dia_mes = intval($despesa_fixa['dia_mes']);
        }

        // ver se é cartão de crédito/débito
        if ($despesa['forma_pagamento_id'] == $formas_pagamento['CartaoDebito'] ||
            $despesa['forma_pagamento_id'] == $formas_pagamento['CartaoCredito']) {
            $new_despesa_fixa->cartao_id = $despesa['cartao_id'];
        }

        $new_despesa_fixa->save();

        // cadastrar a despesa
        $despesa1 = new Despesa;
        $despesa1->banco_id = $despesa['banco_id'];
        $despesa1->categoria_id = $despesa['categoria_id'];
        $despesa1->forma_pagamento_id = $despesa['forma_pagamento_id'];
        $despesa1->descricao = $despesa['descricao'];
        $despesa1->valor = floatval($despesa['valor']);
        $despesa1->data = $despesa['data'];
        $despesa1->ja_debitado = $despesa['ja_debitado'];
        $despesa1->parcelado = false;
        $despesa1->despesa_fixa_id = $new_despesa_fixa->id;
        
        if ($despesa['forma_pagamento_id'] == $formas_pagamento['CartaoDebito'] ||
            $despesa['forma_pagamento_id'] == $formas_pagamento['CartaoCredito']) {
                $despesa1->cartao_id = $despesa['cartao_id'];
        }

        $despesa1->save();


        if ($despesa['forma_pagamento_id'] == $formas_pagamento['CartaoCredito']) {
            $this->fatura_cartao_credito($despesa1, $despesa['mes_fatura'], $despesa['ano_fatura']);
        }
    }

    private function despesa_parcelada($despesa, $parcelas) {
        $formas_pagamento = config('enums.formas_pagamento');

        // cadastrar a despesa
        $despesa1 = new Despesa;
        $despesa1->banco_id = $despesa['banco_id'];
        $despesa1->categoria_id = $despesa['categoria_id'];
        $despesa1->forma_pagamento_id = $despesa['forma_pagamento_id'];
        $despesa1->descricao = $despesa['descricao'];
        $despesa1->valor = floatval($despesa['valor']);
        $despesa1->data = $despesa['data'];
        $despesa1->ja_debitado = $despesa['ja_debitado'];
        $despesa1->parcelado = true;
        $despesa1->parcelas = count($parcelas);

        if ($despesa['forma_pagamento_id'] == $formas_pagamento['CartaoDebito'] ||
            $despesa['forma_pagamento_id'] == $formas_pagamento['CartaoCredito']) {
                $despesa1->cartao_id = $despesa['cartao_id'];
        }

        $despesa1->save();

        // cadastrar as parcelas (se não for cartão de crédito)
        if ($despesa['forma_pagamento_id'] == $formas_pagamento['CartaoCredito']) {
            // se for cartão de crédito, cadastrar como parcela apenas da fatura
            $this->fatura_cartao_credito($despesa1, $despesa['mes_fatura'], $despesa['ano_fatura'], $parcelas);
        } else {
            // caso contrário, cadastrar como parcela normal
            foreach($parcelas as $key => $parcela) {
                $parcela1 = new ParcelaDespesa;
                $parcela1->despesa_id = $despesa1->id;
                $parcela1->parcela = $key + 1;
                $parcela1->valor = floatval($parcela['valor']);
                $parcela1->data = $parcela['data'];
                $parcela1->ja_debitado = $parcela['ja_debitado'];
                $parcela1->save();
            }
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
        $despesa = $request->despesa;
        $parcelas = $request->parcelas;
        $despesa_fixa = $request->despesa_fixa;

        // primeiro, ver se é despesa fixa
        if ($despesa['despesa_fixa'] == true) {
            $this->despesa_despesa_fixa($despesa, $despesa_fixa);
            return response()->json('success');
        }
        elseif ($despesa['parcelado'] == true) {
            $this->despesa_parcelada($despesa, $parcelas);
            return response()->json('success');
        }
        else {
            // cadastrar despesa (sem despesa fixa e sem parcelas)
            $despesa1 = new Despesa;
            $despesa1->banco_id = intval($despesa['banco_id']);
            $despesa1->categoria_id = intval($despesa['categoria_id']);
            $despesa1->forma_pagamento_id = $despesa['forma_pagamento_id'];
            $despesa1->descricao = $despesa['descricao'];
            $despesa1->valor = floatval($despesa['valor']);
            $despesa1->data = $despesa['data'];
            $despesa1->ja_debitado = $despesa['ja_debitado'];
            $despesa1->parcelado = false;
            $despesa1->save();

            return response()->json('success');
        }

        return response()->json('error');
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

    public function getFormasPagamento() {
        $formas_pagamento = FormaPagamento::all();

        return response()->json($formas_pagamento);
    }

    public function readParcelas(Request $request) {
        $parcelas = Despesa::where('id', $request->despesa_id)
                            ->with('forma_pagamento')
                            ->with('categoria')
                            ->with('cartao')
                            ->with('parcelas_normais')
                            ->with('parcelas_cartao.fatura')
                            ->get();
        
        return response()->json($parcelas);
    }

    public function readDespesaFixa(Request $request) {
        $despesa_fixa = DespesaFixa::find($request->despesa_fixa_id)->with('categoria')->get();
        $despesas = Despesa::where('despesa_fixa_id', $request->despesa_fixa_id)->get();

        $data = [
            'despesa_fixa' => $despesa_fixa,
            'despesas' => $despesas
        ];

        return response()->json($data);
    }

    public function readDespesaFixaAll(Request $request) {
        $despesas_fixas = DespesaFixa::where('banco_id', $request->banco_id)->with('categoria')->get();

        return response()->json($despesas_fixas);
    }
}
