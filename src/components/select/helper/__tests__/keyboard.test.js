import { fixOverflow , loopFindEnable } from '../keyboard';

describe( `工具函数，测试溢出` , () => {
    test( `向下溢出，应该为0` , () => {
        const index = fixOverflow( 5 , 5 );
        expect( index ).toBe( 0 );
    } );

    test( `向上溢出，应该为最后一位` , () => {
        const index = fixOverflow( 5 , -1 );
        expect( index ).toBe( 4 );
    } );

    test( `正无穷` , () => {
        const index = fixOverflow( 5 , Infinity );
        expect( index ).toBe( 0 );
    } );

    test( `负无穷` , () => {
        const index = fixOverflow( 6 , -Infinity );
        expect( index ).toBe( 5 );
    } );
} );

describe( `工具函数：loopFindEnable 测试disabe的寻址` , () => {
    let list;

    beforeEach( () => {
        list = Array( 5 )
            .fill()
            .map( () => ( { disabled: false } ) );
    } );

    test( `index=2的元素没有被禁用，则返回2` , () => {
        const index = loopFindEnable( list , 2 , true );
        expect( index ).toBe( 2 );
    } );

    test( `向上查找，刚好index等于disabled，则向上挪一位` , () => {
        list = [
            { disabled: false } ,
            { disabled: false } ,
            { disabled: false } ,
            { disabled: true } ,
            { disabled: false }
        ];
        const index = loopFindEnable( list , 3 , true );
        expect( index ).toBe( 2 );
    } );

    test( `向上查找，前面的都是disable，则从末尾开始查找` , () => {
        list = [
            { disabled: true } ,
            { disabled: true } ,
            { disabled: true } ,
            { disabled: true } ,
            { disabled: false }
        ];
        const index = loopFindEnable( list , 3 , true );
        expect( index ).toBe( 4 );
    } );

    test( `向上查找,都是disable，则返回undefined` , () => {
        list = Array( 5 )
            .fill()
            .map( () => ( { disabled: true } ) );
        const index = loopFindEnable( list , 3 , true );
        expect( index ).toBe( undefined );
    } );

    test( `向下查找` , () => {
        const index = loopFindEnable( list , 2 );
        expect( index ).toBe( 2 );
    } );

    test( `向下查找，当前disabled，则找到下一个3` , () => {
        list[ 2 ] = { disabled: true };
        const index = loopFindEnable( list , 2 );
        expect( index ).toBe( 3 );
    } );

    test( `向下查找，当前和后续都是disabled，则找到第一个0` , () => {
        list[ 2 ] = { disabled: true };
        list[ 3 ] = { disabled: true };
        list[ 4 ] = { disabled: true };
        const index = loopFindEnable( list , 2 );
        expect( index ).toBe( 0 );
    } );

    test( `向下查找，数组都是disabled，则返回undefined` , () => {
        list = Array( 5 )
            .fill()
            .map( () => ( { disabled: true } ) );
        const index = loopFindEnable( list , 2 );
        expect( index ).toBe( undefined );
    } );

    test( `向下查找，前一个是唯一一个有效的` , () => {
        list = Array( 5 )
            .fill()
            .map( () => ( { disabled: true } ) );
        list[ 1 ] = { disabled: false };
        const index = loopFindEnable( list , 2 );
        expect( index ).toBe( 1 );
    } );
} );
