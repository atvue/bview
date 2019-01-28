<template>
    <Transition :name="`${b}-tag-transition`">
        <div
            v-if="show"
            :class="clsTag"
        >
            <slot />
            <Icon
                v-if="loading"
                :svg="renderLoading"
                :class="`${b}-tag-loading`"
                :size="14"
            />
            <Icon
                v-else-if="closable"
                :svg="renderClose"
                :class="`${b}-tag-close`"
                :size="14"
                @click="_clickClose"
            />
        </div>
    </Transition>
</template>

<script>
import renderClose from '../../icons/close' ;
import renderLoading from '../../icons/loading' ;
import Icon from '../icon' ;
import { bviewPrefix as b } from '../../utils/macro' ;
import { toArray } from '../../utils/assist' ;

export default {
    name: `Tag` ,
    components: { Icon } ,
    props: {
        // @doc 标签是否可关闭
        closable: {
            type: Boolean ,
            default: false
        } ,
        // @doc 是否禁用
        disabled: {
            type: Boolean ,
            default: false
        }
    } ,
    data() {
        return {
            b ,
            destroyed: false ,
            loading: false ,
            renderLoading ,
            renderClose
        } ;
    } ,
    computed: {
        show() {
            return this.destroyed === false ;
        } ,
        clsTag() {
            let { disabled } = this ,
                cls = `${b}-tag` ;
            if ( disabled ) {
                cls += ` ${b}-tag-disabled` ;
            }
            return cls ;
        }
    } ,
    methods: {
        async _clickClose( event ) {
            if ( this.disabled ) {
                return ;
            }
            let results = this._$emitClose( event ) ;
            let { defaultPrevented: prevented } = event ,
                needDestroy = prevented !== true ;
            if ( needDestroy ) {
                this.loading = true ;
                let resultPromises = results.map( item => Promise.resolve( item ) ) ;
                try {
                    await Promise.all( resultPromises ) ;
                    this.loading = false ;
                    this.destroyed = true ;
                } catch ( e ) {
                    this.loading = false ;
                    this.destroyed = false ;
                }
            }
            // eslint-disable-next-line
            if (false) {
                // just for document。需求：doc，可直接添加事件说明的入口
                // @doc 关闭事件
                this.$emit( `close` , event ) ;
            }
        } ,
        // https://github.com/vuejs/vue/issues/5443
        _$emitClose() {
            let eventName = `close` ,
                vm = this ,
                cbs = vm._events[ eventName ] ,
                result = [] ;
            if ( cbs ) {
                cbs = cbs.length > 1 ? toArray( cbs ) : cbs ;
                let args = toArray( arguments ) ;
                for ( let i = 0 , l = cbs.length ;i < l ;i++ ) {
                    try {
                        let rtn = cbs[ i ].apply( vm , args ) ;
                        result.push( rtn ) ;
                    } catch ( e ) {
                        // eslint-disable-next-line
                        console.warn(
                            e ,
                            vm ,
                            `event handler for "` + eventName + `"`
                        ) ;
                    }
                }
            }
            return result ;
        }
    }
} ;
</script>
