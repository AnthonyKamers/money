const state = {
    rendas: null,
    apiRendas: "success",
    editRenda: null
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};