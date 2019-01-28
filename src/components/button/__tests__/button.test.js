import Button from '../index.js' ;
import { mount } from '@vue/test-utils' ;

describe( `Button测试套件` , () => {
    test( `创建Button成功` , () => {
        const wrapper = mount( Button ) ;
        expect( wrapper.isVueInstance() ).toBeTruthy() ;
    } ) ;
} ) ;
