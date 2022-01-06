<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <h1>Cadastrar rendas</h1>

        <v-form
            ref="form"
            v-model="valid"
            :disabled="drawerParcelas"
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
            </v-row>

            <v-btn
                class="secondary"
                :class="{ none: !renda.parcelado }"
                :disabled="drawerParcelas"
                @click="drawerParcelas = true"
            >
                Parcelas
            </v-btn>
            <v-btn
                class="primary"
                :disabled="drawerParcelas"
                @click="cadastrar"
            >
                Cadastrar
            </v-btn>
        </v-form>

        <ParcelasRenda
            :active="drawerParcelas"
            :valor_total="renda.valor"
            @close="drawerParcelas = false"
        ></ParcelasRenda>
    </div>
</template>

<script>
import Input from "../../../../Components/Input.vue";
import Select from "../../../../Components/Select.vue";
import InputDate from "../../../../Components/InputDate.vue";
import ParcelasRenda from "./ParcelasRenda.vue";

export default {
    name: "CadastrarRenda",

    components: {
        Input,
        Select,
        InputDate,
        ParcelasRenda
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
                ja_em_conta: "",
                parcelado: false
            },

            renda: {},

            drawerParcelas: false
        }
    },

    methods: {
        cadastrar() {
            if (this.$refs.form.validate()) {
                //
            }
        }
    }
}
</script>

<style scoped>
</style>