import { mount } from '@vue/test-utils'
import Select from '../index.js'

describe( 'abc' , () => {
    it( '渲染正确的标记' , () => {
        const wrapper = mount( Select )
        expect( wrapper.isVueInstance() ).toBeTruthy()
    } )
} )