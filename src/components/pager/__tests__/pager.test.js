import Pager from '../index.js'
import { mount } from '@vue/test-utils'

describe( `Pager测试套件` , () => {
    test( `创建Pager成功` , () => {
        const wrapper = mount( Pager )
        expect( wrapper.isVueInstance() ).toBeTruthy()
    } )
} )
