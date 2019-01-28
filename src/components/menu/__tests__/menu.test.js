import Menu from '../index.js' ;
import { mount } from '@vue/test-utils' ;

describe( `Menu测试套件` , () => {
    test( `创建Menu成功` , () => {
        const wrapper = mount( Menu ) ;
        expect( wrapper.isVueInstance() ).toBeTruthy() ;
    } ) ;
} ) ;
