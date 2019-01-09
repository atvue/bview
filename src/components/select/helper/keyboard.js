
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
    enter: 13 ,
    tab: 9 ,
}

export const loopFindEnable = ( list , index , up = false ) => {
    let r ,
        size = list.length
    for( let i = index , loop = 0 ; up ? i >= 0 : i < size ; up ? i-- : i++ ) {
        let target = list[ i ] ,
            { disabled } = target
        if ( i === index ) {
            loop++
        }
        // 经历了一次闭环，跳出
        if ( loop === 2 ) {
            break
        }
        if ( disabled ) {
            // 到头，继续从size-1向上找
            if ( up && i === 0 ) {
                i = size
            }
            // 到尾，继续从0向下找
            if ( !up && i === ( size - 1 ) ) {
                i = -1
            }
            continue
        } else {
            r = i
            break
        }
    }
    return r
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
            let { showSearch } = this ,
                { which } = event ,
                isLeft = showSearch ? false : which === keyMap.left ,
                isUp = which === keyMap.up ,
                isRight = showSearch ? false : which === keyMap.right ,
                isDown = which === keyMap.down ,
                isEnter = which === keyMap.enter ,
                isTab = which === keyMap.tab ,
                upward = isLeft || isUp ,
                downward = isRight || isDown
            if ( upward || downward ) {
                this._scrollDropdownDir( event , upward )
            }
            if ( isEnter ) {
                this._keyEnter( event )
            }
            if ( isTab ) {
                this._keyTab( event )
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
            let { activeIndex , optionList } = this ,
                total = optionList.length ,
                hasActiveIndex = activeIndex !== undefined ,
                nextIndex = undefined
            if ( hasActiveIndex ) {
                nextIndex = up ? activeIndex - 1 : activeIndex + 1
            } else {
                nextIndex = up ? total - 1 : 0
            }
            nextIndex = fixOverflow( total , nextIndex )
            nextIndex = loopFindEnable( optionList , nextIndex , up )
            this.activeIndex = nextIndex
        }
    }
}