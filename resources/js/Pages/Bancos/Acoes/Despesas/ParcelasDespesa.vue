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

            <h1>Parcelas</h1>

            <v-form ref="formParcelas" v-model="valid">
                <v-row>
                    <InputNumber
                        label="Quantidade de parcelas"
                        :rules="ruleRequired"
                        :min="2"
                        :max="999"
                        :stepInt="true"
                        :value="qtd_parcelas"
                        @update="qtd_parcelas = $event"
                    ></InputNumber>
                    
                    <v-col :cols="1">
                        <v-icon class="fixIcons" @click="addParcela">mdi-plus-circle</v-icon>
                    </v-col>
                </v-row>

                <div v-for="(parcela, index) in parcelas" :key="index">
                    <h4>Parcela {{ index+1 }}</h4>
                    <v-row>
                        <Input
                            label="Valor"
                            :rules="ruleRequired"
                            :value="parcela.valor"
                            @update="parcela.valor = $event"
                        ></Input>

                        <InputDate
                            v-if="forma_pagamento_id != 5"
                            label="Data"
                            :rules="ruleRequired"
                            :value="parcela.data"
                            @update="parcela.data = $event"
                        ></InputDate>

                        <Select
                            v-if="forma_pagamento_id != 5"
                            label="Já em conta"
                            :rules="ruleRequired"
                            :items="itemsBool"
                            :value="parcela.ja_debitado"
                            @update="parcela.ja_debitado = $event"
                        ></Select>

                        <v-col :cols="1">
                            <v-icon
                                class="fixIcons"
                                :disabled="index < 2"
                                @click="removeParcela(index)"
                            >
                                mdi-delete
                            </v-icon>
                        </v-col>
                    </v-row>
                </div>
                
                <v-btn class="primary" @click="salvar">
                    Salvar
                </v-btn>
            </v-form>
        </div>
    </Drawer>
</template>

<script>
import Drawer from "../../../../Components/Drawer.vue";
import InputNumber from "../../../../Components/InputNumber.vue";
import Input from "../../../../Components/Input.vue";
import InputDate from "../../../../Components/InputDate.vue";
import Select from "../../../../Components/Select.vue";

export default {
    name: "ParcelasDespesa",

    components: {
        Drawer,
        InputNumber,
        Input,
        InputDate,
        Select
    },

    mounted() {
        this.createParcelas();
    },

    props: {
        active: {
            required: true
        },

        valor_total: {
            required: true
        },

        forma_pagamento_id: {
            required: true
        }
    },

    data() {
        return {
            valid: false,
            parcelas: [],
            qtd_parcelas: 2
        }
    },

    methods: {
        fecharDrawer() {
            this.$emit('close');
        },
        
        createParcelas() {
            this.parcelas = [];

            for (var i = 0; i < this.qtd_parcelas; i++) {
                this.parcelas.push({
                    valor: "",
                    data: "",
                    ja_debitado: false
                });
            }
        },

        addParcela() {
            this.parcelas.push({
                valor: "",
                data: "",
                ja_debitado: false
            });

            this.qtd_parcelas += 1;
        },

        removeParcela(index) {
            this.parcelas.pop(index);
            this.qtd_parcelas -= 1;
        },

        salvar() {
            this.fecharDrawer();
        }
    },

    watch: {
        qtd_parcelas(val) {
            this.createParcelas();
        },

        parcelas: {
            handler(newVal, oldVal) {
                this.$store.commit("Despesas/SET_PARCELAS_DESPESA", this.forceCopy(newVal));
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
</script>,

<style scoped>
.fixIcons {
    margin-top: 15px;
}
</style>