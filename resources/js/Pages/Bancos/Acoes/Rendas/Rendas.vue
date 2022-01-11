<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <h1>Rendas de {{ $store.getters["Bancos/getBancoNow"] != null ? $store.getters["Bancos/getBancoNow"].nome : "" }}</h1>

        <router-link to="cadastrar-renda"><v-btn class="primary">Cadastrar renda</v-btn></router-link>

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
                        $store.getters['Categoriasrenda/getCategorias'] != null ?
                        sortSelect(generateSelectValues($store.getters['Categoriasrenda/getCategorias'], 'nome', 'id')) :
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
                        <th class="text-left">Descrição</th>
                        <th class="text-left">Valor</th>
                        <th class="text-left">Parcelado</th>
                        <th class="text-left">Fixa</th>
                        <th class="text-left">Já em conta</th>
                        <th class="text-left">Ações</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="renda in getRendas()" :key="renda.id">
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
                            <v-tooltip top v-if="!renda.ja_em_conta">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon @click="contabilizarRenda(renda)" v-on="on" v-bind="attrs">
                                        mdi-currency-usd
                                    </v-icon>
                                </template>
                                <span>Colocar em conta</span>
                            </v-tooltip>
                            <v-icon>mdi-pencil</v-icon>
                            <v-icon>mdi-delete</v-icon>
                        </td>
                    </tr>
                </tbody>

                <tfoot>
                    <tr class="bolder">
                        <td colspan="4">Total</td>
                        <td>{{ convertBrazil(total) }}</td>
                    </tr>
                </tfoot>
            </template>
        </v-simple-table>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Já recebido</th>
                        <th class="text-left">Não recebido</th>
                    </tr>
                </thead>

                <tbody>
                    <tr class="bolder">
                        <td>{{ convertBrazil(totalRecebido) }}</td>
                        <td>{{ convertBrazil(totalNaoRecebido) }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-dialog
            v-model="dialogContabilizar"
            persistent
            max-width="550"
            >
            <v-card>
                <v-card-title class="text-h5">
                Deseja realmente contabilizar esta renda?
                </v-card-title>
                <v-card-text>
                    Após contabilizar esta renda, seu saldo e extrato serão atualizados!
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="fecharContabilizar"
                    >
                        Fechar
                    </v-btn>
                    <v-btn
                        color="success darken-1"
                        text
                        :loading="$store.getters['Rendas/getApi'] == 'pending'"
                        @click="contabilizar"
                    >
                        Contabilizar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
        InputDate,
        Input
    },

    created() {
        this.$store.dispatch("Bancos/readBancos", this.$root).then(
            () => {
                const banco = this.$store.getters["Bancos/getBancos"].find(el => el.id == this.$route.params.banco_id);
                this.$store.commit("Bancos/SET_BANCO_NOW", banco);
                this.$store.dispatch("Rendas/readRendas", this.$root);
                this.$store.dispatch("Categoriasrenda/readCategorias", this.$root);
                this.$store.dispatch("Rendas/resetState");
            }
        );
    },

    data() {
        return {
            rendaDelete: {},
            dialogDelete: false,

            filtros: {
                dataDe: "",
                dataAte: "",
                categoria_id: "",
                busca: ""
            },

            rendaContabilizar: {},
            dialogContabilizar: false,
        }
    },

    computed: {
        total() {
            const rendas = this.getRendas();
            var total = 0;
            if (rendas) {
                for (var i = 0; i < rendas.length; i++) {
                    total += rendas[i].valor;
                }
            }

            return total;
        },
        totalRecebido() {
            const rendas = this.getRendas();
            var total = 0;
            if (rendas) {
                for (var i = 0; i < rendas.length; i++) {
                    if (rendas[i].ja_em_conta) total += rendas[i].valor;
                }
            }
            
            return total;
        },
        totalNaoRecebido() {
            const rendas = this.getRendas();
            var total = 0;
            if (rendas) {
                for (var i = 0; i < rendas.length; i++) {
                    if (!rendas[i].ja_em_conta) total += rendas[i].valor;
                }
            }
            
            return total;
        }
    },

    methods: {
        getRendas() {
            if (this.$store.getters["Rendas/getRendas"]) {
                return this.orderBy(
                    this.$store.getters["Rendas/getRendas"]
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

        contabilizarRenda(renda) {
            this.rendaContabilizar = renda;
            this.dialogContabilizar = true;
        },

        fecharContabilizar() {
            this.rendaContabilizar = {},
            this.dialogContabilizar = false;
        },

        contabilizar() {
            const data = {
                instance: this.$root,
                data: {
                    renda_id: this.rendaContabilizar.id
                }
            };

            this.$store.dispatch("Rendas/contabilizarRenda", data).then(
                response => {
                    this.fecharContabilizar();
                },
                error => {
                    this.$store.dispatch("Global/setSnackbar", {text: error, color: 'error'});
                }
            );
        },

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