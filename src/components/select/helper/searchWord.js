import { timeout } from '../../../utils/timer'
import makeCancelable from '../../../utils/makeCancelable'

export default {
    watch: {
        searchWord( val , oldVal ){
            let changed = val !== oldVal
            if ( changed ) {
                this._resetActiveIndex()
            }
        }
    } ,
    computed: {
        filterAttrBindOptions(){
            let { hasOptions , options , searchWord , showSearch } = this
            searchWord = searchWord.trim()
            let hasSearchWord = searchWord !== undefined && 
                    searchWord !== null && 
                    searchWord.trim() !== '' ,
                filter = showSearch && 
                    hasOptions &&
                    hasSearchWord
            if ( filter ) {
                let result = options.filter( ( { label } ) => {
                    let hasLable = label !== undefined && label !== null
                    if ( hasLable ) {
                        let has = label.includes( searchWord )
                        return has
                    }
                    return true
                } )
                return result
            } else {
                return options ? options : []
            }
        } ,
        searchPlaceholder(){
            let { placeholder , hasSelected , selected } = this
            if ( hasSelected ) {
                let { label } = selected
                return label
            }
            return placeholder
        } ,
    } ,
    methods: {
        _focusSearchInput(){
            let { hasSelected } = this
            if ( hasSelected ) {
                this.searchWord = ''
            }
            this._toggleOptions( true )
        } ,
        _syncSelectedValueToSw(){
            let { hasSelected , selectedLabel } = this
            if ( hasSelected ) {
                this.searchWord = selectedLabel
            }
        } ,
        async _blurSearchInput(){
            let { __dropdownClosedCallBacks: closedCbs , 
                    _syncSelectedValueToSw: syncVSw } = this ,
                synced = closedCbs.includes( syncVSw )
            // 未加入过回调
            if ( !synced ) {
                closedCbs.push( syncVSw )
            }
            // 异步关闭 可取消关闭，下拉框存在是click事件执行的条件
            let { promise , cancel } = makeCancelable( timeout( 50 ) )
            this.__delayBlurCloseDropdownCancel = cancel
            try {
                await promise
                this._toggleOptions( false )
            } catch( e ) {
                if ( e.isCanceled !== true ) {
                    // eslint-disable-next-line
                    console.warn( e )
                } 
            }
        } ,
        _searchWordChange(){
            this._toggleOptions( true )    
        }
    }
}