+ 菜单隐藏方式



```vue
<template>
    <div class="demo-dropdown">
        <Dropdown
            v-model="visible"
        >
            <span
                @click="visible=!visible"
            >Click Me</span>
            <Menu slot="overlay">
                <MenuItem>
                    <a target="_blank" href="http://www.163.com">网易首页</a>
                </MenuItem>
                <MenuItem>点击会关闭失败</MenuItem>
                <MenuItem>
                    <span @click="visible=false">点我才关闭</span>
                </MenuItem>
            </Menu>
        </Dropdown>
    </div>
</template>

<script>
import { Dropdown , Menu , Button } from 'bview'
const { MenuItem } = Menu

export default {
    components: { Dropdown , Menu , MenuItem , Button } ,
    data(){
        return {
            visible: false ,
        }
    }
}
</script>

<style type="less">
.demo-dropdown {
    background: #f00 ;
}
</style>
```
默认点击菜单关闭菜单，可以关闭此功能
