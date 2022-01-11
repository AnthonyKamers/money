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
                        <th class="text-left">Valor</th>
                        <th class="text-left">Parcelado</th>
                        <th class="text-left">Fixa</th>
                        <th class="text-left">Já debitado</th>
                        <th class="text-left">Ações</th>
                    </tr>
                </thead>

                <tbody></tbody>
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
    }
}
</script>

<style scoped>
</style>