import Search from '../index.js'
import { mount } from '@vue/test-utils'

describe( `Search测试套件` , () => {
    test( `创建Search成功` , () => {
        const wrapper = mount( Search )
        expect( wrapper.isVueInstance() ).toBeTruthy()
    } )
} )
