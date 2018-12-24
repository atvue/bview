#### 基本用法

```vue
<template>
    <div class="demo-button">
        <Button type="primary">primary样式</Button>
        <Button type="main">main样式</Button>
        <Button type="text">text样式</Button>
        <Button :showSlot="showSlot">noslot</Button>
    </div>
</template>

<script>
import { Button } from 'bview'

export default {
    components: { Button } ,
    data () {
        return {
            showSlot: true
        }
    }
}
</script>

<style type="less">
.demo-button {
    background: #f00 ;
}
</style>
```