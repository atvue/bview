
+ 按钮组合

```vue
<template>
    <div>
        <CheckboxGroup v-model="list">
            <Checkbox value="1">
                选项一
            </Checkbox>
            <Checkbox value="2">
                选项二
            </Checkbox>
            <Checkbox value="3">
                选项三
            </Checkbox>
        </CheckboxGroup>
    </div>
</template>

<script>
import { Checkbox } from 'bview'

const { CheckboxGroup } = Checkbox

export default {
    components: { 
        Checkbox ,
        CheckboxGroup
    } ,
    data () {
        return {
            list: [],
        }
    }
}
</script>
```