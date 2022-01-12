<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <div v-if="fatura">
            <h1>Fatura {{ fatura.mes_fatura }}/{{ fatura.ano_fatura }} | {{ fatura.cartao.nome }}/{{ fatura.cartao.final }}</h1>

            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Data de vencimento</th>
                            <th class="text-left">Já debitado</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>{{ fatura.data_vencimento | moment("DD/MM/Y") }}</td>
                            <td>{{ booleanConvert(fatura.ja_debitado) }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <h3 class="mt-3">Despesas</h3>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th></th>
                            <th class="text-left">Parcela</th>
                            <th class="text-left">Categoria</th>
                            <th class="text-left">Descrição</th>
                            <th class="text-left">Valor</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="despesa in fatura.despesas" :key="despesa.id">
                            <td><div class="square noCursor" :style="{ backgroundColor: despesa.despesa.categoria.cor }"></div></td>
                            <td>{{ despesa.parcela_now }} x {{ despesa.despesa.parcelas }}</td>
                            <td>{{ despesa.despesa.categoria.nome }}</td>
                            <td>{{ despesa.despesa.descricao }}</td>
                            <td>{{ convertBrazil(despesa.valor_parcela) }}</td>
                        </tr>
                    </tbody>

                    <tfoot>
                        <tr class="bolder">
                            <td colspan="4">Total</td>
                            <td>{{ convertBrazil(getTotal()) }}</td>
                        </tr>
                    </tfoot>
                </template>
            </v-simple-table>
        </div>
    </div>
</template>

<script>
export default {
    name: "VerFatura",

    created() {
        const data = {
            instance: this.$root,
            fatura_id: this.$route.params.fatura_id
        };

        this.$store.dispatch("Faturas/showFatura", data).then(
            response => {},
            error => {
                this.$store.dispatch("Global/setSnackbar", { text: error, color: 'error' });
            }
        );
    },

    computed: {
        fatura() {
            return this.$store.getters["Faturas/getFatura"] ? this.$store.getters["Faturas/getFatura"] : false
        }
    },

    methods: {
        getTotal() {
            const despesas = this.fatura.despesas;
            var total = 0;

            for (var i = 0; i < despesas.length; i++) {
                total += despesas[i].valor_parcela;
            }

            return total;
        }
    }
}
</script>

<style scoped>
</style>