import Icon from '../index.js' ;
import renderClose from '../../../icons/close' ;
import { mount } from '@vue/test-utils' ;

describe( `Icon测试套件` , () => {
    test( `创建Icon成功` , () => {
        const wrapper = mount( Icon , {
            propsData: {
                svg: renderClose
            }
        } ) ;
        expect( wrapper.isVueInstance() ).toBeTruthy() ;
    } ) ;
} ) ;
