#### 描述

下拉框组件

```vue
<template>
    <div>
        <Dropdown>
            <span>Hover Me</span>
            <div slot="overlay">
                <ul>
                    <li>菜单</li>
                    <li>菜单</li>
                    <li>菜单</li>
                </ul>
            </div>
        </Dropdown>
    </div>
</template>

<script>
import { Dropdown } from 'bview'

export default {
    components: { Dropdown } ,
}
</script>
```