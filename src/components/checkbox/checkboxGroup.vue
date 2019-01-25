<template>
    <div :class="groupClass">
        <slot />
    </div>
</template>

<script>
import { findComponentsDownward } from '../../utils/assist';

const prefix = `bview`;

export default {
    name: `CheckboxGroup` ,
    props: {
        value: {
            type: Array ,
            default() {
                return [];
            }
        } ,
        vertical: {
            type: Boolean ,
            default: false
        }
    } ,
    data() {
        return {
            curValue: this.value ,
            childrens: []
        };
    } ,
    computed: {
        groupClass: function() {
            return [
                `${prefix}-checkbox-group-wrap` ,
                {
                    [ `${prefix}-checkbox-group-vertical` ]: this.vertical
                }
            ];
        }
    } ,
    watch: {
        value() {
            this._updateValue( true );
        }
    } ,
    mounted() {
        this._updateValue( true );
    } ,
    methods: {
        _updateValue( flag ) {
            this.childrens = findComponentsDownward( this , `Checkbox` );
            if ( this.childrens ) {
                const { value } = this;
                this.childrens.forEach( child => {
                    child.isChecked = value.indexOf( child.value ) >= 0;
                    if ( flag ) {
                        child.isGroup = true;
                    }
                } );
            }
        } ,
        _changeValue( value ) {
            let index = this.curValue.indexOf( value );
            if ( index >= 0 ) {
                this.curValue.splice( index , 1 );
            } else {
                this.curValue.push( value );
            }
            //@doc 结合v-model,触发input事件
            this.$emit( `input` , this.curValue );
            //@doc 值改变时触发事件，参数当前的value
            this.$emit( `on-change` , this.curValue );
        }
    }
};
</script>
