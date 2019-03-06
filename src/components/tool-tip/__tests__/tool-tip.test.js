import ToolTip from '../index.js'
import { mount } from '@vue/test-utils'

describe( `ToolTip` , () => {
    test( `创建ToolTip成功` , () => {
        const wrapper = mount( ToolTip )
        expect( wrapper.isVueInstance() ).toBeTruthy()
    } )
} )
