+ 基本用法

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


1.目前按钮主要分为单个按钮和组合按钮，其中单个按钮包含：主按钮、次按钮、危险按钮、虚线按钮、幽灵按钮；组合按钮为当按钮超过3个以上时，需要将多个按钮置于【更多】按钮中，鼠标hover或点击时下拉展开全部操作按钮；

2.加强对比时可以使用颜色按钮和线框按钮的形式