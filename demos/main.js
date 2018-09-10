import nopvue from 'nopvue';

import Vue from 'vue';
import App from './app';

import '../dist/styles/nopvue.css';

Vue.use(nopvue);

const app = new Vue({
    render: h => h(App)
}).$mount('#app');
