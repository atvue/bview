import Vue from 'vue';
import App from './app';
import router from './router';

// Vue.use(Router);

new Vue({
    render: h => h(App),
    router
}).$mount('#app');
