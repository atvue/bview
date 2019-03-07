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
                    <div v-if="showSearch">
                        <Input
                            ref="vmSearch"
                            v-model="searchWord"
                            style="width:100%"
                            :placeholder="searchPlaceholder"
                            :clearable="clearable"
                            :disabled="disabled"
                            @focus="_focusSearchInput"
                            @blur="_blurSearchInput"
                            @input="_searchWordChange"
                        />
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
            v-if="filterAttrBindOptions.length"
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
import Select from '../../select/select'
import searchWord from './searchSearchWord'
import { selectName } from '../../select/helper/name'

export default {
    name: selectName ,
    extends: Select ,
    mixins: [ searchWord ] ,
    props: {
        //@doc搜索框是否有清空按钮
        clearable: {
            type: Boolean ,
            default: false ,
        } ,
        hasSearchOptions: {
            type: Boolean ,
            default: false ,
        } ,
        disabled: {
            type: Boolean ,
            default: false ,
        } ,
    } ,
    computed: {
        searchResultNoList() {
            if ( this.hasSearchOptions ) {
                return false
            }
            let {
                    hasOptions ,
                    searchWord ,
                    filterSlotOptions ,
                    filterAttrBindOptions ,
                } = this ,
                hasSearchWord =
                    searchWord !== undefined &&
                    searchWord !== null &&
                    searchWord.trim() !== `` ,
                slotOpsNone = filterSlotOptions.length === 0 ,
                attrOpsNone = filterAttrBindOptions.length === 0 ,
                noList = hasOptions ? attrOpsNone : slotOpsNone
            if ( hasSearchWord && noList ) {
                return true
            } else {
                return false
            }
        } ,
    } ,
    methods: {
        _emitInput() {
            let { selected , labelInValue } = this ,
                { value , label } = selected
            // @doc 选中值变化触发input事件
            this.hasSelectedOptions = true
            this.$emit( `input` , labelInValue ? { value , label } : value )
        } ,
    } ,
}
</script>
