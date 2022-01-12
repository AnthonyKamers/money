<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <h1>Cadastrar despesas</h1>

        <v-form
            ref="form"
            v-model="valid"
        >
            <v-row>
                <Select
                    label="Categoria"
                    :rules="ruleRequired"
                    :value="despesa.categoria_id"
                    :items="
                        $store.getters['Categoriasdespesa/getCategorias'] != null ?
                        sortSelect(generateSelectValues($store.getters['Categoriasdespesa/getCategorias'], 'nome', 'id')) :
                        []
                    "
                    @update="despesa.categoria_id = $event"
                ></Select>
                <Input
                    label="Descricao"
                    :rules="ruleRequired"
                    :value="despesa.descricao"
                    @update="despesa.descricao = $event"
                ></Input>
                <Input
                    label="Valor total"
                    :rules="ruleRequired"
                    :value="despesa.valor"
                    @update="despesa.valor = $event"
                ></Input>
            </v-row>

            <v-row>
                <Select
                    label="Forma de pagamento"
                    :rules="ruleRequired"
                    :value="despesa.forma_pagamento_id"
                    :items="
                        $store.getters['Formaspagamento/getFormasPagamento'] != null ?
                        sortSelect(generateSelectValues($store.getters['Formaspagamento/getFormasPagamento'], 'descricao', 'id')) :
                        []
                    "
                    @update="despesa.forma_pagamento_id = $event"
                ></Select>

                <Select
                    v-if="despesa.forma_pagamento_id == 5 || despesa.forma_pagamento_id == 6"
                    label="Cartão usado"
                    :rules="ruleRequired"
                    :value="despesa.cartao_id"
                    :items="getItemsCartao()"
                    @update="despesa.cartao_id = $event"
                ></Select>

                <InputNumber
                    v-if="despesa.forma_pagamento_id == 5"
                    label="Mês fatura"
                    :rules="ruleRequired"
                    :value="despesa.mes_fatura"
                    :min="1"
                    :max="12"
                    :stepInt="true"
                    @update="despesa.mes_fatura = $event"
                ></InputNumber>

                <InputNumber
                    v-if="despesa.forma_pagamento_id == 5"
                    label="Ano fatura"
                    :rules="ruleRequired"
                    :value="despesa.ano_fatura"
                    :min="1999"
                    :max="2030"
                    :stepInt="true"
                    @update="despesa.ano_fatura = $event"
                ></InputNumber>

                <InputDate
                    label="Data"
                    :rules="ruleRequired"
                    :value="despesa.data"
                    @update="despesa.data = $event"
                ></InputDate>
            </v-row>

            <v-row>
                <Select
                    label="Parcelado"
                    :value="despesa.parcelado"
                    :items="itemsBool"
                    @update="despesa.parcelado = $event"
                ></Select>

                <Select
                    label="Já debitado"
                    :value="despesa.ja_debitado"
                    :items="itemsBool"
                    :disabled="despesa.parcelado"
                    @update="despesa.ja_debitado = $event"
                ></Select>

                <Select
                    label="Despesa fixa"
                    :value="despesa.despesa_fixa"
                    :items="itemsBool"
                    :disabled="despesa.parcelado"
                    @update="despesa.despesa_fixa = $event"
                ></Select>
            </v-row>

            <v-btn
                v-if="!despesa.parcelado && despesa.despesa_fixa"
                class="secondary"
                :disabled="drawerDespesaFixa"
                @click="drawerDespesaFixa = true"
            >
                Despesa fixa
            </v-btn>
            <v-btn
                v-if="despesa.parcelado"
                class="secondary"
                :disabled="drawerParcelas"
                @click="drawerParcelas = true"
            >
                Parcelas
            </v-btn>
            <v-btn
                class="primary"
                @click="cadastrar"
            >
                Cadastrar
            </v-btn>
        </v-form>

        <ParcelasDespesa
            :active="drawerParcelas"
            :valor_total="despesa.valor"
            :forma_pagamento_id="despesa.forma_pagamento_id"
            @valid="validParcelas = $event"
            @close="drawerParcelas = false"
        ></ParcelasDespesa>

        <CadastrarDespesaFixa
            :active="drawerDespesaFixa"
            :despesa="despesa"
            @valid="validDespesaFixa = $event"
            @close="drawerDespesaFixa = false"
        ></CadastrarDespesaFixa>
    </div>
