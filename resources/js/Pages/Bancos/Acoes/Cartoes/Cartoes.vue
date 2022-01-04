<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <h1>Cartões de {{ banco.nome }}</h1>

        <router-link to="cadastrar-cartao"><v-btn class="primary">Cadastrar Cartão</v-btn></router-link>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-left">Nome/Tipo</th>
                        <th class="text-left">Final cartão</th>
                        <th class="text-left">Mensalidade</th>
                        <th class="text-left">Vencimento fatura</th>
                        <th class="text-left">Ações</th>
                    </tr>
                </thead>

                <tbody>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
export default {
    name: "Cartoes",

    created() {
        this.$store.dispatch("Bancos/readBancos", this.$root).then(
            () => {
                this.banco = this.$store.getters["Bancos/getBancos"].find(el => el.id == this.$route.params.banco_id);
            }
        );
    },

    data() {
        return {
            banco: ""
        }
    }
}
</script>

<style scoped>
</style>