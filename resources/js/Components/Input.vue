<template>
    <v-col>
        <v-text-field
            v-model="model"
            :label="label"
            :rules="rules"
            required
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
        rules: {
            required: false
        }
    },

    data() {
        return {
            model: ""
        }
    },

    watch: {
        model(val) {
            this.$emit("update", val);
        }
    }
};
</script>