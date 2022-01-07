<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <h1>Rendas de {{ $store.getters["Bancos/getBancoNow"] != null ? $store.getters["Bancos/getBancoNow"].nome : "" }}</h1>

        <router-link to="cadastrar-renda"><v-btn class="primary">Cadastrar renda</v-btn></router-link>

        <v-row class="mt-5">
            <InputDate
                label="Data de:"
                dense
                :rules="ruleRequired"
                :value="filtros.dataDe"
                @update="filtros.dataDe = $event"
            ></InputDate>
            <InputDate
                label="Data até:"
                dense
                :rules="ruleRequired"
                :value="filtros.dataAte"
                @update="filtros.dataAte = $event"
            ></InputDate>
            <Select
                label="Categoria"
                dense
                :value="filtros.categoria_id"
                :items="itemsBool"
                @update="filtros.categoria_id = $event"
            ></Select>
        </v-row>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-left">Data</th>
                        <th class="text-left">Categoria</th>
                        <th class="text-left">Descrição</th>
                        <th class="text-left">Valor</th>
                        <th class="text-left">Parcelado</th>
                        <th class="text-left">Fixa</th>
                        <th class="text-left">Já em conta</th>
                        <th class="text-left">Ações</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="renda in $store.getters['Rendas/getRendas']" :key="renda.id">
                        <td><div class="square noCursor" :style="{ backgroundColor: renda.categoria.cor }"></div></td>
                        <td>{{ renda.data | moment("DD/MM/Y") }}</td>
                        <td>{{ renda.categoria.nome }}</td>
                        <td>{{ renda.descricao }}</td>
                        <td>{{ convertBrazil(renda.valor) }}</td>
                        
                        <td v-if="renda.parcelado">
                            <router-link :to="`ver-parcelas/${renda.id}`">Sim</router-link>
                        </td>
                        <td v-else>Não</td>

                        <td v-if="renda.renda_fixa_id">
                            <router-link :to="`ver-renda-fixa/${renda.renda_fixa_id}`">Sim</router-link>
                        </td>
                        <td v-else>Não</td>

                        <td>{{ booleanConvert(renda.ja_em_conta) }}</td>
                        <td>
                            <v-icon>mdi-pencil</v-icon>
                            <v-icon>mdi-delete</v-icon>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-dialog
            v-model="dialogDelete"
            persistent
            max-width="550"
            >
            <v-card>
                <v-card-title class="text-h5">
                Deseja realmente deletar esta renda?
                </v-card-title>
                <v-card-text>
                    Após deletar esta renda, não poderá mais ser editada!
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="fecharDelete"
                    >
                        Fechar
                    </v-btn>
                    <v-btn
                        color="red darken-1"
                        text
                        :loading="$store.getters['Categoriasrenda/getApi'] == 'pending'"
                        @click="deletar"
                    >
                        Deletar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Select from "../../../../Components/Select";
import InputDate from "../../../../Components/InputDate";
import Input from "../../../../Components/Input";

export default {
    name: "Rendas",

    components: {
        Select,
        InputDate
    },

    created() {
        this.$store.dispatch("Bancos/readBancos", this.$root).then(
            () => {
                this.banco = this.$store.getters["Bancos/getBancos"].find(el => el.id == this.$route.params.banco_id);
                this.$store.commit("Bancos/SET_BANCO_NOW", this.banco);
                this.$store.dispatch("Rendas/readRendas", this.$root);
                this.$store.dispatch("Rendas/resetState");
            }
        );

    },

    data() {
        return {
            banco: "",

            rendaDelete: {},
            dialogDelete: false,

            filtros: {
                dataDe: "",
                dataAte: "",

                categoria_id: "",

                min: "",
                max: "",
                range: [],

                busca: ""
            }
        }
    },

    methods: {
        // attributeValue() {
        //     const rendas = [...this.$store.getters["Rendas/getRendas"]];
        //     rendas.sort((a, b) => {
        //         return a.valor - b.valor
        //     });

        //     this.min = rendas[0].valor;
        //     this.max = rendas[rendas.length - 1].valor;
        //     this.range = [this.min, this.max];

        //     console.log(this.min, this.max, this.range);
        // },

        deleteRenda(categoria) {
            this.rendaDelete = categoria;
            this.dialogDelete = true;
        },

        deletar() {
            const data = {
                instance: this.$root,
                data: {
                    id: parseInt(this.rendaDelete.id)
                }
            };

            this.$store.dispatch("Rendas/deleteRenda", data).then(
                response => {
                    this.fecharDelete();

                    this.$store.dispatch("Global/setSnackbar", {text: "Renda deletada com sucesso", color: "success"});
                },
                error => {
                    this.$store.dispatch("Global/setSnackbar", {text: error, color: "error"});
                }
            );
        },

        fecharDelete() {
            this.cartaoDelete = {};
            this.dialogDelete = false;
        }
    }
}
</script>

<style scoped>
</style>