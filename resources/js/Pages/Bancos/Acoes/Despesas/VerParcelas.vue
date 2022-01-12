<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <div v-if="despesa">
            <h1>Parcelas da despesa {{ despesa.descricao }}</h1>

            <h3>Detalhes da despesa</h3>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th></th>
                            <th class="text-left">Data</th>
                            <th class="text-left">Categoria</th>
                            <th class="text-left">Descrição</th>

                            <th class="text-left" v-if="despesa.cartao">Cartão</th>

                            <th class="text-left">Valor</th>
                            <th class="text-left">Já debitado</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td><div class="square" :style="{ backgroundColor: despesa.categoria.cor }"></div></td>
                            <td>{{ despesa.data | moment("DD/MM/Y") }}</td>
                            <td>{{ despesa.categoria.nome }}</td>
                            <td>{{ despesa.descricao }}</td>

                            <td v-if="despesa.cartao">
                                {{ despesa.cartao.nome }}/{{ despesa.cartao.final }}
                            </td>

                            <td>{{ convertBrazil(despesa.valor) }}</td>
                            <td>{{ booleanConvert(despesa.ja_debitado) }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <h3 class="mt-5">Parcelas</h3>

            <!-- Parcelas normais -->
            <v-simple-table v-if="despesa.parcelas_normais.length">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Parcela</th>
                            <th class="text-left">Valor</th>
                            <th class="text-left">Data</th>
                            <th class="text-left">Já debitado</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="parcela in despesa.parcelas_normais" :key="parcela.id">
                            <td>{{ parcela.parcela }} x {{ despesa.parcelas }}</td>
                            <td>{{ convertBrazil(parcela.valor) }}</td>
                            <td>{{ parcela.data | moment("DD/MM/Y") }}</td>
                            <td>{{ booleanConvert(parcela.ja_debitado) }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <!-- Parcelas de cartões -->
            <v-simple-table v-if="despesa.parcelas_cartao.length">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Parcela</th>
                            <th class="text-left">Valor</th>
                            <th class="text-left">Vencimento fatura</th>
                            <th class="text-left">Fatura já debitada</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="parcela in despesa.parcelas_cartao" :key="parcela.id">
                            <td>{{ parcela.parcela_now }} x {{ despesa.parcelas }}</td>
                            <td>{{ convertBrazil(parcela.valor_parcela) }}</td>
                            <td>{{ parcela.fatura.data_vencimento | moment("DD/MM/Y") }}</td>
                            <td>{{ booleanConvert(parcela.fatura.ja_debitado) }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "VerParcelasDespesa",

    created() {
        const data = {
            instance: this.$root,
            despesa_id: this.$route.params.despesa_id
        };

        this.$store.dispatch("Despesas/readParcelas", data).then(
            response => {},
            error => {
                this.$store.dispatch("Global/setSnackbar", {text: error});
            }
        );
    },

    computed: {
        despesa() {
            return this.$store.getters['Despesas/getParcelasDespesa'] != null ? this.$store.getters['Despesas/getParcelasDespesa'][0] : false;
        }
    }
}
</script>

<style scoped>
</style>