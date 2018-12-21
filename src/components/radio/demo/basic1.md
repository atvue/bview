
#### 单选按钮组的用法RadioGroup

```vue
<template>
    <div>
        <RadioGroup v-model="sun">
            <Radio value="1">hello</Radio>
            <Radio value="2">hi</Radio>
            <Radio value="3" disabled>disabled</Radio>
        </RadioGroup>
        <p>value: {{sun}}</p>
        <h6>垂直使用</h6>
        <RadioGroup v-model="sun" vertical>
            <Radio value="1">hello</Radio>
            <Radio value="2">hi</Radio>
            <Radio value="3" disabled>disabled</Radio>
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