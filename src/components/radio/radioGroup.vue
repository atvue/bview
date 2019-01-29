<template>
    <div :class="groupClass">
        <slot />
    </div>
</template>

<script>
import { findComponentsDownward } from '../../utils/assist'

const prefix = `bview`

export default {
    name: `RadioGroup` ,
    props: {
        //@doc单选按钮组的值value
        value: {
            type: [ String , Number ] ,
            default: ``
        } ,

        name: {
            type: String ,
            default: undefined
        } ,
        //@doc是否垂直显示radioGroup
        vertical: {
            type: Boolean ,
            default: false
        }
    } ,
    data() {
        return {
            curValue: this.value ,
            childrens: []
        }
    } ,
    computed: {
        groupClass: function() {
            return [
                `${prefix}-radio-group-wrap` ,
                {
                    [ `${prefix}-radio-group-vertical` ]: this.vertical
                }
            ]
        }
    } ,
    watch: {
        value( val ) {
            if ( this.curValue !== val ) {
                this.curValue = val
                this._updateValue()
            }
        }
    } ,
    mounted() {
        this._updateValue( true )
    } ,
    methods: {
        _updateValue( flag ) {
            this.childrens = findComponentsDownward( this , `Radio` )
            if ( this.childrens ) {
                this.childrens.forEach( child => {
                    child.isChecked = this.curValue === child.value

                    if ( flag ) {
                        child.groupName = this.name
                        child.isGroup = true
                    }
                } )
            }
        } ,
        _changeValue( value ) {
            this.curValue = value
            this._updateValue()
            //@doc 结合v-model,触发input事件
            this.$emit( `input` , value )
            //@doc 值改变时触发事件，参数当前的value
            this.$emit( `change` , value )
        }
    }
}
</script>
