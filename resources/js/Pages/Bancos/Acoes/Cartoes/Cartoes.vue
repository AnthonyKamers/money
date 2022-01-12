<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <h1>Cartões de {{ $store.getters["Bancos/getBancoNow"] != null ? $store.getters["Bancos/getBancoNow"].nome : "" }}</h1>

        <router-link to="cadastrar-cartao"><v-btn class="primary">Cadastrar Cartão</v-btn></router-link>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-left">Nome/Final</th>
                        <th class="text-left">Tipo</th>
                        <th class="text-left">Vencimento fatura</th>
                        <th class="text-left">Fechamento fatura</th>
                        <th class="text-left">Mensalidade</th>
                        <th class="text-left">Limite</th>
                        <th class="text-left">Ações</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="cartao in $store.getters['Cartoes/getCartoes']" :key="cartao.id">
                        <td><div class="square noCursor" :style="{ backgroundColor: cartao.cor }"></div></td>
                        <td>{{ cartao.nome }}/{{ cartao.final }}</td>
                        <td>{{ cartao.tipo == 0 ? 'Débito' : 'Crédito' }}</td>
                        <td>{{ cartao.vencimento_fatura }}</td>
                        <td>{{ cartao.fechamento_fatura }}</td>
                        <td>{{ convertBrazil(cartao.mensalidade) }}</td>
                        <td>{{ convertBrazil(cartao.limite) }}</td>
                        <td>
                            <v-icon>mdi-pencil</v-icon>
                            <v-icon @click="deleteCartao(cartao)">mdi-delete</v-icon>
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
                Deseja realmente deletar o cartão {{ cartaoDelete.nome }}/{{cartaoDelete.final}}?
                </v-card-title>
                <v-card-text>
                    Após deletar este cartão, não poderá mais ser efetuada compras com ele
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
                        :loading="$store.getters['Cartoes/getApi'] == 'pending'"
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
                this.$store.dispatch("Cartoes/readCartoes", this.$root);
            }
        );
    },

    data() {
        return {
            cartaoDelete: {},
            dialogDelete: false
        }
    },

    methods: {
        deleteCartao(cartao) {
            this.cartaoDelete = cartao;
            this.dialogDelete = true;
        },

        deletar() {
            const data = {
                instance: this.$root,
                data: {
                    id: parseInt(this.cartaoDelete.id)
                }
            };

            this.$store.dispatch("Cartoes/deleteCartao", data).then(
                response => {
                    this.fecharDelete();

                    this.$store.dispatch("Global/setSnackbar", {text: "Cartão deletado com sucesso", color: "success"});
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
    },
}
</script>

<style scoped>
</style>