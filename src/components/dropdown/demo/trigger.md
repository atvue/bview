#### 触发方式

默认是移入触发菜单，可以点击触发。

```vue
<template>
    <div class="demo-dropdown">
        <Dropdown
            trigger="click"
        >
            <span>Hover Me</span>
            <div slot="overlay">
                <Menu>
                    <MenuItem>
                        <a target="_blank" href="http://www.163.com">网易邮箱</a>
                    </MenuItem>
                    <MenuItem>链接2...</MenuItem>
                    <MenuItem>链接3...</MenuItem>
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
