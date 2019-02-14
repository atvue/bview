<template>
    <div :class="`${b}-date`">
        <div :class="`${b}-date-tool`">
            <!--pre year-->
            <i 
                onselectstart="return false;" 
                :class="$_getYearSelectClass(1)"
                @click="$_ctrl($event,1)" 
            >
                &lt;&lt;
            </i>

            <!--pre month-->
            <i 
                onselectstart="return false;" 
                :class="cDate.month==1?`${b}-date-disabled`:''"
                @click="$_ctrl($event,2)" 
            >
                &lt;
            </i>

            <!--yearSelect-->
            <div class="bview-date-s-box">
                <input 
                    :class="`${b}-date-s-input`" 
                    :value="cDate.year + '年'" 
                    @focus="$_yearSelectFocus" 
                    @blur="$_yearSelectBlur"
                >
                <ul 
                    v-show="showYearSelect"
                    :class="`${b}-date-s-list`"
                >
                    <li 
                        v-for="item in yearList" 
                        :key="item"
                        :class="cDate.year==item?`${b}-date-active`:''"
                        @click="$_selectYear(item)" 
                    >
                        {{ item }}
                    </li>
                </ul>
            </div>

            <!--monthSelect-->
            <div :class="`${b}-date-s-box`">
                <input 
                    :class="`${b}-date-s-input`" 
                    :value="$_addZero(cDate.month) + '月'" 
                    @focus="$_monthSelectFocus" 
                    @blur="$_monthSelectBlur"
                >
                <ul 
                    v-show="showMonthSelect"
                    :class="`${b}-date-s-list`"
                >
                    <li 
                        v-for="item in monthList" 
                        :key="item"
                        :class="cDate.month==item?`${b}-date-active`:''"
                        @click="$_selectMonth(item)" 
                    >
                        {{ $_addZero(item) }}
                    </li>
                </ul>
            </div>

            <!--next month-->
            <i 
                onselectstart="return false;" 
                :class="cDate.month==12?`${b}-date-disabled`:''"
                @click="$_ctrl($event,3)" 
            >
                &gt;
            </i>

            <!--next year-->
            <i 
                onselectstart="return false;" 
                :class="$_getYearSelectClass(2)"
                @click="$_ctrl($event,4)" 
            >
                &gt;&gt;
            </i>
        </div>
        <!--daySelect-->
        <div 
            v-show="showDay"
            :class="`${b}-date-day-box`" 
        >
            <table v-if="dayList.length > 0">
                <tr>
                    <th 
                        v-for="item in weekStrList"
                        :key="item"
                    >
                        {{ item }}
                    </th>
                </tr>
                <tr 
                    v-for="n in 6"
                    :key="n"
                >
                    <td 
                        v-for="k in 7" 
                        :key="k"
                        :class="$_getDayItem(k,n).class" 
                        @click="$_selectDay($_getDayItem(k,n))"
                    >
                        {{ $_getDayItem(k,n).day }}
                    </td>
                </tr>
            </table>
        </div>

        <!--time-->
        <div 
            v-show="!showDay" 
            v-if="type=='time'"
        >
            <Time
                ref="ctime"
                :time-type="timeType"
                @select="$_selectTime"
            />
        </div>

        <!--date-ctrl-->
        <div 
            v-if="trigger==='button'||type==='time'"
            :class="`${b}-date-ctrl-box`"
        >
            <div :class="`${b}-date-ctrl-box-nei`">
                <span 
                    v-if="type=='time'"
                    :class="`${b}-date-select-time-btn`+(cDate.day?'':` ${b}-date-st-disabled`)" 
                    @click="$_switchPanel" 
                >
                    <template 
                        v-if="showDay"
                    >
                        选择时间
                    </template>
                    <template v-else>
                        选择日期
                    </template>
                </span>
                &nbsp;
                <span :class="`${b}-date-ctrl-r`">
                    <button @click="$_cancel">
                        取消
                    </button>
                    <button @click="$_sure">
                        确定
                    </button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import Time from '../timepicker/time'
import { bviewPrefix as b } from "../../utils/macro"

