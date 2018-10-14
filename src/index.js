import { Breadcrumb, BreadcrumbItem } from './components/breadcrumb';
import Icon from './components/icon';
import { Modal, Toast } from './components/notification';
import Pager from './components/pager';
import Select, { Option } from './components/select';
import Button, { LinkButton } from './components/button';

const components = {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Icon,
    LinkButton,
    Modal,
    Option,
    Pager,
    Select
};

// @TODO 命名规范？
// 统一默认前缀
const install = function(Vue, opts = {}) {
    Object.keys(components).forEach(key => {
        // debugger;
        Vue.component(key, components[key]);
    });
    // Confirm Toast加到全局 @TODO
    const _toastInstance = new Toast();
    Vue.toast = Vue.prototype.$toast = _toastInstance;
};

export {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Icon,
    LinkButton,
    Modal,
    Option,
    Pager,
    Toast,
    Select
};

export default {
    install
};
