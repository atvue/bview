<template>
    <div
        ref="timeBox"
        :class="`${b}-time`"
    >
        <div
            v-for="(item, index) in timeData"
            :key="item.value"
            :class="`${b}-time-list`"
            :style="$_getStyle()"
        >
            <ul :class="`${b}-time-list-ul`">
                <li
                    v-for="item2 in item.data"
                    :key="item2.value"
                    :class="$_getSelectedClass(item, index, item2)"
                    @click="$_selectTime(item, index, item2)"
                >
                    {{ item2.label }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
//得到时间选择的数组
function getTimeDate( t ) {
    let arr = []
    for ( let i = 0 ;i < 60 ;i++ ) {
        if ( t === `hours` && i === 24 ) {
            break
        }
        let v = i < 10 ? `0` + i : i
        v = v + ``
        arr.push( { label: v , value: v } )
    }
    return arr
}

import { bviewPrefix as b } from '../../utils/macro'

export default {
    props: {
        //@doc 时间类型，分为hms组合使用
        timeType: {
            type: String ,
            default: `hms` ,
        } ,
    } ,
    data() {
        return {
            b ,
            timeData: [] ,
            selectTimeData: [] ,
            defaultSelectData: [] ,
        }
    } ,
    mounted() {
        this.$_initDate()
    } ,
    methods: {
        //@doc 设置时间
        setTime( v ) {
            let s = v.join( `` )
            let reg = /^(\d{2}){1,3}$/
            //不是合法格式的重置
            if ( !reg.test( s ) ) {
                this.resetSelect()
                return
            }
            this.selectTimeData = Object.assign( [] , v )
            setTimeout( () => {
                this.$_scroll()
            } )
        } ,

        //@doc 重设时间
        resetSelect() {
            this.selectTimeData = Object.assign( [] , this.defaultSelectData )
            setTimeout( () => {
                this.$_scroll()
            } )
        } ,

        $_initDate() {
            for ( let i = 0 ;i < this.timeType.length ;i++ ) {
                let t = this.timeType[ i ]
                this.selectTimeData.push( null )
                if ( t === `h` ) {
                    this.timeData.push( {
                        type: `hour` ,
                        data: getTimeDate( `hours` ) ,
                    } )
                }
                if ( t === `m` ) {
                    this.timeData.push( {
                        type: `minute` ,
                        data: getTimeDate() ,
                    } )
                }
                if ( t === `s` ) {
                    this.timeData.push( {
                        type: `sencond` ,
                        data: getTimeDate() ,
                    } )
                }
            }
            this.defaultSelectData = Object.assign( [] , this.selectTimeData )
            this.$_scroll()
        } ,

        $_getStyle() {
            let w = ( 1 / this.timeData.length ) * 100
            return `width:${w}%`
        } ,

        //得到选中的样式
        $_getSelectedClass( item , index , item2 ) {
            if ( this.selectTimeData[ index ] === item2.value ) {
                return `${b}-time-active`
            }
            return ``
        } ,

        //选择时间
        $_selectTime( item , index , item2 ) {
            let data = this.selectTimeData
            this.$set( data , index , item2.value )
            for ( let i = 0 ;i < data.length ;i++ ) {
                if ( !data[ i ] ) {
                    this.$set( data , i , `00` )
                }
            }
            this.$_scroll()
            //@doc 选择时间
            this.$emit( `select` , this.selectTimeData )
        } ,

        //时间选择定位到顶部
        $_scroll() {
            let divs = this.$refs.timeBox.childNodes
            for ( let i = 0 ;i < divs.length ;i++ ) {
                let item = divs[ i ]
                let n = ( Number( this.selectTimeData[ i ] ) || 0 ) * 20
                item.scrollTop = n
            }
        } ,
    } ,
}
</script>
