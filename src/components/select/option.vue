<template>
    <li
        ref="el"
        :class="bClsOption"
        @click="_clickOption"
    >
        <!-- eslint-disable vue/singleline-html-element-content-newline -->
        <Icon
            v-if="selected"
            type="check"
            :class="bClsOptionSelectedIcon"
        /><slot v-if="hasDefineLabel" /><template v-else>
            {{
                noLabelShowValue
            }}
        </template>
        <!-- eslint-enable vue/multiline-html-element-content-newline -->
    </li>
</template>

<script>
import { findComponentUpward } from '../../utils/assist'
import Icon from '../icon'
import { optionName , selectName } from './helper/name'
import { bviewPrefix as b } from '../../utils/macro'
import { getVnodesTxt } from './helper/traverseVnode'
import warnFn from '../../utils/warn'

function joinClassnames( ...classnames ) {
    return classnames.filter( i => i ).join( ` ` )
}
const warn = warnFn( `Option` )

export default {
    name: optionName ,
    components: {
        Icon ,
    } ,
    props: {
        // @doc 值
        value: {
            type: null ,
            required: true ,
        } ,
        // @doc 禁用
        disabled: {
            type: Boolean ,
            default: false ,
        } ,
    } ,
    computed: {
        selectVm() {
            let parent = findComponentUpward( this , selectName )
            return parent
        } ,
        bClsOption() {
            let { selected , disabled , selectVm , value } = this ,
                cls = `${b}-option` ,
                { activeOption } = selectVm
                    ? selectVm
                    : { activeOption: undefined } ,
                hasActiveOption = activeOption !== undefined ,
                currentActive = hasActiveOption && activeOption.value === value
            if ( disabled ) {
                cls = joinClassnames( cls , `${b}-option-disabled` )
            }
            if ( selected ) {
                cls = joinClassnames( cls , `${b}-option-selected` )
            }
            if ( currentActive ) {
                cls = joinClassnames( cls , `${b}-option-active` )
            }
            return cls
        } ,
        bClsOptionSelectedIcon() {
            return `${b}-option-selected-icon`
        } ,
        selected() {
            let { selectVm } = this ,
                { selected } = selectVm ? selectVm : { selected: undefined } ,
                selted = selected ? selected.value === this.value : false
            return selted
        } ,
        hasDefineLabel() {
            let {
                    $slots: { default: children } ,
                } = this ,
                defined = children !== undefined
            return defined
        } ,
        noLabelShowValue() {
            let { value } = this ,
                isObj = typeof value === `object` ,
                objTxt
            if ( isObj ) {
                try {
                    objTxt = JSON.stringify( value )
                } catch ( e ) {
                    objTxt = `\u{3000}` // 中文全角空格 &emsp;
                    warn(
                        `format error , you should format Option's value by your self` ,
                    )
                }
            }
            return isObj ? objTxt : `${value}`
        } ,
    } ,
    mounted() {
        this._registerOption()
    } ,
    destroyed() {
        this._unRegisterOption()
    } ,
    methods: {
        _clickOption() {
            let {
                    value ,
                    $refs: { el } ,
                    selectVm ,
                    disabled ,
                } = this ,
                noSelect = selectVm === undefined ,
                noEl = el === undefined ,
                skip = noSelect || noEl ,
                label = this._getSlotTextContent() ,
                payload = { value , label }
            if ( skip ) {
                return
            }
            // -@doc
            selectVm.$emit( `click-option` , { vm: this , payload , disabled } )
        } ,
        _registerOption() {
            let { selectVm } = this ,
                noSelect = selectVm === undefined
            if ( noSelect ) {
                return
            }
            // -@doc
            selectVm.$emit( `register-option` , this )
        } ,
        _unRegisterOption() {
            let { selectVm } = this ,
                noSelect = selectVm === undefined
            if ( noSelect ) {
                return
            }
            // -@doc
            selectVm.$emit( `un-register-option` , this )
        } ,
        _getSlotTextContent() {
            let {
                    $slots: { default: textVnodes } ,
                } = this ,
                txt = getVnodesTxt( textVnodes )
            return txt
        } ,
    } ,
}
</script>
