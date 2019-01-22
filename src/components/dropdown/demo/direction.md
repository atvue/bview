+ 弹出位置



```vue
<template>
    <div class="demo-dropdown">
        <Dropdown
            placement="bottomLeft"
        >
            <Button>bottomLeft</Button>
            <Menu slot="overlay">
                <MenuItem>
                    <a target="_blank" href="http://www.163.com">网易首页</a>
                </MenuItem>
                <MenuItem>菜单二</MenuItem>
                <MenuItem>菜单三</MenuItem>
            </Menu>
        </Dropdown>
        <Dropdown
            placement="bottomCenter"
        >
            <Button>bottomCenter</Button>
            <Menu slot="overlay">
                <MenuItem>
                    <a target="_blank" href="http://www.163.com">网易首页</a>
                </MenuItem>
                <MenuItem>菜单二</MenuItem>
                <MenuItem>菜单三</MenuItem>
            </Menu>
        </Dropdown>
        <Dropdown
            placement="bottomRight"
        >
            <Button>bottomRight</Button>
            <Menu slot="overlay">
                <MenuItem>
                    <a target="_blank" href="http://www.163.com">网易首页</a>
                </MenuItem>
                <MenuItem>菜单二</MenuItem>
                <MenuItem>菜单三</MenuItem>
            </Menu>
        </Dropdown>
        <Dropdown
            placement="topLeft"
        >
            <Button>topLeft</Button>
            <Menu slot="overlay">
                <MenuItem>
                    <a target="_blank" href="http://www.163.com">网易首页</a>
                </MenuItem>
                <MenuItem>菜单二</MenuItem>
                <MenuItem>菜单三</MenuItem>
            </Menu>
        </Dropdown>
        <Dropdown
            placement="topCenter"
        >
            <Button>topCenter</Button>
            <Menu slot="overlay">
                <MenuItem>
                    <a target="_blank" href="http://www.163.com">网易首页</a>
                </MenuItem>
                <MenuItem>菜单二</MenuItem>
                <MenuItem>菜单三</MenuItem>
            </Menu>
        </Dropdown>
        <Dropdown
            placement="topRight"
        >
            <Button>topRight</Button>
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
支持 6 个弹出位置。