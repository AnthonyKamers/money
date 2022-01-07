<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <div v-if="renda_fixa">
            <h1>Renda fixa - {{ renda_fixa.descricao }}</h1>

            <h3>Detalhes renda fixa</h3>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th></th>
                            <th class="text-left">Categoria</th>
                            <th class="text-left">Descrição</th>
                            <th class="text-left">Valor</th>
                            <th class="text-left">Quantidade por mês</th>
                            <th class="text-left" v-if="renda_fixa.dia_mes">Dia do mês da renda fixa</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr>
                            <td><div class="square" :style="{ backgroundColor: renda_fixa.categoria.cor }"></div></td>
                            <td>{{ renda_fixa.categoria.nome }}</td>
                            <td>{{ renda_fixa.descricao }}</td>
                            <td>{{ convertBrazil(renda_fixa.valor) }}</td>
                            <td>{{ renda_fixa.qtd_mes }}</td>
                            <td v-if="renda_fixa.dia_mes">{{ renda_fixa.dia_mes }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <h3 class="mt-5">Rendas da renda fixa</h3>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Data</th>
                            <th class="text-left">Já em conta</th>
                            <th class="text-left">Valor</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="renda in rendas" :key="renda.id">
                            <td>{{ renda.data | moment('DD/MM/Y') }}</td>
                            <td>{{ booleanConvert(renda.ja_em_conta) }}</td>
                            <td>{{ convertBrazil(renda.valor) }}</td>
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
    name: "VerRendaFixa",

    created() {
        const data = {
            instance: this.$root,
            data: {
                renda_fixa_id: this.$route.params.renda_fixa_id
            }
        };

        this.$store.dispatch("Rendas/readRendaFixa", data).then(
            response => {},
            error => {
                this.$store.dispatch("Global/setSnackbar", {text: error});
            }
        );
    },

    computed: {
        renda_fixa() {
            return this.$store.getters["Rendas/getDataRendaFixa"] ?
                    this.$store.getters["Rendas/getDataRendaFixa"].renda_fixa[0] :
                    null;
        },

        rendas() {
            return this.$store.getters["Rendas/getDataRendaFixa"] ?
                    this.$store.getters["Rendas/getDataRendaFixa"].rendas :
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
            if (this.rendas) {
                var total = 0;
                for (var i = 0; i < this.rendas.length; i++)
                    total += this.rendas[i].valor;

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