import { timeout } from '../../../utils/timer';
import makeCancelable from '../../../utils/makeCancelable';

const validateOptionStructural = item => {
    if ( item === undefined || item === null || typeof item !== `object` ) {
        return false;
    }
    return `value` in item && `label` in item;
};
const formatterOption = item => {
    let validItem = validateOptionStructural( item );
    if ( validItem ) {
        return item;
    } else {
        return {
            value: item ,
            label: item
        };
    }
};

export default {
    watch: {
        searchWord( val , oldVal ) {
            let changed = val !== oldVal;
            if ( changed ) {
                this._resetActiveIndex();
            }
        }
    } ,
    computed: {
        filterAttrBindOptions() {
            let { hasOptions , options , searchWord , showSearch } = this;
            searchWord = searchWord.trim();
            let hasSearchWord =
                    searchWord !== undefined &&
                    searchWord !== null &&
                    searchWord.trim() !== `` ,
                filter = showSearch && hasOptions && hasSearchWord ,
                filterResult;
            if ( filter ) {
                let result = options.filter( item => {
                    let { label } = item ,
                        reserver = this._checkFilterOption(
                            searchWord ,
                            label ,
                            item
                        );
                    return reserver;
                } );
                filterResult = result;
            } else {
                filterResult = options ? options : [];
            }
            return filterResult.map( formatterOption );
        } ,
        searchPlaceholder() {
            let { placeholder , hasSelected , selected } = this ,
                txt;
            if ( hasSelected ) {
                let { label } = selected;
                txt = label;
            } else {
                txt = placeholder;
            }
            if ( typeof txt === `string` ) {
                txt = txt.trim();
            }
            return txt;
        }
    } ,
    methods: {
        _focusSearchInput() {
            let { hasSelected } = this;
            if ( hasSelected ) {
                this.searchWord = ``;
            }
            this._toggleOptions( true );
        } ,
        _syncSelectedValueToSw() {
            let { hasSelected , selectedLabel } = this;
            if ( hasSelected ) {
                this.searchWord = selectedLabel;
            }
        } ,
        async _blurSearchInput() {
            let {
                    __dropdownClosedCallBacks: closedCbs ,
                    _syncSelectedValueToSw: syncVSw
                } = this ,
                synced = closedCbs.includes( syncVSw );
            // 未加入过回调
            if ( !synced ) {
                closedCbs.push( syncVSw );
            }
            // 异步关闭 可取消关闭，下拉框存在是click事件执行的条件
            let { promise , cancel } = makeCancelable( timeout( 50 ) );
            this.__delayBlurCloseDropdownCancel = cancel;
            try {
                await promise;
                this._toggleOptions( false );
            } catch ( e ) {
                if ( e.isCanceled !== true ) {
                    // eslint-disable-next-line
                    console.warn(e);
                }
            }
        } ,
        _searchWordChange() {
            this._toggleOptions( true );
        } ,
        _checkFilterOption( searchWord , label , item ) {
            // type item vNode || option
            let { filterOption } = this ,
                isFunc = typeof filterOption === `function`;
            if ( isFunc ) {
                return filterOption( searchWord , label , item ) === true;
            } else {
                filterOption = filterOption === true;
                if ( filterOption ) {
                    let type = typeof label ,
                        validLabel =
                            label !== undefined &&
                            label !== null &&
                            ( type === `string` || type === `number` ) ,
                        bool = validLabel
                            ? String( label ).includes( searchWord )
                            : true;
                    return bool;
                } else {
                    return true;
                }
            }
        }
    }
};
