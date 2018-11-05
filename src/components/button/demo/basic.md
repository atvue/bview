---
order: 0
title: 按钮类型
---

## 描述

按钮有四种类型：主按钮、次按钮。主按钮在同一个操作区域最多出现一次。

```vue
<tempalte>
    <div>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
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