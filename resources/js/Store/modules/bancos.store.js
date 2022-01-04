const state = {
    bancos: null,
    apiBanco: "success",
    editBanco: null
};

const getters = {
    getBancos(state) {
        return state.bancos;
    },

    getApi(state) {
        return state.apiBanco;
    },

    getEditBanco(state) {
        return state.editBanco;
    }
};

const actions = {
    readBancos({ commit }, instance) {
        return new Promise((resolve, reject) => {
            instance.axios.get(`${instance.apiUrl}/bancos/read`).then(
                response => {
                    commit("SET_BANCOS", response.data);
                    resolve();
                },
                error => {
                    console.log(error);
                    reject();
                }
            )
        });
    },

    createBanco({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            commit("SET_API", "pending");

            payload.instance.axios.post(`${payload.instance.apiUrl}/bancos/create`, payload.data).then(
                response => {
                    if (response.data == "success") {
                        dispatch("readBancos", payload.instance);
                        commit("SET_API", "success");
                        resolve(response.data);
                    } else {
                        commit("SET_API", "error");
                        reject(response.data);
                    }
                },
                error => {
                    commit("SET_API", "error");
                    reject(error);
                }
            )
        })
    },

    setEditBanco({ commit }, banco) {
        commit("SET_EDIT_BANCO", banco);
    },

    editBanco({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            commit("SET_API", "pending");

            payload.instance.axios.post(`${payload.instance.apiUrl}/bancos/update`, payload.data).then(
                response => {
                    if (response.data == "success") {
                        dispatch("readBancos", payload.instance);
                        commit("SET_API", "success");
                        commit("SET_EDIT_BANCO", null)
                        resolve(response.data);
                    } else {
                        commit("SET_API", "error");
                        reject(response.data);
                    }
                },
                error => {
                    commit("SET_API", "error");
                    reject(error);
                }
            )
        })
    },

    deleteBanco({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            commit("SET_API", "pending");

            payload.instance.axios.post(`${payload.instance.apiUrl}/bancos/delete`, payload.data).then(
                response => {
                    if (response.data == "success") {
                        dispatch("readBancos", payload.instance);
                        commit("SET_API", "success");
                        resolve(response.data);
                    } else {
                        commit("SET_API", "error")
                        reject(response.data);
                    }
                },
                error => {
                    commit("SET_API", "error");
                    reject(error);
                }
            )
        })
    }
};

const mutations = {
    SET_BANCOS(state, value) {
        state.bancos = value;
    },

    SET_API(state, value) {
        state.apiBanco = value;
    },

    SET_EDIT_BANCO(state, value) {
        state.editBanco = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};