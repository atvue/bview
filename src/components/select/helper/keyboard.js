
export const fixOverflow = ( total , now ) => {
    if ( now < 0 ) {
        return total - 1
    }
    if ( now >= total ) {
        return 0
    }
    return now
}

const keyMap = {
        left: 37 ,
        up: 38 ,
        right: 39 ,
        down: 40 ,
    }
export const loopFindEnable = ( list , index , up ) => {
    let r ,
        size = list.length
    if ( list[ index ].disabled !== true ) {
        return index
    }
    if ( up ) {
        for( let i = index , loop = 0 ; i >= 0 ; i-- ) {
            let target = list[ i ] ,
                { disabled } = target
            if ( i === index ) {
                loop++
            }
            if ( loop === 2 ) {
                break
            }
            if ( disabled ) {
                if ( i === 0 ) {
                    i = size
                }
                continue
            } else {
                r = i
                break
            }
        }
        return r
    } else {

    }
    return index
}

export default {
    mounted(){
        document.addEventListener( 'keydown' , this._keydown )
    } ,
    destroyed(){
        document.removeEventListener( 'keydown' , this._keydown )
    } ,
    methods: {
        _keydown( event ){
            let { which } = event ,
                isLeft = which === keyMap.left ,
                isUp = which === keyMap.up ,
                isRight = which === keyMap.right ,
                isDown = which === keyMap.down ,
                upward = isLeft || isUp ,
                downward = isRight || isDown
            if ( upward || downward ) {
                this._scrollDropdownDir( event , upward )
            }
        } ,
        _scrollDropdownDir( event , up ){
            let { visibleOptions: visible } = this
            if ( visible ) {
                event.preventDefault()
                this._scrollOptionWrapper( up )
            }
        } ,
        _scrollOptionWrapper( up ){
            let { activeIndex , options } = this ,
                total = options.length ,
                hasActiveIndex = activeIndex !== undefined ,
                nextIndex = undefined
            if ( hasActiveIndex ) {
                nextIndex = up ? activeIndex - 1 : activeIndex + 1
            } else {
                nextIndex = up ? total - 1 : 1
            }
            nextIndex = fixOverflow( total , nextIndex )
            nextIndex = loopFindEnable( options , nextIndex , up )
        }
    }
}