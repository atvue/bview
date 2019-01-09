

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