<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <h1>Despesas de {{ $store.getters["Bancos/getBancoNow"] != null ? $store.getters["Bancos/getBancoNow"].nome : "" }}</h1>

        <router-link to="cadastrar-despesa"><v-btn class="primary">Cadastrar despesa</v-btn></router-link>

        <v-row class="mt-5">
            <InputDate
                label="Data de:"
                dense
                clearable
                :value="filtros.dataDe"
                @update="filtros.dataDe = $event"
            ></InputDate>
            <InputDate
                label="Data até:"
                dense
                clearable
                :value="filtros.dataAte"
                @update="filtros.dataAte = $event"
            ></InputDate>
            <Select
                label="Categoria"
                dense
                clearable
                :value="filtros.categoria_id"
                :items="
                        $store.getters['Categoriasdespesa/getCategorias'] != null ?
                        sortSelect(generateSelectValues($store.getters['Categoriasdespesa/getCategorias'], 'nome', 'id')) :
                        []
                        "
                @update="filtros.categoria_id = $event"
            ></Select>
            <Input
                label="Busca"
                dense
                clearable
                :value="filtros.busca"
                @update="filtros.busca = $event"
            ></Input>
        </v-row>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-left">Data</th>
                        <th class="text-left">Categoria</th>
                        <th class="text-left">Forma de pagamento</th>
                        <th class="text-left">Descrição</th>
                        <th class="text-left">Valor</th>
                        <th class="text-left">Parcelado</th>
                        <th class="text-left">Fixa</th>
                        <th class="text-left">Já debitado</th>
                        <th class="text-left">Ações</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="despesa in getDespesas()" :key="despesa.id">
                        <td><div class="square noCursor" :style="{ backgroundColor: despesa.categoria.cor }"></div></td>
                        <td>{{ despesa.data | moment("DD/MM/Y") }}</td>
                        <td>{{ despesa.categoria.nome }}</td>
                        <td>{{ despesa.forma_pagamento.descricao }}</td>
                        <td>{{ despesa.descricao }}</td>
                        <td>{{ convertBrazil(despesa.valor) }}</td>

                        <td v-if="despesa.parcelado">
                            <router-link :to="`ver-parcelas/${despesa.id}`">Sim</router-link>
                        </td>
                        <td v-else>Não</td>

                        <td v-if="despesa.despesa_fixa_id">
                            <router-link :to="`ver-despesa-fixa/${despesa.despesa_fixa_id}`">Sim</router-link>
                        </td>
                        <td v-else>Não</td>

                        <td>{{ booleanConvert(despesa.ja_debitado) }}</td>
                        <td>
                            <v-icon>mdi-pencil</v-icon>
                            <v-icon>mdi-delete</v-icon>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
import Select from "../../../../Components/Select";
import InputDate from "../../../../Components/InputDate";
import Input from "../../../../Components/Input";

export default {
    name: "Despesas",

    components: {
        Select,
        InputDate,
        Input
    },

    created() {
        this.$store.dispatch("Bancos/readBancos", this.$root).then(
            () => {
                const banco = this.$store.getters["Bancos/getBancos"].find(el => el.id == this.$route.params.banco_id);
                this.$store.commit("Bancos/SET_BANCO_NOW", banco);
                this.$store.dispatch("Despesas/readDespesas", this.$root);
                this.$store.dispatch("Categoriasdespesa/readCategorias", this.$root);
                this.$store.dispatch("Despesas/resetState");
            }
        );
    },

    data() {
        return {
            despesaDelete: {},
            dialogDelete: false,
            
            filtros: {
                dataDe: "",
                dataAte: "",
                categoria_id: "",
                busca: ""
            },
        }
    },

    methods: {
        getDespesas() {
            if (this.$store.getters["Despesas/getDespesas"]) {
                return this.orderBy(
                    this.$store.getters["Despesas/getDespesas"]
                            .filter(el => 
                                    JSON.stringify(el)
                                    .toLowerCase()
                                    .indexOf(this.filtros.busca ? this.filtros.busca.toLowerCase() : "") > -1
                                    )
                            .filter(el =>
                                    this.filtros.dataDe
                                        ? new Date(el.data).getTime() >= new Date(this.filtros.dataDe).getTime()
                                        : true
                                    )
                            .filter(el =>
                                    this.filtros.dataAte
                                        ? new Date(el.data).getTime() <= new Date(this.filtros.dataAte).getTime()
                                        : true
                                    )
                            .filter(el =>
                                    this.filtros.categoria_id
                                        ? el.categoria_id == this.filtros.categoria_id
                                        : true)
                );
            }
        },

        orderBy(rendas) {
            return rendas.sort((a, b) => {
                if (new Date(a.data) > new Date(b.data)) return -1;
                else return 1;
            });
        },
    },
}
</script>

<style scoped>
</style>