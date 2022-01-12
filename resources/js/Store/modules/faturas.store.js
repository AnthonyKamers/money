const state = {
    faturas: null,
    apiFaturas: 'success',

    fatura: null
};

const getters = {
    getFaturas(state) {
        return state.faturas;
    },

    getApi(state) {
        return state.apiFaturas;
    },

    getFatura(state) {
        return state.fatura;
    }
};

const actions = {

    // faturas cartoes
    readFaturas({ commit, rootGetters }, instance) {
        return new Promise((resolve, reject) => {
            commit("SET_API", 'pending');

            instance.axios.get(`${instance.apiUrl}/faturas/read`, {
                params: {
                    banco_id: parseInt(rootGetters["Bancos/getBancoNow"].id)
                }
            }).then(
                response => {
                    commit("SET_API", 'success');
                    commit('SET_FATURAS', response.data);
                    resolve();
                },
                error => {
                    commit("SET_API", 'error');
                    reject(error);
                }
            );
        });
    },

    showFatura({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit("SET_API", 'pending');

            payload.instance.axios.get(`${payload.instance.apiUrl}/faturas/show`, {
                params: {
                    fatura_id: payload.fatura_id
                }
            }).then(
                response => {
                    commit("SET_API", 'success');
                    commit('SET_FATURA', response.data);
                    resolve();
                },
                error => {
                    commit("SET_API", 'error');
                    reject(error);
                }
            );
        });
    }
};

const mutations = {
    SET_FATURAS(state, value) {
        state.faturas = value;
    },

    SET_API(state, value) {
        state.apiFaturas = value;
    },

    SET_FATURA(state, value) {
        state.fatura = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};