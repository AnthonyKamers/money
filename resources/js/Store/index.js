import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import { createStore } from "vuex-extensions";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";
const plugins = [];

if (debug) {
  plugins.push(createLogger()); // set logger only for development
}

// import the auto exporter
import modules from "./modules";

export default createStore(Vuex.Store, {
  modules: modules,
  plugins: plugins,
  strict: debug
});