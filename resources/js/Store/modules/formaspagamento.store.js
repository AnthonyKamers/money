const state = {
    formas_pagamento: null,
    apiFormaPagamento: 'success'
};

const getters = {
    getFormasPagamento(state) {
        return state.formas_pagamento;
    },

    getApi(state) {
        return state.apiFormaPagamento;
    }
};

const actions = {
    readFormasPagamento({ commit }, instance) {
        return new Promise((resolve, reject) => {
            instance.axios.get(`${instance.apiUrl}/formaspagamento/read`).then(
                response => {
                    commit("SET_FORMAS_PAGAMENTO", response.data);
                    resolve();
                },
                error => {
                    console.log(error);
                    reject(error);
                }
            );
        });
    }
};

const mutations = {
    SET_FORMAS_PAGAMENTO(state, value) {
        state.formas_pagamento = value;
    },

    SET_API(state, value) {
        state.apiFormaPagamento = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};