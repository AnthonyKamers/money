<template>
    <v-col :cols="cols">
        <v-select
            v-model="model"
            :label="label"
            :items="items"
            :selected="value"
            :rules="rules"
            :disabled="disabled"
            item-text="key"
            item-value="value"
            outlined
        ></v-select>
    </v-col>
</template>

<script>
export default {
    name: "Select",

    props: {
        label: {
            required: true
        },
        items: {
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
        disabled: {
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