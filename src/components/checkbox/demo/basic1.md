
#### 单选按钮组的用法CheckboxGroup

```vue
<template>
    <div>
        <CheckboxGroup v-model="list">
            <Checkbox value="1">
                1111
            </Checkbox>
            <Checkbox value="2">
                2222
            </Checkbox>
            <Checkbox value="3">
                3333
            </Checkbox>
        </CheckboxGroup>
        <p class="p-pad">checklistValue: {{list}}</p>
        <h6>垂直使用</h6>
        <CheckboxGroup v-model="list" vertical>
            <Checkbox value="1">
                1111
            </Checkbox>
            <Checkbox value="2" disabled>
                2222
            </Checkbox>
            <Checkbox value="3">
                3333
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