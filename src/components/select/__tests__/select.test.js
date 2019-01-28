import { mount } from '@vue/test-utils' ;
import Select from '../index.js' ;

describe( `Select组件` , () => {
    let wrapper ;

    beforeEach( () => {
        wrapper = mount( Select , {
            default: [
                `<Option value="primary">小学</Option>` ,
                `<Option value="junior">初中</Option>`
            ]
        } ) ;
    } ) ;

    it( `渲染正确的标记` , () => {
        expect( wrapper.isVueInstance() ).toBeTruthy() ;
    } ) ;

    it( `默认展示placeholder` , () => {
        expect( wrapper.find( `.bview-select-placeholder` ) ).toBeTruthy() ;
    } ) ;
} ) ;
