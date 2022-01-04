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
    readCartoes({ commit }, instance) {
        return new Promise((resolve, reject) => {
            instance.axios.get(`${instance.apiUrl}/cartoes/read`).then(
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