const state = {
    cartoes: null,
    apiCartoes: 'success',
    editCartao: null
};

const getters = {
    getCartoes(state) {
        return state.cartoes;
    },

    getApi(state) {
        return state.apiCartoes;
    },

    getEditCartao(state) {
        return state.editCartao;
    }
};

const actions = {
    readCartoes({ commit, state, rootGetters }, instance) {
        return new Promise((resolve, reject) => {
            instance.axios.get(`${instance.apiUrl}/cartoes/read`, {
                params: {
                    banco_id: parseInt(rootGetters["Bancos/getBancoNow"].id)
                }
            }).then(
                response => {
                    commit("SET_CARTOES", response.data);
                    resolve();
                },
                error => {
                    console.log(error);
                    reject();
                }
            )
        });
    },

    createCartao({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            commit("SET_API", "pending");

            payload.instance.axios.post(`${payload.instance.apiUrl}/cartoes/create`, payload.data).then(
                response => {
                    if (response.data == 'success') {
                        dispatch("readCartoes", payload.instance);
                        commit("SET_API", 'success');
                        resolve(response.data);
                    } else {
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

    deleteCartao({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            commit("SET_API", "pending");

            payload.instance.axios.post(`${payload.instance.apiUrl}/cartoes/delete`, payload.data).then(
                response => {
                    if (response.data == "success") {
                        dispatch("readCartoes", payload.instance);
                        commit("SET_API", "success");
                        resolve(response.data)
                    } else {
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
    }
};

const mutations = {
    SET_CARTOES(state, value) {
        state.cartoes = value;
    },

    SET_API(state, value) {
        state.apiCartoes = value;
    },

    SET_EDIT_CARTAO(state, value) {
        state.editCartao = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};