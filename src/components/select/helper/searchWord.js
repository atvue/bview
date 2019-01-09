

export default {
    watch: {
        searchWord( val , oldVal ){
            let changed = val !== oldVal
            if ( changed ) {
                this._searchWordChanged( val )
            }
        }
    } ,
    methods: {
        _searchWordChanged( txt ){
            
        } ,
        _focusSearchInput(){
            this._toggleOptions( true )
        } ,
        _blurSearchInput(){
            this._toggleOptions( false )
        }
    }
}