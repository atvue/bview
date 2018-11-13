
### 描述

按钮有四种类型：主按钮、次按钮。主按钮在同一个操作区域最多出现一次。

```vue
<template>
    <div>
        <Button type="primary">主要按钮</Button>
        <Button>次要按钮</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
    </div>
</template>

<script>
import { Button } from 'bview'

export default {
    components: { Button } ,
}
</script>
```