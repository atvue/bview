
+ 单选组合

```vue
<template>
    <div>
        <RadioGroup v-model="sun">
            <Radio value="1">选项一</Radio>
            <Radio value="2">选项二</Radio>
            <Radio value="3">选项三</Radio>
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

一组互斥的 Radio 配合使用。