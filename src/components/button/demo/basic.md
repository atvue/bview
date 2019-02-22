+ 基本用法

```vue
<template>
    <div>
        <Button type="primary">主按钮</Button>
        <Button>次按钮</Button>
        <Button type="dashed">虚线按钮</Button>
        <Button type="danger">危险按钮</Button>
        <Button type="text">文字按钮</Button>
    </div>
</template>

<script>
import { Button } from 'bview'

export default {
    components: { Button } ,
}
</script>
```


1.目前按钮主要分为单个按钮和组合按钮，其中单个按钮包含：主按钮、次按钮、文字按钮；组合按钮为当按钮超过3个以上时，需要将多个按钮置于【更多】按钮中，鼠标hover或点击时下拉展开全部操作按钮；

2.加强对比时可以使用颜色按钮和线框按钮的形式