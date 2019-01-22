+ 基本用法



```vue
<template>
    <Dropdown>
        <span>Hover Me</span>
        <Menu slot="overlay">
            <MenuItem>
                <a target="_blank" href="http://www.163.com">网易首页</a>
            </MenuItem>
            <MenuItem>菜单二</MenuItem>
            <MenuItem>菜单三</MenuItem>
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
Dropdown组件放入一个触发器(必传)，之后添加overlay的slot下拉框即可
