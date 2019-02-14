<template>  
    <div 
        :class="`${b}-datePicker`" 
        @click.stop
    >
        <input 
            ref="input"
            :class="`${b}-datePicker-input`" 
            :value="currentValue"
            :placeholder="placeholder"
            @focus="$_onFocus"
            @blur="$_onBlur" 
            @input="$_onInput"
        >
        <i 
            v-show="currentValue"
            :class="`${b}-datePicker-close`" 
            @click="$_del" 
        >
            X
        </i>
        <div v-show="show">
            <Date 
                ref="cdate"
                :class="`${b}-datePicker-date`" 
                :time-type="timeType"
                :type="type"
                :trigger="trigger"
                :start-time="startTime"
                :end-time="endTime"
                :year-range="yearRange"
                @select="$_selectDate"   
                @cancel="$_cancelDate"       
            />
        </div>
    </div>
</template>

<script>
import Date from './date'
import { bviewPrefix as b } from "../../utils/macro"
//import Emitter from './form/emitter'

export default { 
    name:'DatePicker',
    //mixins: [ Emitter ],
    components:{
        Date
    },
    props:{
        //@doc 日期、时间的值（双绑）
        value:{
            type:String,
            default:''
        },
        //@doc 时间分割符
        timeSplitCode:{
            type:String,
            default:':'
        },
        //@doc 日期分割符
        splitCode:{
            type:String,
            default:'/'
        },
        //@doc 类型，time表示有时间选择
        type:{
            type:String,
            default:''
        },
        //@doc 时间类型，hms组合
        timeType:{
            type:String,
            default:'hm'
        },
        //@doc 开始时间
        startTime:{
            type:String,
            default:''
        },
        //@doc 结束时间
        endTime:{
            type:String,
            default:''
        },
        //@doc 年的选择范围
        yearRange:{
            type:String,
            default:''
        },
        //@doc 没有时间选择的情况下，选择日期是单击还是通过确定按钮选择
        trigger:{
            type:String,
            default:'click'
        },
        //@doc placeholder
        placeholder:{
            type:String,
            default:'请选择日期'
        }
    },
    data(){
        return {
            b ,
            show:false,
            currentValue:this.value
        }
    } ,

    watch:{
        value(v){
            this.currentValue = v
        }
    },

    mounted(){
        document.body.addEventListener('click',()=>{
            this.show = false
        })  
    },

    methods:{
        $_onFocus(){
            if(window.preFloatLayer && window.preFloatLayer.show){
                window.preFloatLayer.show = false
            }
            try{
                let date = {}
                if(this.currentValue){
                    let d = this.currentValue.split(' ')
                    let s = d[0].split(this.splitCode)
                    date.year = s[0]
                    date.month = s[1]
                    date.day = s[2]
                    if(this.type === 'time'){
                        let t = d[1].split(this.timeSplitCode)
                        date.time = t
                    }
                }
                this.show = true
                window.preFloatLayer = this
                this.$refs.cdate.initDate(date)
            }catch(e){
                // eslint-disable-next-line
                console.log(e)
            }
        },

        $_onInput(event){
            var v = event.target.value
            this.currentValue = v
            //@doc 输入时
            this.$emit('input',v)
        },

        $_onBlur(){
            //@doc 失焦时
            this.$emit('blur')
        },

        $_del(){
            this.currentValue = ''
            this.show = false
            //@doc 输入时
            this.$emit('input','')
            //@doc 删除时
            this.$emit('del')
        },

        $_selectDate(v){
            let s = [v.year,v.month,v.day].join(this.splitCode)
            if(this.type === 'time'){
                s += (' ' + v.time.join(this.timeSplitCode))
            }
            this.currentValue = s
            this.show = false
            //@doc 选择时（日期）
            this.$emit('select',s)
            //@doc 输入时
            this.$emit('input',s)
            //this.dispatch('bFormItem', 'on-form-blur', s)
        },

        $_cancelDate(){
            this.show = false
        }
    }
}
</script>