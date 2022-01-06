<template>
    <div>
        <v-icon @click="$router.go(-1)" class="floatRight">mdi-arrow-left</v-icon>

        <h1>Cadastrar categorias de rendas</h1>

        <v-form ref="form" v-model="valid">
            <v-row>
                <v-col class="center relative">
                    <p class="text">Cor</p>
                    <div class="center fixMargin">
                        <ColorPicker
                            @update="categoria.cor = $event"
                        ></ColorPicker>
                    </div>
                </v-col>
                <Input
                    label="Nome"
                    :rules="ruleRequired"
                    :value="categoria.nome"
                    @update="categoria.nome = $event"
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

export default {
    name: "CadastrarCategoriaRenda",

    components: {
        ColorPicker,
        Input,
        InputNumber
    },

    mounted() {
        if (this.$route.path == "/editar-categoria") {
            if (this.$store.getters["Categoriasrenda/getEditCategoria"] == null) this.$router.push({ path: "/categorias" });

            this.edit = true;
            this.categoria = {...this.$store.getters["Categoriasrenda/getEditCategoria"]};
            this.categoria.banco_id = this.$route.params.banco_id;
        } else {
            this.edit = false;
            this.categoria = {...this.categoriaDefault};
            this.categoria.banco_id = this.$route.params.banco_id;
        }
    },

    data() {
        return {
            edit: false,
            valid: false,

            categoriaDefault: {
                nome: "",
                cor: "",
            },

            categoria: {},
        }
    },

    methods: {
        cadastrar() {
            if (this.$refs.form.validate()) {
                const data = {
                    instance: this.$root,
                    data: this.categoria
                };

                this.$store.dispatch("Categoriasrenda/createCategoria", data).then(
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