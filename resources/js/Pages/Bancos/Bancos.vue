<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <h1>Bancos</h1>

        <router-link to="cadastrar-banco"><v-btn class="primary">Cadastrar Bancos</v-btn></router-link>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Nome</th>
                        <th class="text-left">Agência</th>
                        <th class="text-left">Conta</th>
                        <th class="text-left">Saldo</th>
                        <th class="text-left">Ações</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(banco, id) in $store.getters['Bancos/getBancos']" :key="id">
                        <td>{{ banco.nome }}</td>
                        <td>{{ banco.agencia }}</td>
                        <td>{{ banco.conta }}</td>
                        <td>{{ banco.saldo }}</td>
                        <td>
                            <v-icon @click="editarBanco(banco)">mdi-pencil</v-icon>
                            <v-icon @click="deleteBanco(banco)">mdi-delete</v-icon>
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
                Deseja realmente deletar o banco {{ bancoDelete.nome }}?
                </v-card-title>
                <v-card-text>
                    Após deletar este banco, todas as transações efetuadas por ele, serão deletadas também!!
                    <br>
                    Tenha muito cuidado com essa ação!
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
                        :loading="$store.getters['Bancos/getApi'] == 'pending'"
                        @click="deletar"
                    >
                        Deletar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar
            v-model="snackbar"
            :color="$store.getters['Bancos/getApi']"
            >
            {{ textSnackbar }}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Fechar
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: "Bancos",

    created() {
        this.$store.dispatch("Bancos/readBancos", this.$root);
    },

    data() {
        return {
            bancoDelete: {},
            dialogDelete: false,

            snackbar: false,
            textSnackbar: ""
        }
    },

    methods: {
        editarBanco(banco) {
            this.$store.dispatch("Bancos/setEditBanco", banco);
            this.$router.push({ path: "/editar-banco" });
        },

        deleteBanco(banco) {
            this.bancoDelete = banco;
            this.dialogDelete = true;
        },

        fecharDelete() {
            this.dialogDelete = false;
            this.bancoDelete = {};
        },

        deletar() {
            const data = {
                instance: this.$root,
                data: this.bancoDelete
            };

            this.$store.dispatch("Bancos/deleteBanco", data).then(
                response => {
                    if (this.$store.getters["Banco/getApi"] === "success") {
                        this.fecharDelete();

                        this.$store.dispatch("Global/setSnackbar", {text: "Banco deletado com sucesso", color: "success"});
                    } else {
                        this.fecharDelete();

                        this.$store.dispatch("Global/setSnackbar", {text: `Banco não foi deletado. \n ${response.data}`, color: "error"});
                    }
                },
                error => {
                    this.$store.dispatch("Global/setSnackbar", {text: `Banco não foi deletado. \n ${error}`, color: "error"});
                }
            );
        }
    }
}
</script>

<style scoped>
</style>