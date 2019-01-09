

export default {
    computed: {
        filterAttrBindOptions(){
            let { hasOptions , options , searchWord , showSearch } = this ,
                hasSearchWord = searchWord !== undefined && 
                    searchWord !== null && 
                    searchWord.trim() !== '' ,
                filter = showSearch && 
                    hasOptions &&
                    hasSearchWord
            // console.log(showSearch,hasOptions,hasSearchWord)
            if ( filter ) {
                let result = options.filter( ( { label } ) => {
                    let hasLable = label !== undefined && label !== null
                    if ( hasLable ) {
                        let has = label.includes( searchWord )
                        console.log( label , searchWord , has )
                        return has
                    }
                    return true
                } )
                return result
            } else {
                return options
            }
        } ,
    } ,
    watch: {
        searchWord( val , oldVal ){
            let changed = val !== oldVal
            if ( changed ) {
                this._searchWordChanged( val )
            }
        }
    } ,
    methods: {
        _searchWordChanged(){
            this._resetActiveIndex()
            this._toggleOptions( true )
        } ,
        _focusSearchInput(){
            this._toggleOptions( true )
        } ,
        _blurSearchInput(){
            this._toggleOptions( false )
        }
    }
}