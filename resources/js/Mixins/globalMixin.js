import Vue from 'vue';

Vue.mixin({
    data() {
        return {
            ruleRequired: [v => !!v || 'Necessário preenchimento'],
            apiUrl: "http://money.local:8000/api",
            colors: [
                "#F44336", "#E91E63", "#9C27B0", "#2196F3", "#00BCD4", "#4CAF50", "#FFC107", "#FF9800", "#795548", "#607D8B", "#9E9E9E", "#000000", "#FFFFFF"
            ]
        }
    }
});