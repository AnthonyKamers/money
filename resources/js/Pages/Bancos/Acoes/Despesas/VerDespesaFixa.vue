<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <div v-if="despesa_fixa">
            <h1>Despesa fixa - {{ despesa_fixa.descricao }}</h1>

            <h3>Detalhes despesa fixa</h3>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th></th>
                            <th class="text-left">Categoria</th>
                            <th class="text-left">Descrição</th>
                            <th class="text-left">Valor</th>
                            <th class="text-left">Quantidade por mês</th>
                            <th class="text-left" v-if="despesa_fixa.dia_mes">Dia do mês da despesa fixa</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr>
                            <td><div class="square noCursor" :style="{ backgroundColor: despesa_fixa.categoria.cor }"></div></td>
                            <td>{{ despesa_fixa.categoria.nome }}</td>
                            <td>{{ despesa_fixa.descricao }}</td>
                            <td>{{ convertBrazil(despesa_fixa.valor) }}</td>
                            <td>{{ despesa_fixa.qtd_mes }}</td>
                            <td v-if="despesa_fixa.dia_mes">{{ despesa_fixa.dia_mes }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <h3 class="mt-5">Despesas da despesa fixa</h3>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Data</th>
                            <th class="text-left">Já debitado</th>
                            <th class="text-left">Valor</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="despesa in despesas" :key="despesa.id">
                            <td>{{ despesa.data | moment('DD/MM/Y') }}</td>
                            <td>{{ booleanConvert(despesa.ja_debitado) }}</td>
                            <td>{{ convertBrazil(despesa.valor) }}</td>
                        </tr>
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colspan="2">Total</td>
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
    name: "VerDespesaFixa",

    created() {
        const data = {
            instance: this.$root,
            data: {
                despesa_fixa_id: this.$route.params.despesa_fixa_id
            }
        };

        this.$store.dispatch("Despesas/readDespesaFixa", data).then(
            response => {},
            error => {
                this.$store.dispatch("Global/setSnackbar", {text: error});
            }
        );
    },

    computed: {
        despesa_fixa() {
            return this.$store.getters["Despesas/getDataDespesaFixa"] ?
                    this.$store.getters["Despesas/getDataDespesaFixa"].despesa_fixa[0] :
                    null;
        },

        despesas() {
            return this.$store.getters["Despesas/getDataDespesaFixa"] ?
                    this.$store.getters["Despesas/getDataDespesaFixa"].despesas :
                    null;
        }
    },

    data() {
        return {
            //
        }
    },

    methods: {
        getTotal() {
            if (this.despesas) {
                var total = 0;
                for (var i = 0; i < this.despesas.length; i++)
                    total += this.despesas[i].valor;

                return total;
            } else {
                return 0;
            }
        }
    }
}
</script>

<style scoped>
tfoot {
    font-weight: bold;
}
</style>