<template>
    <v-col :cols="cols">
        <v-text-field
            v-model="model"
            :label="label"
            :maxlength="maxlength"
            :rules="rules"
            :dense="dense"
            :clearable="clearable"
            outlined
        ></v-text-field>
    </v-col>
</template>

<script>
export default {
    name: "Input",

    props: {
        label: {
            required: true
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
        maxlength: {
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