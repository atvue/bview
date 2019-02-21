
+ 单个checkbox 

```vue
<template>
    <div class="demo-radio">
        <Checkbox v-model="check">厨房</Checkbox>
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

```
结合v-model一起使用