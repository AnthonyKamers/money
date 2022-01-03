const state = {
    bancos: null,
    apiBancos: "success"
};

const getters = {
    getBancos(state) {
        return state.bancos;
    }
};

const actions = {
    readBancos({ commit }, instance) {
        instance.axios.get(`${instance.apiUrl}/bancos/read`).then(
            response => {
                commit("SET_BANCOS", response.data);
            }
        )
    }
};

const mutations = {
    SET_BANCOS(state, value) {
        state.bancos = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};