<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <h1>Cadastrar rendas</h1>

        <v-form
            ref="form"
            v-model="valid"
            :disabled="drawerParcelas || drawerRendaFixa"
        >
            <v-row>
                <Select
                    label="Categoria"
                    :rules="ruleRequired"
                    :value="renda.categoria_id"
                    :items="
                        $store.getters['Categoriasrenda/getCategorias'] != null ?
                        sortSelect(generateSelectValues($store.getters['Categoriasrenda/getCategorias'], 'nome', 'id')) :
                        []
                    "
                    @update="renda.categoria_id = $event"
                ></Select>
                <Input
                    label="Descricao"
                    :rules="ruleRequired"
                    :value="renda.descricao"
                    @update="renda.descricao = $event"
                ></Input>
                <Input
                    label="Valor total"
                    :rules="ruleRequired"
                    :value="renda.valor"
                    @update="renda.valor = $event"
                ></Input>
            </v-row>

            <v-row>
                <InputDate
                    label="Data"
                    :rules="ruleRequired"
                    :value="renda.data"
                    @update="renda.data = $event"
                ></InputDate>
                <Select
                    label="Parcelado"
                    :value="renda.parcelado"
                    :items="itemsBool"
                    @update="renda.parcelado = $event"
                ></Select>
                <Select
                    label="Já em conta"
                    :value="renda.ja_em_conta"
                    :items="itemsBool"
                    :disabled="renda.parcelado"
                    @update="renda.ja_em_conta = $event"
                ></Select>
                <Select
                    label="Renda fixa"
                    :value="renda.renda_fixa"
                    :items="itemsBool"
                    :disabled="renda.parcelado"
                    @update="renda.renda_fixa = $event"
                ></Select>
            </v-row>

            <v-btn
                v-if="!renda.parcelado && renda.renda_fixa"
                class="secondary"
                :disabled="drawerRendaFixa"
                @click="drawerRendaFixa = true"
            >
                Renda fixa
            </v-btn>
            <v-btn
                v-if="renda.parcelado"
                class="secondary"
                :disabled="drawerParcelas"
                @click="drawerParcelas = true"
            >
                Parcelas
            </v-btn>
            <v-btn
                class="primary"
                :disabled="drawerParcelas || drawerRendaFixa"
                @click="cadastrar"
            >
                Cadastrar
            </v-btn>
        </v-form>

        <ParcelasRenda
            :active="drawerParcelas"
            :valor_total="renda.valor"
            @valid="validParcelas = $event"
            @close="drawerParcelas = false"
        ></ParcelasRenda>

        <CadastrarRendaFixa
            :active="drawerRendaFixa"
            :renda="renda"
            @valid="validRendaFixa = $event"
            @close="drawerRendaFixa = false"
        ></CadastrarRendaFixa>
    </div>
</template>

<script>
import Input from "../../../../Components/Input.vue";
import Select from "../../../../Components/Select.vue";
import InputDate from "../../../../Components/InputDate.vue";
import ParcelasRenda from "./ParcelasRenda.vue";
import CadastrarRendaFixa from "./CadastrarRendaFixa.vue";

export default {
    name: "CadastrarRenda",

    components: {
        Input,
        Select,
        InputDate,
        ParcelasRenda,
        CadastrarRendaFixa
    },

    created() {
        this.$store.dispatch("Bancos/readBancos", this.$root).then(
            () => {
                this.banco = this.$store.getters["Bancos/getBancos"].find(el => el.id == this.$route.params.banco_id);
                this.$store.commit("Bancos/SET_BANCO_NOW", this.banco);
                this.$store.dispatch("Categoriasrenda/readCategorias", this.$root);
            }
        );
    },

    mounted() {
        if (this.$route.path == "/editar-renda") {
            if (this.$store.getters["Rendas/getEditRenda"] == null) this.$router.push({ path: "/rendas" });

            this.edit = true;
            this.renda = {...this.$store.getters["Rendas/getEditRenda"]};
            this.renda.banco_id = this.$route.params.banco_id;
        } else {
            this.edit = false;
            this.renda = {...this.rendaDefault};
            this.renda.banco_id = this.$route.params.banco_id;
        }
    },

    data() {
        return {
            edit: false,
            valid: false,

            rendaDefault: {
                categoria_id: "",
                descricao: "",
                valor: "",
                data: "",
                ja_em_conta: false,
                parcelado: false,
                renda_fixa: false
            },

            renda: {},

            drawerParcelas: false,
            validParcelas: false,

            drawerRendaFixa: false,
            validRendaFixa: false
        }
    },

    methods: {
        cadastrar() {
            if (this.$refs.form.validate()) {
                if (this.renda.parcelado && !this.validParcelas) {
                    this.$store.dispatch("Global/setSnackbar", {text: "Campos em parcelas não estão completos", color: 'error'});
                    this.drawerParcelas = true;
                    return;
                }

                if (this.renda.renda_fixa && !this.validRendaFixa) {
                    this.$store.dispatch("Global/setSnackbar", {text: "Campos em renda fixa não estão completos", color: 'error'});
                    this.drawerRendaFixa = true;
                    return;
                }

                const renda = {...this.renda};
                renda.valor = parseFloat(renda.valor.replace(",", "."));

                const data = {
                    instance: this.$root,
                    data: renda
                };

                // cadastrar depois de todas as verificações
                this.$store.dispatch("Rendas/createRenda", data).then(
                    response => {
                        this.$store.dispatch("Rendas/resetState");
                        this.$router.go(-1);
                    },
                    error => {
                        this.$store.dispatch("Global/setSnackbar", {text: `Erro ao cadastrar renda - ${error}`, color: 'error'});
                    }
                );
            }
        }
    }
}
</script>

<style scoped>
</style>