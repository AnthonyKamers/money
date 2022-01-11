<template>
    <v-col :cols="cols">
        <v-text-field
            v-model="model"
            :label="label"
            :rules="rules"
            :min="min"
            :max="max"
            :step="stepInt ? 1 : 0.1"
            :disabled="disabled"
            :dense="dense"
            :clearable="clearable"
            type="number"
            outlined
        ></v-text-field>
    </v-col>
</template>

<script>
export default {
    name: "Input",

    created() {
        this.attributeValue();
    },

    props: {
        label: {
            required: true
        },
        min: {
            required: true
        },
        max: {
            required: true
        },
        stepInt: {
            required: false
        },
        value: {
            required: false
        },
        rules: {
            required: false
        },
        cols: {
            required: false
        },
        disabled: {
            required: false
        },
        dense: {
            required: false
        },
        clearable: {
            required: false
        }
    },

    data() {
        return {
            model: ""
        }
    },

    methods: {
        attributeValue() {
            if (this.value !== undefined) {
                this.model = this.value;
            }
        }
    },

    watch: {
        model(val) {
            this.$emit("update", val);
        },

        value(val) {
            this.attributeValue();
        }
    }
};
</script>