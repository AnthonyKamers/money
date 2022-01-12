const state = {
    rendas: null,
    apiRendas: "success",
    editRenda: null,

    renda_fixa: null,
    parcelas_renda: null,
    dataRendaFixa: null,

    rendas_fixas: null
};

const getters = {
    getRendas(state) {
        return state.rendas;
    },

    getApi(state) {
        return state.apiRendas;
    },

    getEditRenda(state) {
        return state.editRenda;
    },

    getRendaFixa(state) {
        return state.renda_fixa;
    },
    
    getParcelasRenda(state) {
        return state.parcelas_renda;
    },

    getDataRendaFixa(state) {
        return state.dataRendaFixa;
    },

    getRendasFixas(state) {
        return state.rendas_fixas;
    }
};

const actions = {
    readRendas({ commit, state, rootGetters }, instance) {
        return new Promise((resolve, reject) => {
            instance.axios.get(`${instance.apiUrl}/rendas/read`, {
                params: {
                    banco_id: parseInt(rootGetters["Bancos/getBancoNow"].id)
                }
            }).then(
                response => {
                    commit("SET_RENDAS", response.data);
                    resolve();
                },
                error => {
                    console.log(error);
                    reject();
                }
            )
        });
    },

    createRenda({ state, commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            commit("SET_API", 'pending');

            const data = {
                renda: payload.data,
                parcelas: state.parcelas_renda,
                renda_fixa: state.renda_fixa
            };

            payload.instance.axios.post(`${payload.instance.apiUrl}/rendas/create`, data).then(
                response => {
                    if (response.data == 'success') {
                        dispatch("readRendas", payload.instance);
                        commit("SET_API", "success");
                        resolve()
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
            )
        });
    },

    // contabilizar renda
    contabilizarRenda({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            commit("SET_API", 'pending');

            payload.instance.axios.post(`${payload.instance.apiUrl}/rendas/contabilizar`, payload.data).then(
                response => {
                    if (response.data == "success") {
                        dispatch("readRendas", payload.instance);
                        commit("SET_API", 'success');
                        resolve();
                    } else {
                        commit('SET_API', 'error');
                        reject(response.data);
                    }
                },
                error => {
                    commit('SET_API', 'error');
                    reject(error);
                }
            );
        });
    },

    resetState({ commit }) {
        commit("SET_EDIT_RENDA", null);
        commit("SET_RENDA_FIXA", null);
        commit("SET_PARCELAS_RENDA", null);
    },

    // parcelas
    readParcelas({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit("SET_API", 'pending');

            payload.instance.axios.get(`${payload.instance.apiUrl}/rendas/parcelas/read`, {
                params: {
                    renda_id: payload.renda_id
                }
            }).then(
                response => {
                    commit("SET_API", 'success');
                    commit("SET_PARCELAS_RENDA", response.data);
                    resolve();
                },
                error => {
                    commit("SET_API", 'error');
                    reject(error);
                }
            );
        });
    },

    // renda fixa
    readRendaFixa({ commit }, payload) {
        return new Promise((resolve, reject) => {
            commit("SET_API", 'pending');

            payload.instance.axios.get(`${payload.instance.apiUrl}/renda-fixa/read`, {
                params: payload.data
            }).then(
                response => {
                    commit("SET_API", 'success');
                    commit("SET_DATA_RENDA_FIXA", response.data);
                    resolve();
                },
                error => {
                    commit("SET_API", 'error');
                    reject(error);
                }
            );
        });
    },

    // read rendas fixas all
    readRendasFixasAll({ commit, rootGetters }, instance) {
        return new Promise((resolve, reject) => {
            commit("SET_API", 'pending');

            instance.axios.get(`${instance.apiUrl}/renda-fixa/all`, {
                params: {
                    banco_id: parseInt(rootGetters["Bancos/getBancoNow"].id)
                }
            }).then(
                response => {
                    commit("SET_API", 'success');
                    commit('SET_RENDAS_FIXAS', response.data);
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
    SET_API(state, value) {
        state.apiRendas = value;
    },

    SET_RENDAS(state, value) {
        state.rendas = value;
    },

    SET_EDIT_RENDA(state, value) {
        state.editRenda = value;
    },

    SET_RENDA_FIXA(state, value) {
        state.renda_fixa = value;
    },

    SET_PARCELAS_RENDA(state, value) {
        state.parcelas_renda = value;
    },

    SET_DATA_RENDA_FIXA(state, value) {
        state.dataRendaFixa = value;
    },

    SET_RENDAS_FIXAS(state, value) {
        state.rendas_fixas = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};