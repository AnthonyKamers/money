// require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';

import router from './Router/index';
import store from './Store/index';
import App from './App.vue';

import vuetify from './Plugins/vuetify';

require("./Mixins/globalMixin");
Vue.use(VueRouter);

const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    components: { App }
});
