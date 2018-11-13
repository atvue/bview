import { mount } from '@vue/test-utils'
import Select from '../index.js'

describe( 'option组件测试' , () => {
    it( '渲染正确的标记' , () => {
        const wrapper = mount( Select )
        expect( wrapper.isVueInstance() ).toBeTruthy()
    } )

    it( '渲染正确的数据' , () => {
        expect( typeof Select.data ).toBe('function')
        const defaultData = Select.data()
        expect(defaultData.message).toBe('hello!')
    } )

} )