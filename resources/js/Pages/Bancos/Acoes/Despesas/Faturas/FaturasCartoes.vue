<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <h1>Faturas de cartões de crédito de {{ $store.getters["Bancos/getBancoNow"] != null ? $store.getters["Bancos/getBancoNow"].nome : "" }}</h1>

        <hr>
        <div v-for="cartao in $store.getters['Faturas/getFaturas']" :key="cartao.id">
            <v-row class="mt-3 ml-1">
                <div class="square noCursor mr-3" :style="{ backgroundColor: cartao.cor }"></div>
                <h3>{{ cartao.nome }} / {{ cartao.final }}</h3>
            </v-row>

            <h4 class="mt-3">Faturas</h4>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Fatura</th>
                            <th class="text-left">Vencimento</th>
                            <th class="text-left">Já debitado</th>
                            <th class="text-left">Total</th>
                            <th class="text-left">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="fatura in cartao.faturas" :key="fatura.id">
                            <td>{{ fatura.mes_fatura }}/{{ fatura.ano_fatura }}</td>
                            <td>{{ fatura.data_vencimento | moment("DD/MM/Y") }}</td>
                            <td>{{ booleanConvert(fatura.ja_debitado) }}</td>
                            <td>{{ convertBrazil(getTotalFatura(fatura)) }}</td>
                            <td>
                                <v-icon @click="$router.push({ path: `faturas-cartoes/${fatura.id}` })">mdi-eye</v-icon>
                            </td>
                        </tr>
                    </tbody>
                    
                    <tfoot>
                        <tr class="bolder">
                            <td colspan="3">Total</td>
                            <td>{{ convertBrazil(getTotalCartao(cartao)) }}</td>
                        </tr>
                    </tfoot>
                </template>
            </v-simple-table>

            <hr>
        </div>
    </div>
</template>

<script>
export default {
    name: "FaturasCartoes",

    created() {
        this.$store.dispatch("Bancos/readBancos", this.$root).then(
            () => {
                const banco = this.$store.getters["Bancos/getBancos"].find(el => el.id == this.$route.params.banco_id);
                this.$store.commit("Bancos/SET_BANCO_NOW", banco);
                this.$store.dispatch("Faturas/readFaturas", this.$root);
            }
        );
    },

    methods: {
        getTotalFatura(fatura) {
            const despesas = fatura.despesas;
            var total = 0;

            for (var i = 0; i < despesas.length; i++) {
                total += despesas[i].valor_parcela;
            }

            return total;
        },

        getTotalCartao(cartao) {
            const faturas = cartao.faturas;
            var total = 0;

            for (var i = 0; i < faturas.length; i++) {
                total += this.getTotalFatura(faturas[i]);
            }

            return total;
        }
    }
}
</script>

<style scoped>
</style>