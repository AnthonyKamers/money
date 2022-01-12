const state = {
    despesas: null,
    apiDespesas: 'success',
    editDespesa: null,

    parcelas_despesa: null,
    despesa_fixa: null,
    dataDespesaFixa: null,

    despesas_fixas: null
};

const getters = {
    getDespesas(state) {
        return state.despesas;
    },

    getApi(state) {
        return state.apiDespesas;
    },

    getEditDespesa(state) {
        return state.editDespesa;
    },

    getDespesasFixas(state) {
        return state.despesas_fixas;
    },

    getParcelasDespesa(state) {
        return state.parcelas_despesa;
    },

    getDespesaFixa(state) {
        return state.despesa_fixa;
    },

    getDataDespesaFixa(state) {
        return state.dataDespesaFixa;
    }
};

const actions = {
    readDespesas({ commit, rootGetters }, instance) {
        return new Promise((resolve, reject) => {
            instance.axios.get(`${instance.apiUrl}/despesas/read`, {
                params: {
                    banco_id: parseInt(rootGetters["Bancos/getBancoNow"].id)
                }
            }).then(
                response => {
                    commit("SET_DESPESAS", response.data);
                    resolve();
                },
                error => {
                    console.log(error);
                    reject(error);
                }
            );
        });
    },

    createDespesa({ state, commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            commit("SET_API", 'pending');

            const data = {
                despesa: payload.data,
                parcelas: state.parcelas_despesa,
                despesa_fixa: state.despesa_fixa
            };

            payload.instance.axios.post(`${payload.instance.apiUrl}/despesas/create`, data).then(
                response => {
                    if (response.data == "success") {
                        dispatch("readDespesas", payload.instance);
                        commit("SET_API", 'success');
                        resolve();
                    } else {
                        console.log(response.data);
                        commit("SET_API", 'error');
                        reject(response.data);
                    }
                },
                error => {
                    commit("SET_API", 'error');
                    console.log(error);
                    reject(error);
                }
            );
        });
    },

    resetState({ commit }) {
        commit("SET_EDIT_DESPESA", null);
        commit("SET_DESPESA_FIXA", null);
        commit("SET_PARCELAS_DESPESA", null);
    },

    // parcelas
    readParcelas({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit("SET_API", 'pending');

            payload.instance.axios.get(`${payload.instance.apiUrl}/despesas/parcelas/read`, {
                params: {
                    despesa_id: payload.despesa_id
                }
            }).then(
                response => {
                    commit("SET_API", 'success');
                    commit("SET_PARCELAS_DESPESA", response.data);
                    resolve();
                },
                error => {
                    commit("SET_API", 'error');
                    reject(error);
                }
            );
        });
    },

    // despesa fixa
    readDespesaFixa({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit("SET_API", 'pending');

            payload.instance.axios.get(`${payload.instance.apiUrl}/despesa-fixa/read`, {
                params: payload.data
            }).then(
                response => {
                    commit("SET_API", 'success');
                    commit("SET_DATA_DESPESA_FIXA", response.data);
                    resolve();
                },
                error => {
                    commit("SET_API", 'error');
                    reject(error);
                }
            );
        });
    },

    // read despesas fixas all
    readDespesasFixasAll({ commit, rootGetters }, instance) {
        return new Promise((resolve, reject) => {
            commit("SET_API", 'pending');

            instance.axios.get(`${instance.apiUrl}/despesa-fixa/all`, {
                params: {
                    banco_id: parseInt(rootGetters["Bancos/getBancoNow"].id)
                }
            }).then(
                response => {
                    commit("SET_API", 'success');
                    commit('SET_DESPESAS_FIXAS', response.data);
                    resolve();
                },
                error => {
                    commit("SET_API", 'error');
                    reject(error);
                }
            );
        });
    },
};

const mutations = {
    SET_DESPESAS(state, value) {
        state.despesas = value;
    },

    SET_API(state, value) {
        state.apiDespesas = value;
    },

    SET_EDIT_DESPESA(state, value) {
        state.editDespesa = value;
    },

    SET_DESPESAS_FIXAS(state, value) {
        state.despesas_fixas = value;
    },

    SET_PARCELAS_DESPESA(state, value) {
        state.parcelas_despesa = value;
    },

    SET_DESPESA_FIXA(state, value) {
        state.despesa_fixa = value;
    },

    SET_DATA_DESPESA_FIXA(state, value) {
        state.dataDespesaFixa = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};