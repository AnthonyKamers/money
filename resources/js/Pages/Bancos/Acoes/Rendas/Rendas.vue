<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <h1>Rendas de {{ $store.getters["Bancos/getBancoNow"] != null ? $store.getters["Bancos/getBancoNow"].nome : "" }}</h1>

        <router-link to="cadastrar-renda"><v-btn class="primary">Cadastrar renda</v-btn></router-link>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-left">Data</th>
                        <th class="text-left">Categoria</th>
                        <th class="text-left">Descrição</th>
                        <th class="text-left">Valor</th>
                        <th class="text-left">Já em conta</th>
                        <th class="text-left">Ações</th>
                    </tr>
                </thead>

                <tbody>
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
export default {
    name: "Rendas",

    created() {
        this.$store.dispatch("Bancos/readBancos", this.$root).then(
            () => {
                this.banco = this.$store.getters["Bancos/getBancos"].find(el => el.id == this.$route.params.banco_id);
                this.$store.commit("Bancos/SET_BANCO_NOW", this.banco);
                this.$store.dispatch("Rendas/readRendas", this.$root);
            }
        );
    },

    data() {
        return {
            banco: "",

            rendaDelete: {},
            dialogDelete: false,
        }
    },

    methods: {
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