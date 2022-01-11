import Vue from 'vue';

Vue.mixin({
    data() {
        return {
            ruleRequired: [v => !!v || 'Necessário preenchimento'],
            apiUrl: "http://money.local:8000/api",
            colors: [
                "#F44336", "#E91E63", "#9C27B0", "#2196F3", "#00BCD4", "#4CAF50", "#FFC107", "#FF9800", "#795548", "#607D8B", "#9E9E9E", "#000000", "#FFFFFF"
            ],

            itemsBool: [
                {key: "Sim", value: true},
                {key: "Não", value: false}
            ],
        }
    },

    methods: {
        convertBrazil(valor) {
            return valor.toLocaleString('pt-br', { minimumFractionDigits: 2 });
        },

        generateSelectValues(array, key, value, key1=false) {
            return array.map(obj => {
                return {
                    key: `${obj[key]}${key1 ? `/${obj[key1]}` : ""}`,
                    value: obj[value]
                };
            });
        },

        sortSelect(array) {
            return array.sort((a, b) => {
                const nameA = a.key;
                const nameB = b.key;
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
        },

        forceCopy(arg) {
            return JSON.parse(JSON.stringify(arg));
        },

        booleanConvert(bool) {
            return bool ? "Sim" : "Não";
        }
    }
});