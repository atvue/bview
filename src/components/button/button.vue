<template>
    <button
        :disabled="disableStatus"
        :class="buttonClassName"
        @click.prevent="$_onClick"
    >
        <slot />
        <i v-if="loading" />
        <span>{{ tip }}</span>
        <Icon
            v-if="loadingStatus"
            :svg="loadIcon"
            :class="`${b}-switch-loading`"
        />
    </button>
</template>

<script>
import { bviewPrefix as b } from '../../utils/macro'
import loadIcon from '../../icons/loading'
const typeDefault = `primary`
const types = [ `main` , `primary` , `text` ]
const sizes = [ `` , `big` , `small` ]
const SizeDefault = sizes[ 0 ]

export default {
    name: `Button` ,
    props: {
        //@doc是否禁用按钮
        disabled: {
            type: Boolean ,
            default: false ,
        } ,
        //@doc是否需要loading
        loading: {
            type: Boolean ,
            default: false ,
        } ,
        //@doc是否显示slot
        showSlot: {
            type: Boolean ,
            default: false ,
        } ,
        enableTip: {
            type: String ,
            default: `` ,
        } ,
        //@doc按钮的大小
        size: {
            validator( value ) {
                return sizes.indexOf( value ) >= 0
            } ,
            default: SizeDefault ,
        } ,
        //@doc按钮的类型,为[primary ,text]的一种
        type: {
            validator( value ) {
                return value ? true : types.indexOf( value ) >= 0
            } ,
            default: typeDefault ,
        } ,
        //@doc倒计时时间
        count: {
            type: Number ,
            default: 30 ,
            loadIcon: loadIcon ,
        } ,
        countingTip: {
            type: String ,
            default: `[count]s` ,
        } ,
    } ,
    data() {
        return {
            b: b ,
            tip: this.enableTip ,
            countNum: this.count ,
            disableStatus: this.disabled ,
            loadingStatus: this.loading ,
        }
    } ,
    computed: {
        buttonClassName() {
            let { type , size } = this

            return [
                `${b}-button` ,
                `${b}-button-size${size}` ,
                `${b}-button-${type}` ,
            ]
        } ,
    } ,
    beforeDestroy() {
        // @NOTE 实例销毁前清除定时器
        if ( this.sto ) {
            window.clearTimeout( this.sto )
        }
    } ,
    methods: {
        $_onClick( event ) {
            let { loadingStatus } = this
            if ( !loadingStatus ) {
                //@doc 点击事件，参数event
                this.$emit( `click` , event )
            }
        } ,
        //@doc锁定按钮，或者倒计时
        setLock( opt ) {
            let _opt = opt || {}
            this.disableStatus = 1
            // 是否loading
            if ( _opt.loading ) {
                this.loadingStatus = 1
            } else {
                this.loadingStatus = 0
            }
            // 是否倒计时
            if ( _opt.count ) {
                // 倒计时文案采用countingTip走倒计时流程
                this.$_countDown()
            } else {
                // 仅锁定，采用disableTip
                this.tip = _opt.tip
            }
        } ,
        //@doc解锁按钮
        unLock() {
            // 还原按钮状态
            this.disableStatus = false
            this.tip = this.enableTip
            this.loadingStatus = 0
            clearTimeout( this.timer )
        } ,
        $_countDown: ( function() {
            var _count = 30
            var t = function() {
                this.timer = setTimeout( () => {
                    _count--
                    this.tip = this.countingTip.replace( `[count]` , _count )
                    if ( _count < 0 ) {
                        this.$emit( `countend` , {
                            sender: this ,
                        } )
                        this.unLock()
                        clearTimeout( this.timer )
                        return
                    }
                    t.apply( this )
                } , 1000 )
            }
            return function() {
                this.$emit( `countbegin` , {
                    sender: this ,
                } )
                _count = this.count
                _count--
                this.tip = this.countingTip.replace( `[count]` , _count )
                t.apply( this )
            }
        } )() ,
    } ,
}
</script>