//当前日期
const tyear = new Date().getFullYear()
const tmonth = new Date().getMonth() + 1
const tday = new Date().getDate()

export default {
    'name':"date",
    components:{
        Time
    },
    props: {
        //@doc 类型，time表示有时间选择
        type:{
            type:String,
            default:''
        },
        //@doc 时间类型，hms组合
        timeType:{
            type:String,
            default:'hms'
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
        }
    },

    data(){
        return {
            b ,
            yearList:this.$_getYearList(),
            showYearSelect:false,
            year:'',
            monthList:this.$_getMonthList(),
            showMonthSelect:false,
            month:'',
            dayList:'',
            day:'',
            time:'',
            cDate:{day:''},
            selectDate:{},
            emitDate:{},
            preSelectDay:null,
            showDay:true,
            emptyTime:[],
            weekStrList:['日','一','二','三','四','五','六']
        }
    },

    mounted(){
        if(this.type === 'time'){
            this.emptyTime = this.$_getEmptyTime()
        }
    },

    methods:{
        //@doc 初始化日期、时间
        initDate(date){
            this.showDay = true

            //有年份范围的
            if(this.yearRange){
                let s = this.yearRange.split(',')
                let s0 = Number(s[0])
                let s1 = Number(s[1])
                if(tyear < s0){this.cDate.year = s0}
                if(tyear > s1){this.cDate.year = s1}
            }else{
                this.cDate.year = date.year || tyear
            }

            //设置时间
            this.cDate.month = Number(date.month) || tmonth
            this.cDate.day = Number(date.day) || 0
            this.selectDate = Object.assign({},this.cDate)
            this.$_setDate()
            if(this.type === 'time'){
                this.time = date.time || this.emptyTime
            }
        },

        //对数字小于10的进行补零
        $_addZero(n){
            if(n < 10){return '0' + n}
            return n + ''
        },

        //获取年份选择列表
        $_getYearList(){
            var start,end
            //对有年范围的进行处理
            if(this.yearRange){
                var s = this.yearRange.split(',')
                start = Number(s[0])
                end = Number(s[1])
            }else{
                start = tyear - 10
                end = tyear + 10
            }

            let list = []
            for(var i = start; i < end + 1; i ++){
                list.push(i)
            }
            this.yearList = list
            return list
        },

        $_getYearSelectClass(n){
            let start = Number(this.yearList[0])
            let end = Number(this.yearList[this.yearList.length - 1])
            let year = Number(this.cDate.year)
            if(n === 1 && year === start){
                return `${b}-date-disabled`
            }
            if(n === 2 && year === end){
                return `${b}-date-disabled`
            }
        },

        $_yearSelectFocus(){
            this.showYearSelect = true
        },

        $_yearSelectBlur(){
            setTimeout(()=>{
                this.showYearSelect = false
            },200)       
        },

        //选择年份
        $_selectYear(item){
            this.cDate.year = item
            this.showYearSelect = false
            this.$_setDate()
        },

        //获取月份选择列表
        $_getMonthList(){
            let list = []
            for(var i = 1; i < 13; i ++){
                list.push(i)
            }
            return list
        },

        $_monthSelectFocus(){
            this.showMonthSelect = true
        },

        $_monthSelectBlur(){
            setTimeout(()=>{
                this.showMonthSelect = false
            },200)       
        },

        //选择月份
        $_selectMonth(item){
            this.cDate.month = item
            this.showMonthSelect = false
            this.$_setDate()

        },

        //年月加减
        $_ctrl(event,t){
            let className = event.target.className
            if(className.indexOf('disabled') !== -1){
                return
            }
            var  y = Number(this.cDate.year)
            var  m = Number(this.cDate.month)
            switch(t){
            case 1:
                this.cDate.year = y - 1
                break;
            case 2:
                this.cDate.month = m - 1
                break;
            case 3:
                this.cDate.month = m + 1
                break;
            case 4:
                this.cDate.year = y + 1 
                break;
            }
            this.$_setDate()
        },

        $_setDate(){
            this.preSelectDay = null

            let date = Object.assign({},this.cDate)

            let year = Number(date.year)
            let month = Number(date.month)

            this.dayList = []
            let days = new Date(year,month,0).getDate();  //当前月总天数  
            let week = new Date(year,month - 1,0).getDay() + 1;  //得到1号是星期几  

            let pYear,pMonth,nYear,nMonth

            if(month == 12){
                pYear = year
                pMonth = 11
                nYear = year + 1
                nMonth = 1
            }else if(month == 1){
                pYear = year - 1
                pMonth = 12
                nYear = year
                nMonth = month + 1
            }else{
                pYear = year
                pMonth = month - 1
                nYear = year
                nMonth = month + 1
            }
          
            var pDay = new Date(pYear,pMonth,0).getDate(); //上个月的总天数 

            if(this.startTime){     
                var startTime = new Date(this.startTime).getTime()             
            } 
            if(this.endTime){     
                var endTime = new Date(this.endTime).getTime() 
            }    

            for(var i = 0 ; i < 42; i ++){
                var fn = i - week + 1;
                var time = {}

                //上月、当前月、下月
                if(i < week){
                    time = {
                        day: pDay + fn,
                        year: pYear,                
                        month: pMonth,
                        class:`${b}-date-pday`
                    }              
                }else if(i > week - 1 && i < days + week){
                    time = {
                        day: i - week + 1,
                        year: year,
                        month: month,
                        class: `${b}-date-tday`
                    } 
                }else{
                    time = {
                        day: i - (week + days) + 1,
                        year: nYear,
                        month: nMonth,
                        class: `${b}-date-nday`
                    }
                }

                //时间范围设置
                if(this.startTime || this.endTime){ 
                    
                    var m = this.$_addZero(time.month)
                    var d = this.$_addZero(time.day)           
                    var t = [time.year,m,d].join('/')
                    var n = new Date(t).getTime()
                    var disabled = false

                    if(this.startTime && n < startTime){
                        disabled = true
                    }
                    if(this.endTime && n > endTime){
                        disabled = true
                    }
                    if(disabled){
                        time.class += ` ${b}-date-d-disabled`
                        time.disabled = true
                    }
                }

                //今天
                if(time.year == tyear && time.month == tmonth && time.day == tday){ 
                    time.class += ` ${b}-date-today`      
                }

                //上次的选择
                if(time.year == this.selectDate.year && time.month == this.selectDate.month && time.day == this.selectDate.day){ 
                    time.class += ` ${b}-date-cday`
                    this.preSelectDay = time         
                }

                this.dayList.push(time)
            }
        },

        $_getDayItem(k,n){
            return this.dayList[k + ((n - 1) * 7) - 1]
        },

        $_selectDay(date){
            if(date.disabled || this.day == date.day){return}
            if(this.preSelectDay){
                this.preSelectDay.class = this.preSelectDay.class.replace(/ *cday/,'')
            }
            this.preSelectDay = date
            date.class += ` ${b}-date-cday`
            this.cDate.day = date.day
            this.selectDate = Object.assign({},this.cDate)
            if(this.type !== 'time' && this.trigger === 'click'){
                this.$_sure()
            }
            
        },

        $_switchPanel(){
            if(!this.cDate.day){return}
            this.showDay = !this.showDay
            if(!this.showDay){
                this.$refs.ctime.setTime(this.time)
            }
        },

        $_selectTime(v){
            this.time = v
        },

        $_getEmptyTime(){
            let t = []
            for(var i = 0 ; i < this.timeType.length; i ++){
                t.push('00')
            }
            return t
        },

        $_sure(){
            let s = this.selectDate
            if(!this.selectDate.day){
                this.$_cancel()
                return
            }
            this.emitDate = {
                year:  s.year,
                month: this.$_addZero(s.month),
                day:   this.$_addZero(s.day)
            }

            if(this.type === 'time'){
                this.emitDate.time = this.time || this.emptyTime
            }
            //@doc 选择时（时间）
            this.$emit('select',this.emitDate)
        },

        $_cancel(){
            //@doc 取消选择（时间）
            this.$emit('cancel')
        }
    }
}

</script>