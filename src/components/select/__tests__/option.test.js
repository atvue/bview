import { mount } from '@vue/test-utils';
import Select from '../index.js';
import OptionVue from '../option.vue';
const { Option } = Select;

describe( `Option组件` , () => {
    let wrapper;
    beforeEach( () => {
        wrapper = mount( Option , {
            propsData: {
                value: `university`
            } ,
            slots: {
                default: [ `大学` ]
            }
        } );
    } );
    it( `Select组件正确导出Option组件` , () => {
        expect( Option ).toBe( OptionVue );
    } );

    it( `渲染出大学文本` , () => {
        let html = wrapper.html();
        expect( html ).toContain( `大学` );
    } );

    it( `单个slot，调用_getSlotTextContent的到正确文本` , () => {
        let vm = wrapper.vm ,
            label = vm._getSlotTextContent();
        expect( label ).toBe( `大学` );
    } );

    it( `多个slot，调用_getSlotTextContent的到正确文本，用户配置的空格保留` , () => {
        let wrapper = mount( Option , {
                propsData: {
                    value: `university`
                } ,
                slots: {
                    default: [
                        `  大学  ` ,
                        `<span class="full-time">  -全日制</span>` ,
                        `-非全日制    `
                    ]
                }
            } ) ,
            txt = wrapper.vm._getSlotTextContent();
        expect( txt ).toBe( `  大学    -全日制-非全日制    ` );
    } );

    it( `设置禁用状态` , () => {
        wrapper = mount( Option , {
            propsData: { disabled: true , value: `university` }
        } );
        let disabledVm = wrapper.find( `.bview-option-disabled` );
        expect( disabledVm.isVueInstance() ).toBeTruthy();
    } );
} );
