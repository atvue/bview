import { fixOverflow , loopFindEnable } from '../keyboard'

describe( '工具函数，测试溢出' , () => {

    test( '向下溢出，应该为0' , () => {
        const index = fixOverflow( 5 , 5 )
        expect( index ).toBe( 0 )
    } )

    test( '向上溢出，应该为最后一位' , () => {
        const index = fixOverflow( 5 , -1 )
        expect( index ).toBe( 4 )
    } )

    test( '正无穷' , () => {
        const index = fixOverflow( 5 , Infinity )
        expect( index ).toBe( 0 )
    } )

    test( '负无穷' , () => {
        const index = fixOverflow( 6 , -Infinity )
        expect( index ).toBe( 5 )
    } )
} )


describe( '工具函数：loopFindEnable 测试disabe的寻址' , () => {
    let list
    
    test( '向上查找，刚好index等于disabled，则向上挪一位' , () => {
        list = [ { disabled: false } , 
            { disabled: false } , 
            { disabled: false } , 
            { disabled: true } , 
            { disabled: false } ]
        const index = loopFindEnable( list , 3 , true )
        expect( index ).toBe( 2 )
    } )

    test( '向上查找，前面的都是disable，则从末尾开始查找' , () => {
        list = [ { disabled: true } , 
            { disabled: true } , 
            { disabled: true } , 
            { disabled: true } , 
            { disabled: false } ]
        const index = loopFindEnable( list , 3 , true )
        expect( index ).toBe( 4 )
    } )

    test( '都是disable，则返回undefined' , () => {
        list = [ { disabled: true } , 
            { disabled: true } , 
            { disabled: true } , 
            { disabled: true } , 
            { disabled: true } ]
        const index = loopFindEnable( list , 3 , true )
        expect( index ).toBe( undefined )
    } )

} )
