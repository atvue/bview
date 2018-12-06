#### 描述

下拉框组件

```vue
<template>
    <div class="demo-dropdown">
        <Dropdown>
            <span>Hover Me</span>
            <div slot="overlay">
                <Menu>
                    <MenuItem>链接1</MenuItem>
                    <MenuItem>链接2</MenuItem>
                    <MenuItem>链接3</MenuItem>
                </Menu>
            </div>
        </Dropdown>
    </div>
</template>

<script>
import { Dropdown , Menu } from 'bview'
const { MenuItem } = Menu

export default {
    components: { Dropdown , Menu , MenuItem } ,
}
</script>

<style type="less">
.demo-dropdown {
    background: #f00 ;
}
</style>
```