const state = {
    categorias: null,
    apiCategorias: "success",
    editCategoria: null
};

const getters = {
    getCategorias(state) {
        return state.categorias;
    },

    getApi(state) {
        return state.apiCategorias;
    },

    getEditCategoria(state) {
        return state.editCategoria;
    },
};

const actions = {
    readCategorias({ commit, state, rootGetters }, instance) {
        return new Promise((resolve, reject) => {
            instance.axios.get(`${instance.apiUrl}/rendas/categoria/read`, {
                params: {
                    banco_id: parseInt(rootGetters["Bancos/getBancoNow"].id)
                }
            }).then(
                response => {
                    commit("SET_CATEGORIAS", response.data);
                    resolve();
                },
                error => {
                    console.log(error);
                    reject();
                }
            )
        });
    },

    createCategoria({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            commit("SET_API", "pending");

            payload.instance.axios.post(`${payload.instance.apiUrl}/rendas/categoria/create`, payload.data).then(
                response => {
                    if (response.data == 'success') {
                        dispatch("readCategorias", payload.instance);
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

    deleteCategoria({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            commit("SET_API", "pending");

            payload.instance.axios.post(`${payload.instance.apiUrl}/rendas/categoria/delete`, payload.data).then(
                response => {
                    if (response.data == "success") {
                        dispatch("readCategorias", payload.instance);
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
    SET_API(state, value) {
        state.apiCategorias = value;
    },

    SET_CATEGORIAS(state, value) {
        state.categorias = value;
    },

    SET_EDIT_CATEGORIA(state, value) {
        state.editCategoria = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};