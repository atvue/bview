#### 菜单隐藏方式

默认点击菜单关闭菜单，可以关闭此功能

```vue
<template>
    <div class="demo-dropdown">
        <Dropdown
            v-model="visible"
        >
            <span
                @click="visible=!visible"
            >Hover Me</span>
            <Menu slot="overlay">
                <MenuItem>
                    <a target="_blank" href="http://www.163.com">网易邮箱</a>
                </MenuItem>
                <MenuItem>链接2...</MenuItem>
                <MenuItem>
                    <span @click="visible=false">链接3...</span>
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
