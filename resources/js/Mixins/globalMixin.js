import Vue from 'vue';

Vue.mixin({
    data() {
        return {
            ruleRequired: [v => !!v || 'Necessário preenchimento'],
            apiUrl: "http://money.local:8000/api"
        }
    }
});