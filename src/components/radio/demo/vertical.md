+ 垂直居中样式

```vue
<template>
    <div>
        <RadioGroup v-model="sun" vertical>
            <Radio value="1">选项一</Radio>
            <Radio value="2">选项二</Radio>
            <Radio value="3" disabled>选项三</Radio>
        </RadioGroup>
    </div>
</template>

<script>
import { Radio } from 'bview'

const { RadioGroup } = Radio

export default {
    components: { 
        Radio ,
        RadioGroup
    } ,
    data () {
        return {
            sun: "1"
        }
    }
}
</script>
```
垂直的 RadioGroup，配合更多输入框选项。