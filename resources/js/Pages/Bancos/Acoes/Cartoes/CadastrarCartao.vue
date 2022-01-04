<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <h1>Cadastrar cartão</h1>

        <v-form ref="form" v-model="valid">
            <v-row>
                <v-col class="center relative">
                    <p class="text">Cor</p>
                    <div class="center fixMargin">
                        <ColorPicker
                            @update="cartao.cor = $event"
                        ></ColorPicker>
                    </div>
                </v-col>
                <Input
                    label="Nome"
                    :rules="ruleRequired"
                    :value="cartao.nome"
                    @update="cartao.nome = $event"
                ></Input>
                <Select
                    label="Tipo"
                    :rules="ruleRequired"
                    :value="cartao.tipo"
                    :items="[{key: 'Débito', value: 0}, {key: 'Crédito', value: 1}]"
                    @update="cartao.tipo = $event"
                ></Select>
            </v-row>

            <v-row>
                <Input
                    label="Últimos 4 dígitos do cartão"
                    :rules="ruleRequired"
                    :value="cartao.final"
                    @update="cartao.final = $event"
                ></Input>
                <InputNumber
                    label="Vencimento da fatura"
                    :rules="ruleRequired"
                    :value="cartao.vencimento_fatura"
                    :min="1"
                    :max="31"
                    :stepInt="true"
                    @update="cartao.vencimento_fatura = $event"
                ></InputNumber>
                <Input
                    label="Mensalidade"
                    :value="cartao.mensalidade"
                    @update="cartao.mensalidade = $event"
                ></Input>
            </v-row>

            <v-btn class="primary" @click="cadastrar">Cadastrar</v-btn>
        </v-form>
    </div>
</template>

<script>
import ColorPicker from "../../../../Components/ColorPicker.vue";
import Input from "../../../../Components/Input.vue";
import InputNumber from "../../../../Components/InputNumber.vue";
import Select from "../../../../Components/Select.vue";

export default {
    name: "CadastrarCartao",

    components: {
        ColorPicker,
        Input,
        InputNumber,
        Select
    },

    mounted() {
        if (this.$route.path == "/editar-cartao") {
            if (this.$store.getters["Cartoes/getEditCarato"] == null) this.$router.push({ path: "/cartoes" });

            this.edit = true;
            this.cartao = {...this.$store.getters["Cartoes/getEditCartao"]};
        } else {
            this.edit = false;
            this.cartao = {...this.cartaoDefault};
        }
    },

    data() {
        return {
            edit: false,
            valid: false,

            cartaoDefault: {
                nome: "",
                tipo: "",
                final: "",
                mensalidade: "",
                vencimento_fatura: "",
                cor: ""
            },

            cartao: {},
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
.text {
    font-size: 16px;
    font-weight: bold;
}

.fixMargin {
    position: absolute;
    left: 50%;
    margin-left: -13px;
    margin-top: -14px;
}
</style>