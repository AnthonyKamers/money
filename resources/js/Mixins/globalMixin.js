import Vue from 'vue';

Vue.mixin({
    data() {
        return {
            ruleRequired: [v => !!v || 'Necessário preenchimento']
        }
    }
});