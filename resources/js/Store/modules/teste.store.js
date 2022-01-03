const state = {
    count: 0
};

const getters = {};

const actions = {};

const mutations = {
    INCREMENT(state) {
        state.count++
    }
};

// $store.state.Teste.count
// $store.commit('Teste/INCREMENT')

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
