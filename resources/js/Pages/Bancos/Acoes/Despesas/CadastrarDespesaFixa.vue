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

            <h1>Cadastrar despesa fixa</h1>

            <v-form ref="form" v-model="valid">
                <v-row>
                    <InputNumber
                        label="Quantidade vezes despesa no mês?"
                        :rules="ruleRequired"
                        :value="despesa_fixa.qtd_mes"
                        :min="1"
                        :max="30"
                        :stepInt="true"
                        @update="despesa_fixa.qtd_mes = $event"
                    ></InputNumber>

                    <Select
                        label="Esta despesa é mensal?"
                        :value="despesa_fixa.mensal"
                        :items="itemsBool"
                        :disabled="despesa_fixa.qtd_mes > 1"
                        @update="despesa_fixa.mensal = $event"
                    ></Select>
                </v-row>

                <v-row>
                    <Select
                        label="Sempre no mesmo dia?"
                        :value="despesa_fixa.sempre_dia"
                        :items="itemsBool"
                        :disabled="!despesa_fixa.mensal || despesa_fixa.qtd_mes > 1"
                        @update="despesa_fixa.sempre_dia = $event"
                    ></Select>

                    <InputNumber
                        label="Qual dia do mês?"
                        :value="despesa_fixa.dia_mes"
                        :min="1"
                        :max="31"
                        :disabled="!despesa_fixa.sempre_dia || !despesa_fixa.mensal || despesa_fixa.qtd_mes > 1"
                        :stepInt="true"
                        @update="despesa_fixa.dia_mes = $event"
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
    name: "CadastrarDespesaFixa",

    components: {
        Drawer,
        Select,
        InputNumber
    },

    props: {
        active: {
            required: true
        },
        despesa: {
            required: true
        }
    },

    data() {
        return {
            valid: false,

            despesa_fixa: {
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
        despesa_fixa: {
            handler(newVal, oldVal) {
                this.$store.commit("Despesas/SET_DESPESA_FIXA", {...newVal});
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