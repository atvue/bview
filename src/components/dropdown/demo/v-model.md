#### 受控v-model

下拉框的展示与不展示受控

```vue
<template>
    <div class="demo-dropdown">
        <Dropdown
            v-model="visible"
        >
            Hover Me
            <Menu slot="overlay">
                <MenuItem>
                    <a target="_blank" href="http://www.163.com">网易邮箱</a>
                </MenuItem>
                <MenuItem>链接2...</MenuItem>
                <MenuItem>链接3...</MenuItem>
            </Menu>
        </Dropdown>
        <Button
                @click="visible = !visible"
            >点我展示toggle</Button>
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
