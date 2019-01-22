import Radio from '../index.js'
import { mount } from '@vue/test-utils'


describe( 'Radio测试套件' , () => {
    test( '创建Radio成功' , () => {
        const wrapper = mount( Radio )
        expect( wrapper.isVueInstance() ).toBeTruthy()
    } )
} )