#### 6个方向例子

```vue
<template>
    <div class="demo-dropdown">
        <Dropdown
            placement="bottomLeft"
        >
            <Button>bottomLeft</Button>
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
        <Dropdown
            placement="bottomCenter"
        >
            <Button>bottomCenter</Button>
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
        <Dropdown
            placement="bottomRight"
        >
            <Button>bottomRight</Button>
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
        <Dropdown
            placement="topLeft"
        >
            <Button>topLeft</Button>
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
        <Dropdown
            placement="topCenter"
        >
            <Button>topCenter</Button>
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
        <Dropdown
            placement="topRight"
        >
            <Button>topRight</Button>
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