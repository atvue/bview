#### 单个radio的基本用法
结合v-model一起使用

```vue
<template>
    <div class="demo-radio">
        <Radio v-model="isOpen">one</Radio>
        <p>value: {{ isOpen }}</p>
    </div>
</template>

<script>
import { Radio } from 'bview'

export default {
    components: { Radio } ,
    data () {
        return {
            isOpen: false
        }
    }
}
</script>

<style type="less">
.demo-radio {
    background: #f00 ;
}
</style>
```
