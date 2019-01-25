import Dropdown from '../index.js';
import { mount } from '@vue/test-utils';

describe( `Dropdown` , () => {
    test( `是一个 Vue 实例` , () => {
        const wrapper = mount( Dropdown );
        expect( wrapper.isVueInstance() ).toBeTruthy();
    } );
} );
