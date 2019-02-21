import Input from './index.js'
import { mount } from '@vue/test-utils'

describe( `Input` , () => {
    test( `创建Input成功` , () => {
        const wrapper = mount( Input )
        expect( wrapper.isVueInstance() ).toBeTruthy()
    } )
} )
