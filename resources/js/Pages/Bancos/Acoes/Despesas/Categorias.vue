<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <h1>Categorias de despesa de  {{ $store.getters["Bancos/getBancoNow"] != null ? $store.getters["Bancos/getBancoNow"].nome : "" }}</h1>

        <router-link to="cadastrar-categoria"><v-btn class="primary">Cadastrar categoria</v-btn></router-link>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-left">Nome</th>
                        <th class="text-left">Porcentagem destinada (controle)</th>
                        <th class="text-left">Ações</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="categoria in $store.getters['Categoriasdespesa/getCategorias']" :key="categoria.id">
                        <td><div class="square noCursor" :style="{ backgroundColor: categoria.cor }"></div></td>
                        <td>{{ categoria.nome }}</td>
                        <td>{{ categoria.porcent }}</td>
                        <td>
                            <v-icon>mdi-pencil</v-icon>
                            <v-icon @click="deleteCategoria(categoria)">mdi-delete</v-icon>
                        </td>
                    </tr>
                </tbody>

                <tfoot>
                    <tr class="bolder">
                        <td colspan="2">Total</td>
                        <td>{{ totalPorcent }}</td>
                    </tr>
                </tfoot>
            </template>
        </v-simple-table>

        <v-dialog
            v-model="dialogDelete"
            persistent
            max-width="550"
            >
            <v-card>
                <v-card-title class="text-h5">
                Deseja realmente deletar a categoria {{ categoriaDelete.nome }}?
                </v-card-title>
                <v-card-text>
                    Após deletar esta categoria, não poderá mais ser editado!
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
                        :loading="$store.getters['Categoriasdespesa/getApi'] == 'pending'"
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
export default {
    name: "Cartoes",

    created() {
        this.$store.dispatch("Bancos/readBancos", this.$root).then(
            () => {
                const banco = this.$store.getters["Bancos/getBancos"].find(el => el.id == this.$route.params.banco_id);
                this.$store.commit("Bancos/SET_BANCO_NOW", banco);
                this.$store.dispatch("Categoriasdespesa/readCategorias", this.$root);
            }
        );
    },

    computed: {
        totalPorcent() {
            const categorias = this.$store.getters['Categoriasdespesa/getCategorias'];
            var total = 0;

            if (categorias) {
                for (var i = 0; i < categorias.length; i++) {
                    total += categorias[i].porcent;
                }
            }

            return total;
        }
    },

    data() {
        return {
            categoriaDelete: {},
            dialogDelete: false
        }
    },

    methods: {
        deleteCategoria(categoria) {
            this.categoriaDelete = categoria;
            this.dialogDelete = true;
        },

        deletar() {
            const data = {
                instance: this.$root,
                data: {
                    id: parseInt(this.categoriaDelete.id)
                }
            };

            this.$store.dispatch("Categoriasdespesa/deleteCategoria", data).then(
                response => {
                    this.fecharDelete();

                    this.$store.dispatch("Global/setSnackbar", {text: "Categoria deletada com sucesso", color: "success"});
                },
                error => {
                    this.$store.dispatch("Global/setSnackbar", {text: error, color: "error"});
                }
            );
        },

        fecharDelete() {
            this.categoriaDelete = {};
            this.dialogDelete = false;
        }
    },
}
</script>

<style scoped>
</style>