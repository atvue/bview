import Vue from 'vue';
import App from './app';
import router from './router';
import bView from '../src/index';
// Vue.use(Router);
Vue.use( bView );
new Vue( {
    render: h => h( App ) ,
    router
} ).$mount( `#app` );
