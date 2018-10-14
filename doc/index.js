import nopvue from 'nopvue';

import Vue from 'vue';

import '@/style.less';

Vue.use(nopvue);

// @NOTE 可以改成监听src/components文件变更自动引入
// 或使用命令
import DocButton from '@/components/button/readme.md';

const app = new Vue({
    components: { DocButton },
    render: h => {
        return h('DocButton');
    }
}).$mount('#app');
