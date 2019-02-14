基本用法

```vue
<template>
	<div>
        <DatePicker /> 默认日期选择<br /><br />
        <DatePicker type="time" v-model="time1" /> 带时间选择<br /><br />
        <DatePicker start-time="2019/02/12"  end-time="2019/03/18" /> 日期范围(2019/02/12 - 2019/03/18)<br /><br />
        <DatePicker year-range="2012,2016" /> 年范围(2012-2016)<br /><br />
		<DatePicker split-code="-" /> 日期格式分割符‘ - ’<br /><br />
        <DatePicker trigger="button" /> 要点击确定按钮选择日期
	</div>
</template>

<script>
import { DatePicker } from 'bview'

export default {
    components: { DatePicker } ,
    data(){
        return {
            time1: '' ,
            time2: '' ,
            time3: '' ,
            time4: '' ,
            time5: '' 
        }
    }
}
</script>

```
