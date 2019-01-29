import Dropdown from '../index.js'
import { mount } from '@vue/test-utils'

describe( `Dropdown` , () => {
    let wrapper

    beforeEach( () => {
        wrapper = mount( Dropdown , {
            sync: false ,
            propsData: {
                trigger: `click` ,
            } ,
            default: [
                `<span>Hover Me</span>` ,
                `<ul slot="overlay">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>` ,
            ] ,
        } )
    } )

    test( `click之后弹出下拉框` , done => {
        wrapper.trigger( `click` )
        setTimeout( () => {
            let overlay = document.getElementsByClassName(
                `bview-dropdown-overlay` ,
            )
            expect( overlay.length ).toBe( 1 )
            done()
        } , 1000 )
    } )
} )
