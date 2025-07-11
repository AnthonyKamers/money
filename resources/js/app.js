// require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';

import router from './Router/index';
import store from './Store/index';
import App from './App.vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import vuetify from './Plugins/vuetify';
import VueMoment from 'vue-moment';
require("./Mixins/globalMixin");

// Set Vue router
Vue.use(VueRouter);

// Set Vue axios
axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.token;
Vue.use(VueAxios, axios);

// Set vue moment
Vue.use(VueMoment);

const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    components: { App }
});
