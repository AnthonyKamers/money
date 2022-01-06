<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <h1>{{ edit ? `Editar banco ${banco.nome}` : "Cadastrar banco" }}</h1>

        <v-form v-model="valid" ref="form">
            <v-row>
                <Input
                    label="Banco"
                    :rules="ruleRequired"
                    :value="banco.nome"
                    @update="banco.nome = $event"
                ></Input>

                <Input
                    label="Agência"
                    :value="banco.agencia"
                    @update="banco.agencia = $event"
                ></Input>
                <Input
                    label="Conta"
                    :value="banco.conta"
                    @update="banco.conta = $event"
                ></Input>
                <Input
                    label="Saldo atual"
                    :rules="ruleRequired"
                    :value="banco.saldo"
                    @update="banco.saldo = $event"
                ></Input>
            </v-row>

            <v-btn
                class="primary"
                @click="cadastrar"
                :loading="$store.getters['Bancos/getApi'] == 'pending'"
            >
                {{ edit ? `Editar` : "Cadastrar" }}
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import Input from "../../Components/Input.vue"

export default {
    name: "CadastrarBanco",

    components: {
        Input
    },

    mounted() {
        if (this.$route.path == "/editar-banco") {
            if (this.$store.getters["Bancos/getEditBanco"] == null) this.$router.push({ path: "/bancos" });

            this.edit = true;
            this.banco = {...this.$store.getters["Bancos/getEditBanco"]};
        } else {
            this.edit = false;
            this.banco = {...this.bancoDefault};
        }
    },

    data() {
        return {
            edit: false,
            valid: false,

            bancoDefault: {
                nome: "",
                agencia: "",
                conta: "",
                saldo: 0
            },

            banco: {},

            snackbar: false,
            textSnackbar: ""
        }
    },

    methods: {
        cadastrar() {
            if (this.$refs.form.validate()) {
                const banco = {...this.banco};
                banco.saldo = banco.saldo.replace(",", ".");

                var data;

                if (this.edit) {
                    const id = banco.id;
                    delete banco.id;
                    data = {
                        instance: this.$root,
                        data: {
                            banco: banco,
                            id: id
                        }
                    };
                } else {
                    data = {
                        instance: this.$root,
                        data: banco
                    };
                }

                const url = this.edit ? `Bancos/editBanco` : `Bancos/createBanco`;

                this.$store.dispatch(url, data).then(
                    response => {
                        if (this.$store.getters["Bancos/getApi"] == "success") {
                            this.$router.go(-1);

                            this.edit = false;
                        } else {
                            this.$store.dispatch("Global/setSnackbar", {text: response.data});
                        }
                    },
                    error => {
                        console.log(error);
                        this.$store.dispatch("Global/setSnackbar", {text: response.data});
                    }
                );
            }
        }
    }
}
</script>

<style scoped>
</style>