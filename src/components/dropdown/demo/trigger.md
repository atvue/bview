+ 触发方式



```vue
<template>
    <div class="demo-dropdown">
        <Dropdown
            trigger="click"
        >
            <Button>点我触发</Button>
            <Menu slot="overlay">
                <MenuItem>
                    <a target="_blank" href="http://www.163.com">网易首页</a>
                </MenuItem>
                <MenuItem>菜单二</MenuItem>
                <MenuItem>菜单三</MenuItem>
            </Menu>
        </Dropdown>
        <Dropdown
            trigger="contextmenu"
        >
            <Button>右键触发</Button>
            <Menu slot="overlay">
                <MenuItem>
                    <a target="_blank" href="http://www.163.com">网易首页</a>
                </MenuItem>
                <MenuItem>菜单二</MenuItem>
                <MenuItem>菜单三</MenuItem>
            </Menu>
        </Dropdown>
    </div>
</template>

<script>
import { Dropdown , Menu , Button } from 'bview'
const { MenuItem } = Menu

export default {
    components: { Dropdown , Menu , MenuItem , Button } ,
}
</script>

<style type="less">
.demo-dropdown {
    background: #f00 ;
}
</style>
```
默认是移入触发菜单，可以点击或者右键触发。
