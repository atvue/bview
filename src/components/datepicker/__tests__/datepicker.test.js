import DatePicker from '../index.js'
import { mount } from '@vue/test-utils'

describe( `DatePicker测试套件` , () => {
    test( `创建DatePicker成功` , () => {
        const wrapper = mount( DatePicker )
        expect( wrapper.isVueInstance() ).toBeTruthy()
    } )
} )
