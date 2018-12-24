#### 单个checkbox的基本用法
结合v-model一起使用

```vue
<template>
    <div class="demo-radio">
        <Checkbox v-model="check">厨房</Checkbox>
        <p>value: {{ check }}</p>
    </div>
</template>

<script>
import { Checkbox } from 'bview'

export default {
    components: { Checkbox } ,
    data () {
        return {
            check: false
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