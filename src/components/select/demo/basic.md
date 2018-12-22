#### 描述

下拉框组件

```vue
<template>
    <div>
        <Select style="width: 120px;">
            <Option>请选择..</Option>
            <Option>选项一</Option>
        </Select>
    </div>
</template>

<script>
import { Select } from 'bview'


const { Option } = Select

export default {
    components: { Select , Option } ,
}
</script>
```