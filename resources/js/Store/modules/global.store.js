const state = {
    snackbar: false,
    textSnackbar: "",
    colorSnackbar: ""
};

const getters = {
    getSnackbar(state) {
        return state.snackbar;
    },

    getTextSnackbar(state) {
        return state.textSnackbar;
    },

    getColorSnackbar(state) {
        return state.colorSnackbar;
    }
};

const actions = {
    setSnackbar({ commit }, {text, color}) {
        commit("SET_TEXT_SNACKBAR", text);
        if (color) (commit("SET_COLOR_SNACKBAR", color));
        commit("SET_SNACKBAR", true);


        setTimeout(() => {
            commit("SET_TEXT_SNACKBAR", "");
            commit("SET_COLOR_SNACKBAR", "");
            commit("SET_SNACKBAR", false);
        }, 5000);
    },

    disableSnackbar({ commit }) {
        commit("SET_SNACKBAR", false);
        commit("SET_TEXT_SNACKBAR", "");
        commit("SET_COLOR_SNACKBAR", "");
    }
};

const mutations = {
    SET_SNACKBAR(state, value) {
        state.snackbar = value;
    },

    SET_TEXT_SNACKBAR(state, value) {
        state.textSnackbar = value;
    },

    SET_COLOR_SNACKBAR(state, value) {
        state.colorSnackbar = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};