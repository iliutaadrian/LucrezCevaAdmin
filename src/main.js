import Vue from 'vue'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App'
import router from './router';

import Vuex from 'vuex'
import StoreData from './store';

import {initialize} from "./components/helpers/general";

import PaginationComponent from './components/page/PaginationCustom';
import SpinnerComponent from './components/page/SpinnerLoading';
import SearchComponent from './components/page/SearchComponent';

window.axios = require('axios');

Vue.component('pagination', PaginationComponent);
Vue.component('spinner', SpinnerComponent);
Vue.component('search', SearchComponent);


import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(VueChartkick, {adapte:Chart});

Vue.use(Vuex);
const store = new Vuex.Store(StoreData);

initialize(store, router);

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});