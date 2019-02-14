import TimePicker from '../index.js'
import { mount } from '@vue/test-utils'

describe( `TimePicker测试套件` , () => {
    test( `创建TimePicker成功` , () => {
        const wrapper = mount( TimePicker )
        expect( wrapper.isVueInstance() ).toBeTruthy()
    } )
} )
