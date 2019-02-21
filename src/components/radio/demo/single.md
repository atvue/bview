+ 单个radio的基本用法


```vue
<template>
    <div class="demo-radio">
        <Radio v-model="isOpen">选项一</Radio>
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

```
结合v-model一起使用，最简单的用法
