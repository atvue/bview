#### 描述

下拉框组件

```vue
<template>
    <div>
        <Select 
            style="width: 120px;"
            placeholder="请选择..."
            v-model="value"
        >
            <Option :value="undefined">请选择..</Option>
            <Option value="value1">选项一</Option>
        </Select>
    </div>
</template>

<script>
import { Select } from 'bview'


const { Option } = Select

export default {
    components: { Select , Option } ,
    data(){
        return {
            value: undefined ,
        }
    } ,
    watch: {
        value( val , oldValue ) {
            console.log( val )
        }
    }
}
</script>
```