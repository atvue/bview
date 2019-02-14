基本用法

```vue
<template>
	<div>
		<TimePicker v-model="time1" />&nbsp;普通选择<br /><br />
		<TimePicker v-model="time2" timeType="hm" />&nbsp;选择小时和分钟<br /><br />
		<TimePicker v-model="time3" timeType="h" />&nbsp;选择小时<br /><br />
		<TimePicker v-model="time4" splitCode="/" />&nbsp;自定义分割符
	</div>
</template>

<script>
import { TimePicker } from 'bview'

export default {
    components: { TimePicker } ,
    data(){
        return {
            time1: '12:24:08' ,
            time2: '' ,
            time3: '' ,
            time4: '' 
        }
    }
}
</script>

```
支持时、分、秒组合选择，支持自定义分割符