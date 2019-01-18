import { mount } from '@vue/test-utils';
import Pager from '../index.js';

describe('Pager组件', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Select, {
            propsData: {
                total: 200,
                current: 1,
                b: 'bview'
            }
        });
    });
    it('渲染正确的标记', () => {
        expect(wrapper.isVueInstance()).toBeTruthy();
    });
});
