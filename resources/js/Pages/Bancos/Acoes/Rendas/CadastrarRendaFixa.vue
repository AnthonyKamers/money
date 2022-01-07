<template>
    <Drawer
        :active="active"
        :width="500"
        :speed="0.8"
    >
        <div class="drawer">
            <v-icon
                class="floatRight"
                style="margin-top: 7px"
                @click="fecharDrawer"
            >
                mdi-close
            </v-icon>

            <h1>Cadastrar renda fixa</h1>

            <v-form ref="formRendaFixa" v-model="valid">
                <v-row>
                    <InputNumber
                        label="Quantidade vezes renda no mês?"
                        :rules="ruleRequired"
                        :value="renda_fixa.qtd_mes"
                        :min="1"
                        :max="30"
                        :stepInt="true"
                        @update="renda_fixa.qtd_mes = $event"
                    ></InputNumber>

                    <Select
                        label="Esta renda é mensal?"
                        :value="renda_fixa.mensal"
                        :items="itemsBool"
                        :disabled="renda_fixa.qtd_mes > 1"
                        @update="renda_fixa.mensal = $event"
                    ></Select>
                </v-row>

                <v-row>
                    <Select
                        label="Sempre no mesmo dia?"
                        :value="renda_fixa.sempre_dia"
                        :items="itemsBool"
                        :disabled="!renda_fixa.mensal || renda_fixa.qtd_mes > 1"
                        @update="renda_fixa.sempre_dia = $event"
                    ></Select>

                    <InputNumber
                        label="Qual dia do mês?"
                        :value="renda_fixa.dia_mes"
                        :min="1"
                        :max="31"
                        :disabled="!renda_fixa.sempre_dia || !renda_fixa.mensal || renda_fixa.qtd_mes > 1"
                        :stepInt="true"
                        @update="renda_fixa.dia_mes = $event"
                    ></InputNumber>
                </v-row>

                <v-btn
                    class="primary"
                    @click="salvar"
                >
                    Salvar
                </v-btn>
            </v-form>
        </div>
    </Drawer>
</template>

<script>
import Drawer from "../../../../Components/Drawer.vue";
import Select from "../../../../Components/Select.vue";
import InputNumber from "../../../../Components/InputNumber.vue";

export default {
    name: "CadastrarRendaFixa",

    components: {
        Drawer,
        Select,
        InputNumber
    },

    props: {
        active: {
            required: true
        },
        renda: {
            required: true
        }
    },

    data() {
        return {
            valid: false,

            renda_fixa: {
                mensal: true,
                sempre_dia: false,
                dia_mes: "",
                qtd_mes: 1
            }
        }
    },

    methods: {
        fecharDrawer() {
            this.$emit('close');
        },

        salvar() {
            this.fecharDrawer();
        }
    },

    watch: {
        renda_fixa: {
            handler(newVal, oldVal) {
                this.$store.commit("Rendas/SET_RENDA_FIXA", {...newVal});
            },
            deep: true,
            immediate: true
        },
        
        valid: {
            handler(val) {
                this.$emit("valid", val);
            },
            deep: true,
            immediate: true
        }
    }
}
</script>

<style scoped>
</style>