#### 基本用法

Dropdown组件放入一个触发器(必传)，之后添加overlay的slot下拉框即可

```vue
<template>
    <Dropdown>
        <span>Hover Me</span>
        <Menu slot="overlay">
            <MenuItem>
                <a target="_blank" href="http://www.163.com">网易邮箱</a>
            </MenuItem>
            <MenuItem>链接2...</MenuItem>
            <MenuItem>链接3...</MenuItem>
        </Menu>
    </Dropdown>
</template>

<script>
import { Dropdown , Menu } from 'bview'
const { MenuItem } = Menu

export default {
    components: { Dropdown , Menu , MenuItem } ,
}
</script>
```
