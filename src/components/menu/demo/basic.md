#### 描述

下拉框组件

```vue
<template>
    <div>
        <Menu>
            <MenuItem>菜单1</MenuItem>
            <MenuItem>菜单2</MenuItem>
            <MenuItem>菜单3</MenuItem>
            <MenuItem>菜单4</MenuItem>
        </Menu>
    </div>
</template>

<script>
import { Menu } from 'bview'
const { MenuItem } = Menu

export default {
    components: { Menu , MenuItem } ,
}
</script>
```