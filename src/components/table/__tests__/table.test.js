import Table from '../index.js'
import { mount } from '@vue/test-utils'

describe( `Table` , () => {
    test( `创建Table成功` , () => {
        const wrapper = mount( Table )
        expect( wrapper.isVueInstance() ).toBeTruthy()
    } )
} )
