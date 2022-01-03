<template>
    <div>
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
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, id) in $store.getters['Bancos/getBancos']" :key="id">
                        <td>{{ item.nome }}</td>
                        <td>{{ item.agencia }}</td>
                        <td>{{ item.conta }}</td>
                        <td>{{ item.saldo }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
export default {
    name: "Bancos",

    created() {
        this.$store.dispatch("Bancos/readBancos", this.$root);
    },

    data() {
        return {}
    }
}
</script>

<style scoped>
</style>