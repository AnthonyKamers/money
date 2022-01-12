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
                <Input
                    label="Últimos 4 dígitos do cartão"
                    :rules="ruleRequired"
                    :value="cartao.final"
                    :maxlength="4"
                    @update="cartao.final = $event"
                ></Input>
            </v-row>

            <v-row>
                <InputNumber
                    label="Vencimento da fatura"
                    :rules="ruleRequired"
                    :value="cartao.vencimento_fatura"
                    :min="1"
                    :max="31"
                    :stepInt="true"
                    @update="cartao.vencimento_fatura = $event"
                ></InputNumber>
                <InputNumber
                    label="Fechamento da fatura"
                    :rules="ruleRequired"
                    :value="cartao.fechamento_fatura"
                    :min="1"
                    :max="31"
                    :stepInt="true"
                    @update="cartao.fechamento_fatura = $event"
                ></InputNumber>
                <Input
                    label="Limite"
                    :rules="ruleRequired"
                    :value="cartao.limite"
                    @update="cartao.limite = $event"
                ></Input>
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
            this.cartao.banco_id = this.$route.params.banco_id;
        } else {
            this.edit = false;
            this.cartao = {...this.cartaoDefault};
            this.cartao.banco_id = this.$route.params.banco_id;
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
                fechamento_fatura: "",
                cor: "",
                limite: ""
            },

            cartao: {},
        }
    },

    methods: {
        cadastrar() {
            if (this.$refs.form.validate()) {
                const cartao = {...this.cartao};
                
                // parse
                cartao.mensalidade = cartao.mensalidade.replace(",", ".");
                cartao.limite = cartao.limite.replace(",", ".");
                cartao.limite = parseFloat(cartao.limite);;
                cartao.mensalidade = parseFloat(cartao.mensalidade);
                cartao.tipo = parseInt(cartao.tipo);
                cartao.final = parseInt(cartao.final);
                cartao.vencimento_fatura = parseInt(cartao.vencimento_fatura);
                cartao.banco_id = parseInt(cartao.banco_id);

                const data = {
                    instance: this.$root,
                    data: cartao
                };

                this.$store.dispatch("Cartoes/createCartao", data).then(
                    response => {
                        this.$router.go(-1);
                    },
                    error => {
                        console.log(error);
                        this.$store.dispatch("Global/setSnackbar", {text: error});
                    }
                );
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