</template>

<script>
import Input from "../../../../Components/Input.vue";
import Select from "../../../../Components/Select.vue";
import InputDate from "../../../../Components/InputDate.vue";
import InputNumber from "../../../../Components/InputNumber.vue";
import ParcelasDespesa from "./ParcelasDespesa.vue";
import CadastrarDespesaFixa from "./CadastrarDespesaFixa.vue";

export default {
    name: "CadastrarDespesa",

    components: {
        Input,
        Select,
        InputDate,
        ParcelasDespesa,
        CadastrarDespesaFixa,
        InputNumber
    },

    created() {
        this.$store.dispatch("Bancos/readBancos", this.$root).then(
            () => {
                this.banco = this.$store.getters["Bancos/getBancos"].find(el => el.id == this.$route.params.banco_id);
                this.$store.commit("Bancos/SET_BANCO_NOW", this.banco);
                this.$store.dispatch("Categoriasdespesa/readCategorias", this.$root);
                this.$store.dispatch("Formaspagamento/readFormasPagamento", this.$root);
                this.$store.dispatch("Cartoes/readCartoes", this.$root);
            }
        );
    },

    mounted() {
        if (this.$route.path == "/editar-despesa") {
            if (this.$store.getters["Despesa/getEditDespesa"] == null) this.$router.push({ path: "/despesas" });

            this.edit = true;
            this.despesa = {...this.$store.getters["Despesa/getEditDespesa"]};
            this.despesa.banco_id = this.$route.params.banco_id;
        } else {
            this.edit = false;
            this.despesa = {...this.despesaDefault};
            this.despesa.banco_id = this.$route.params.banco_id;
        }
    },

    data() {
        return {
            valid: false,

            despesaDefault: {
                forma_pagamento_id: "",
                categoria_id: "",
                cartao_id: "",

                descricao: "",
                valor: "",
                data: "",
                ja_debitado: false,
                parcelado: false,

                despesa_fixa: false,

                mes_fatura: new Date().getMonth() + 1,
                ano_fatura: new Date().getFullYear()
            },

            despesa: {},

            drawerParcelas: false,
            validParcelas: false,

            drawerDespesaFixa: false,
            validDespesaFixa: false
        }
    },

    methods: {
        getItemsCartao() {
            const cartoes = this.$store.getters["Cartoes/getCartoes"];

            if (this.despesa.forma_pagamento_id == 5) {
                // cartão de crédito
                if (cartoes) return this.generateSelectValues(cartoes.filter(el => el.tipo == 1), 'nome', 'id', "final")
                else return []

            } else if (this.despesa.forma_pagamento_id == 6) {
                // cartão de débito
                if (cartoes) return this.generateSelectValues(cartoes.filter(el => el.tipo == 0), 'nome', 'id', "final")
                else return []

            } else {
                return []
            }
        },

        cadastrar() {
            if (this.$refs.form.validate()) {
                if (this.despesa.parcelado && !this.validParcelas) {
                    this.$store.dispatch("Global/setSnackbar", {text: "Campos em parcelas não estão completos", color: 'error'});
                    this.drawerParcelas = true;
                    return;
                }

                if (this.despesa.despesa_fixa && !this.validDespesaFixa) {
                    this.$store.dispatch("Global/setSnackbar", {text: "Campos em despesa fixa não estão completos", color: 'error'});
                    this.drawerRendaFixa = true;
                    return;
                }

                const despesa = {...this.despesa};
                despesa.valor = parseFloat(despesa.valor.replace(",", "."));

                const data = {
                    instance: this.$root,
                    data: despesa
                };

                // cadastrar depois de todas as verificações
                this.$store.dispatch("Despesas/createDespesa", data).then(
                    response => {
                        this.$store.dispatch("Despesas/resetState");
                        this.$router.go(-1);
                    },
                    error => {
                        this.$store.dispatch("Global/setSnackbar", {text: `Erro ao cadastrar despesa - ${error}`, color: 'error'});
                    }
                );
            }
        }
    },
}
</script>

<style scoped>
</style>