<template>
    <Dropdown
        v-model="visibleOptions"
        @dropdown-open="_dropdownOpen"
        @dropdown-closed="_dropdownClosed"
    >
        <div
            ref="select"
            :class="`${b}-select-wrapper`"
            :tabindex="tabIndex"
            @click="_clickTrigger"
        >
            <div :class="clsSelectInner">
                <div :class="`${b}-select-legend`">
                    <div
                        v-if="showSearch"
                        :class="`${b}-legend-inner`"
                    >
                        <Input
                            v-show="visibleInput"
                            ref="vmSearch"
                            v-model="searchWord"
                            style="width:100%"
                            :class="`${b}-select-search-input`"
                            @focus="_focusSearchInput"
                            @blur="_blurSearchInput"
                            @input="_searchWordChange"
                        />
                        <div
                            v-if="showSelectedValue"
                            :class="clsSelectedValue"
                        >
                            {{ selectedValue }}
                        </div>
                        <!-- eslint-disable-line -->
                        <div
                            v-if="showSearchPlaceholder"
                            :class="
                                `${b}-select-placeholder ${b}-search-placeholder`
                            "
                        >
                            {{ placeholder }}
                        </div>
                        <!-- eslint-disable-line -->
                    </div>
                    <div v-else>
                        <span
                            v-if="hasSelected"
                            :class="`${b}-select-value`"
                        >
                            {{ selectedLabel }}
                        </span>
                        <span
                            v-else
                            :class="`${b}-select-placeholder`"
                        >
                            {{ placeholderLabel }}
                        </span>
                    </div>
                </div>
                <TriggerIcon
                    :b="b"
                    :visible="visibleOptions"
                    @click="_clickIcon"
                />
            </div>
        </div>
        <div
            slot="overlay"
            ref="selectDropdown"
            :class="`${b}-options-wrapper`"
            :style="styleOptionWrapper"
        >
            <div
                v-if="showSearch && searchResultNoList"
                :class="`${b}-options-search-empty`"
            >
                暂无数据
            </div>
            <ul
                v-else
                ref="optionBox"
                :class="`${b}-options-inner`"
            >
                <template v-if="hasOptions">
                    <Option
                        v-for="item in filterAttrBindOptions"
                        :key="item.value"
                        :value="item.value"
                        :disabled="item.disabled === true"
                    >
                        {{ item.label }}
                    </Option>
                    <!-- eslint-disable-line vue/multiline-html-element-content-newline -->
                </template>
                <SlotRender
                    v-else
                    :list="filterSlotOptions"
                />
            </ul>
        </div>
    </Dropdown>
</template>

<script>
import Dropdown from '../dropdown';
import Input from '../input';
import Option from './option';
import { bviewPrefix as b } from '../../utils/macro';
import optionList , { isOption } from './helper/optionList';
import keyboard from './helper/keyboard';
import scrollActiveIndex from './helper/scrollActiveIndex';
import searchWord from './helper/searchWord';
import SlotRender from './helper/slotRender';
import { getVnodesTxt } from './helper/traverseVnode';
import TriggerIcon from './component/triggerIcon';
import { selectName } from './helper/name';

