<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <h1>Rendas fixas de {{ $store.getters["Bancos/getBancoNow"] != null ? $store.getters["Bancos/getBancoNow"].nome : "" }}</h1>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th></th>
                        <th class="text-left">Categoria</th>
                        <th class="text-left">Descrição</th>
                        <th class="text-left">Quantidade por mês</th>
                        <th class="text-left">Dia mês</th>
                        <th class="text-left">Valor</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr v-for="renda_fixa in $store.getters['Rendas/getRendasFixas']" :key="renda_fixa.id">
                        <td><div class="square noCursor" :style="{ backgroundColor: renda_fixa.categoria.cor }"></div></td>
                        <td>{{ renda_fixa.categoria.nome }}</td>
                        <td>{{ renda_fixa.descricaco }}</td>
                        <td>{{ renda_fixa.qtd_mes }}</td>
                        <td>{{ renda_fixa.dia_mes }}</td>
                        <td>{{ convertBrazil(renda_fixa.valor) }}</td>
                    </tr>
                </tbody>

                <tfoot>
                    <tr class="bolder">
                        <td colspan="5">Total por mês</td>
                        <td>{{ convertBrazil(total) }}</td>
                    </tr>
                </tfoot>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
export default {
    name: "RendasFixas",

    created() {
        this.$store.dispatch("Bancos/readBancos", this.$root).then(
            () => {
                this.banco = this.$store.getters["Bancos/getBancos"].find(el => el.id == this.$route.params.banco_id);
                this.$store.commit("Bancos/SET_BANCO_NOW", this.banco);
                this.$store.dispatch("Rendas/readRendasFixasAll", this.$root);
            }
        );
    },

    computed: {
        total() {
            const rendas_fixas = this.$store.getters["Rendas/getRendasFixas"];
            var total = 0;

            if (rendas_fixas != null) {
                for (var i = 0; i < rendas_fixas.length; i++) {
                    total += rendas_fixas[i].qtd_mes * rendas_fixas[i].valor;
                }
            }

            return total;
        }
    }
}
</script>

<style scoped>
</style>