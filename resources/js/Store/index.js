import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },

    getters: {

    },

    actions: {},

    mutations: {
        INCREMENT(state) {
            state.count++
        }
    }
});

export default store;