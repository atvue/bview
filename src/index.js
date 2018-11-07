import Button from './components/button';

const components = {
    Button ,
}

// @TODO 命名规范？
// 统一默认前缀
const install = function( Vue , opts = {} ) {
    Object.keys( components ).forEach( key => {
        Vue.component( key , components[ key ] )
    } )
    // Confirm Toast加到全局 @TODO
    Vue.toast = Vue.prototype.$toast = _toastInstance;
}

export {
    Button,
}

export default {
    install
}
