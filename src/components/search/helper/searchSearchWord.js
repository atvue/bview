import searchWord from '../../select/helper/searchWord';

export default {
    extends: searchWord ,
    computed: {
        filterAttrBindOptions() {
            let {
                hasOptions ,
                options ,
                searchWord ,
                showSearch ,
                hasSelectedOptions ,
                hasSearchOptions
            } = this;
            searchWord = searchWord.trim();
            let hasSearchWord =
                    searchWord !== undefined &&
                    searchWord !== null &&
                    searchWord.trim() !== `` ,
                filter = showSearch && hasOptions && hasSearchWord;
            if ( filter ) {
                let result = options.filter( ( { label } ) => {
                    let hasLable = label !== undefined && label !== null;
                    if ( hasLable ) {
                        let has = label.includes( searchWord );
                        return has;
                    }
                    return true;
                } );
                if ( hasSearchOptions && hasSelectedOptions ) {
                    // 选择值需要清空options
                    result = [];
                    this.$emit( `clearOptions` );
                    this.hasSelectedOptions = false;
                }
                if ( this.isFocus ) {
                    this._toggleOptions( true );
                    this.isFocus = false;
                }
                return result;
            } else {
                return options ? options : [];
            }
        }
    } ,
    methods: {
        _focusSearchInput() {
            let { hasSelected , hasSearchOptions } = this;
            if ( !hasSearchOptions ) {
                if ( hasSelected ) {
                    this.searchWord = ``;
                }
                this._toggleOptions( true );
            } else {
                this.isFocus = true;
                this.$emit( `focusSearchInput` );
            }
        } ,
        _searchWordChange( value ) {
            let hasValue = value === `` ? false : true;
            this._toggleOptions( hasValue );
            if ( !value ) {
                this.selected = undefined;
            }
            this.$emit( `searchWordChange` , value );
        } ,
        resetSearchWord() {
            this.searchWord = ``;
            this.selected = undefined;
        }
    }
};
