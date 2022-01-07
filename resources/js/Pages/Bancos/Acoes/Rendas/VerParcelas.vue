<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <div v-if="renda">
            <h1>Parcelas da renda {{ renda.descricao }}</h1>

            <h3>Detalhes da renda</h3>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th></th>
                            <th class="text-left">Data</th>
                            <th class="text-left">Categoria</th>
                            <th class="text-left">Descrição</th>
                            <th class="text-left">Valor</th>
                            <th class="text-left">Já em conta</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td><div class="square" :style="{ backgroundColor: renda.categoria.cor }"></div></td>
                            <td>{{ renda.data | moment("DD/MM/Y") }}</td>
                            <td>{{ renda.categoria.nome }}</td>
                            <td>{{ renda.descricao }}</td>
                            <td>{{ convertBrazil(renda.valor) }}</td>
                            <td>{{ booleanConvert(renda.ja_em_conta) }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <h3 class="mt-5">Parcelas</h3>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Parcela</th>
                            <th class="text-left">Valor</th>
                            <th class="text-left">Data</th>
                            <th class="text-left">Já em conta</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="parcela in renda.parcelas_all" :key="parcela.id">
                            <td>{{ parcela.parcela }} x {{ renda.parcelas }}</td>
                            <td>{{ convertBrazil(parcela.valor) }}</td>
                            <td>{{ parcela.data | moment("DD/MM/Y") }}</td>
                            <td>{{ booleanConvert(parcela.ja_em_conta) }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "VerParcelasRenda",

    created() {
        const data = {
            instance: this.$root,
            renda_id: this.$route.params.renda_id
        };

        this.$store.dispatch("Rendas/readParcelas", data).then(
            response => {},
            error => {
                this.$store.dispatch("Global/setSnackbar", {text: error});
            }
        );
    },

    computed: {
        renda() {
            return this.$store.getters['Rendas/getParcelasRenda'] != null ? this.$store.getters['Rendas/getParcelasRenda'][0] : false;
        }
    },

    data() {
        return {
            //
        }
    }
}
</script>

<style scoped>
</style>