export default {
    name: selectName ,
    components: { Dropdown , Option , Input , SlotRender , TriggerIcon } ,
    mixins: [ optionList , keyboard , scrollActiveIndex , searchWord ] ,
    props: {
        // @doc 占位提示符
        placeholder: {
            type: String ,
            default: undefined
        } ,
        // @doc v-model
        value: {
            type: null ,
            default: undefined
        } ,
        // @doc 默认false，则value值只是option代表的值，设置成true，则value是对象形式，参数中有label：{ value , label }。
        labelInValue: {
            type: Boolean ,
            default: false
        } ,
        // @doc 如果不引入Option组件，可使用options参数直接生成option列表，参数应该符合{ value , label }的形式，支持disabled属性。注意：options和default slot配置方式只能二选一
        options: {
            type: Array ,
            default: undefined
        } ,
        // @doc tabindex顺序，取值需要在0到32767之间，默认字符流中的次序来
        tabIndex: {
            type: Number ,
            default: 0
        } ,
        // @doc 支持搜索
        showSearch: {
            type: Boolean ,
            default: false
        } ,
        // @doc 是否根据输入项进行过滤。如果配置为一个函数，则会接收三个参数:searchWord,label,(vNode or option)视配置slot或option方式的区别，符合筛选条件应该返回true，反之返回false
        filterOption: {
            type: [ Boolean , Function ] ,
            default: true
        }
    } ,
    data() {
        let slotOptions = this.$slots.default;
        return {
            selected: undefined ,
            activeIndex: undefined ,
            visibleOptions: false ,
            styleOptionWrapper: undefined ,
            b ,
            searchWord: `` ,
            slotOptions: slotOptions ? slotOptions : []
        };
    } ,
    computed: {
        hasSelected() {
            return this.selected !== undefined;
        } ,
        placeholderLabel() {
            let { placeholder } = this ,
                hasPlaceholder = placeholder !== undefined;
            return hasPlaceholder ? placeholder : `\u2003`;
        } ,
        activeOption() {
            let { activeIndex , optionList } = this;
            if ( activeIndex === undefined ) {
                return undefined;
            }
            return optionList[ activeIndex ];
        } ,
        hasOptions() {
            let { options } = this;
            return options !== undefined && options !== null;
        } ,
        selectedLabel() {
            let { selected , hasSelected } = this;
            if ( hasSelected ) {
                let hasLabel = selected.label !== undefined ,
                    txt = hasLabel ? selected.label : selected.value ,
                    isStr = typeof txt === `string` ,
                    isObj = typeof txt === `object` ,
                    canFormat = true;
                if ( isObj ) {
                    try {
                        JSON.stringify( txt );
                        canFormat = true;
                    } catch ( e ) {
                        canFormat = false;
                    }
                }
                return isStr ? txt.trim() : canFormat ? txt : `\u{3000}`; // 中文全角空格
            } else {
                return undefined;
            }
        } ,
        clsSelectInner() {
            let { showSearch } = this ,
                cls = `${b}-select-inner`;
            if ( showSearch ) {
                cls += ` ${b}-select-search-inner`;
            }
            return cls;
        } ,
        filterSlotOptions() {
            let { hasOptions } = this;
            // :options方式绑定的，通过另外一种方式过滤
            if ( hasOptions ) {
                return [];
            }
            let { slotOptions , searchWord , showSearch } = this;
            if ( showSearch ) {
                searchWord = searchWord.trim();
                let hasSearchWord =
                        searchWord !== undefined &&
                        searchWord !== null &&
                        searchWord.trim() !== `` ,
                    validOptions = slotOptions
                        .filter( isOption )
                        .filter( vNode => {
                            let { componentOptions: op } = vNode ,
                                { children } = op ,
                                text = getVnodesTxt( children ) ,
                                needFilter =
                                    hasSearchWord && text !== undefined;
                            if ( needFilter ) {
                                let reserver = this._checkFilterOption(
                                    searchWord ,
                                    text ,
                                    vNode
                                );
                                return reserver;
                            }
                            return true;
                        } );
                return validOptions;
            } else {
                return slotOptions;
            }
        } ,
        searchResultNoList() {
            let {
                    hasOptions ,
                    searchWord ,
                    filterSlotOptions ,
                    filterAttrBindOptions
                } = this ,
                hasSearchWord =
                    searchWord !== undefined &&
                    searchWord !== null &&
                    searchWord.trim() !== `` ,
                slotOpsNone = filterSlotOptions.length === 0 ,
                attrOpsNone = filterAttrBindOptions.length === 0 ,
                noList = hasOptions ? attrOpsNone : slotOpsNone;
            if ( hasSearchWord && noList ) {
                return true;
            } else {
                return false;
            }
        }
    } ,
    watch: {
        visibleOptions( val , oldVal ) {
            let changed = val !== oldVal ,
                calc = changed && val;
            if ( calc ) {
                this._clacOptionWrapperWidth();
            }
        } ,
        value( val , oldVal ) {
            let changed = val !== oldVal;
            if ( changed ) {
                this._syncValueWithSelected();
            }
        }
    } ,
    created() {
        this.__options = [];
        this.__dropdownClosedCallBacks = [];
        this.__delayBlurCloseDropdownCancel = undefined;
        this.$on( `click-option` , this._clickOption );
        this.$on( `register-option` , this._regsiterOption );
        this.$on( `un-register-option` , this._unRegsiterOption );
        // 初次加载 填充legend
        this._setValue();
    } ,
    destroyed() {
        this.__options = undefined;
        this.__dropdownClosedCallBacks = undefined;
        this.__delayBlurCloseDropdownCancel = undefined;
    } ,
    updated() {
        this._syncSlotOptions();
    } ,
    methods: {
        _getSelectedOptionIndex() {
            let { selected , optionList , hasSelected } = this;
            if ( hasSelected ) {
                let index = optionList.findIndex(
                        item => item.value === selected.value
                    ) ,
                    hasIndex = index > -1;
                return hasIndex ? index : undefined;
            } else {
                return undefined;
            }
        } ,
        async _clickTrigger() {
            let { showSearch , visibleInput } = this;
            if ( showSearch === false ) {
                this._toggleOptions();
            } else {
                if ( visibleInput ) {
                    return;
                }
                this.visibleInput = true;
                await this.$nextTick();
                let {
                    $refs: { vmSearch }
                } = this;
                vmSearch.focus();
            }
        } ,
        _toggleOptions( flag ) {
            let { visibleOptions } = this ,
                confrimedVisible = flag !== undefined;
            if ( confrimedVisible ) {
                this.visibleOptions = flag;
            } else {
                this.visibleOptions = !visibleOptions;
            }
        } ,
        _clacOptionWrapperWidth() {
            let {
                    $refs: { select }
                } = this ,
                rect = select.getBoundingClientRect() ,
                { width } = rect;
            this.styleOptionWrapper = `width: ${width}px`;
        } ,
        _checkIfScrollOption() {
            let { activeIndex } = this ,
                hasActive = activeIndex !== undefined;
            if ( hasActive ) {
                this._scrollOptions( activeIndex );
            }
        } ,
        _clickOption( { payload , disabled } ) {
            let { __delayBlurCloseDropdownCancel: cancel } = this;
            cancel && cancel();
            if ( disabled ) {
                return;
            }
            let { value , label } = payload;
            this.selected = { value , label };
            this._emitInput();
            this._toggleOptions( false );
        } ,
        _setValue() {
            let { optionList , value , labelInValue } = this ,
                valueDefined = value !== undefined;
            if ( valueDefined ) {
                let target = optionList.find( ( { value: val } ) => {
                        return labelInValue
                            ? value.value === val
                            : val === value;
                    } ) ,
                    hasValue = target !== undefined;
                if ( hasValue ) {
                    let index = optionList.findIndex( item => item === target );
                    this.selected = { ...target };
                    this.activeIndex = index;
                } else {
                    let newSelected = labelInValue ? { ...value } : { value };
                    this.selected = newSelected;
                }
            }
        } ,
        _regsiterOption( vm ) {
            let { __options } = this;
            __options.push( vm );
        } ,
        _unRegsiterOption( vm ) {
            let { __options } = this ,
                index = __options.indexOf( vm ) ,
                hasIndex = index > -1;
            if ( hasIndex ) {
                __options.splice( index , 1 );
            }
        } ,
        _dropdownOpen() {
            this._checkIfScrollOption();
        } ,
        _dropdownClosed() {
            this._resetActiveIndex();
            this._doClosedCallbacks();
        } ,
        _doClosedCallbacks() {
            let { __dropdownClosedCallBacks: callbacks } = this;
            if ( callbacks ) {
                for ( let cb of callbacks ) {
                    cb();
                }
            }
            // 执行完就清空
            this.__dropdownClosedCallBacks = [];
        } ,
        _resetActiveIndex() {
            let index = this._getSelectedOptionIndex();
            if ( index !== undefined ) {
                this.activeIndex = index;
            } else {
                this.activeIndex = undefined;
            }
        } ,
        _keyEnter() {
            let { activeIndex , visibleOptions , optionList } = this ,
                hiddenDropdown = visibleOptions === false ,
                noneSelected = activeIndex === undefined;
            if ( noneSelected || hiddenDropdown ) {
                let isFocusNeedOpen = this._checkIsTabActive();
                if ( isFocusNeedOpen ) {
                    this._toggleOptions();
                }
            } else {
                // activeIndex tre , visible true
                let targetOption = optionList[ activeIndex ] ,
                    { value , label } = targetOption;
                this.selected = { value , label };
                this._emitInput();
                this._triggerSearchInputBlur();
                this._toggleOptions();
            }
        } ,
        _keyTab( event ) {
            let {
                    $refs: { select } ,
                    visibleOptions
                } = this ,
                visible = visibleOptions === true ,
                currentEl = event.target === select;
            if ( visible && currentEl ) {
                this._toggleOptions();
            }
        } ,
        _checkIsTabActive() {
            let {
                    $refs: { select }
                } = this ,
                flag = document.activeElement === select;
            return flag;
        } ,
        _emitInput() {
            let { selected , labelInValue } = this ,
                { value , label } = selected;
            // @doc 选中值变化触发input事件
            this.$emit( `input` , labelInValue ? { value , label } : value );
        } ,
        _syncValueWithSelected() {
            let {
                    value: outData ,
                    selected ,
                    hasSelected ,
                    labelInValue ,
                    optionList
                } = this ,
                selectdValue = hasSelected ? selected.value : undefined ,
                hasOutValue = outData !== undefined ,
                outDataValue = hasOutValue
                    ? labelInValue
                        ? outData.value
                        : outData
                    : undefined ,
                sameValue = outDataValue === selectdValue;
            if ( sameValue ) {
                return;
            }
            let clonedValue = hasOutValue
                    ? labelInValue
                        ? { ...outData }
                        : outData
                    : undefined ,
                newSelected = labelInValue ? clonedValue : { value: outData };
            // 追加label属性
            if ( labelInValue === false ) {
                let target = optionList.find( ( { value } ) => value === outData ) ,
                    hasTarget = target !== undefined ,
                    label = hasTarget ? target.label : undefined;
                Object.assign( newSelected , { label } );
            }
            this.selected = newSelected;
            let index = this._getSelectedOptionIndex();
            this.activeIndex = index;
        } ,
        _syncSlotOptions() {
            let changed = this.slotOptions !== this.$slots.default;
            if ( changed ) {
                this.slotOptions = this.$slots.default
                    ? this.$slots.default
                    : [];
            }
        } ,
        _triggerSearchInputBlur() {
            let {
                showSearch ,
                $refs: { vmSearch }
            } = this;
            if ( showSearch ) {
                vmSearch.blur();
            }
        } ,
        _clickIcon( event ) {
            event.stopPropagation();
            let { __delayBlurCloseDropdownCancel: cancel } = this;
            cancel && cancel();
            this._toggleOptions();
        }
    }
};
</script>
