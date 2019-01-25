import Tag from '../index.js';
import { mount } from '@vue/test-utils';

describe( `Tag测试套件` , () => {
    test( `创建Tag成功` , () => {
        const wrapper = mount( Tag );
        expect( wrapper.isVueInstance() ).toBeTruthy();
    } );
} );
