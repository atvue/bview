import Checkbox from '../index.js'
import { mount } from '@vue/test-utils'


describe( 'Checkbox测试套件' , () => {
    test( '创建Checkbox成功' , () => {
        const wrapper = mount( Checkbox )
        expect( wrapper.isVueInstance() ).toBeTruthy()
    } )
} )