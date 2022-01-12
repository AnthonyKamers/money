<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <h1>Despesas fixas de {{ $store.getters["Bancos/getBancoNow"] != null ? $store.getters["Bancos/getBancoNow"].nome : "" }}</h1>

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
                    <tr v-for="despesa_fixa in $store.getters['Despesas/getDespesasFixas']" :key="despesa_fixa.id">
                        <td><div class="square noCursor" :style="{ backgroundColor: despesa_fixa.categoria.cor }"></div></td>
                        <td>{{ despesa_fixa.categoria.nome }}</td>
                        <td>{{ despesa_fixa.descricaco }}</td>
                        <td>{{ despesa_fixa.qtd_mes }}</td>
                        <td>{{ despesa_fixa.dia_mes }}</td>
                        <td>{{ convertBrazil(despesa_fixa.valor) }}</td>
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
    name: "DespesasFixas",

    created() {
        this.$store.dispatch("Bancos/readBancos", this.$root).then(
            () => {
                this.banco = this.$store.getters["Bancos/getBancos"].find(el => el.id == this.$route.params.banco_id);
                this.$store.commit("Bancos/SET_BANCO_NOW", this.banco);
                this.$store.dispatch("Despesas/readDespesasFixasAll", this.$root);
            }
        );
    },

    computed: {
        total() {
            const despesas_fixas = this.$store.getters["Despesas/getDespesasFixas"];
            var total = 0;

            if (despesas_fixas != null) {
                for (var i = 0; i < despesas_fixas.length; i++) {
                    total += despesas_fixas[i].qtd_mes * despesas_fixas[i].valor;
                }
            }

            return total;
        }
    }
}
</script>

<style scoped>
</style>