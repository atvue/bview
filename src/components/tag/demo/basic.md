---
order: 0
---

基本用法

```vue
<template>
    <div>
        <Tag>Tag1</Tag>
        <Tag><a href="https://163.com" target="_blank">163跳转链接</a></Tag>
        <Tag 
            closable
            @close="closeTag"
        >点击x关闭</Tag>
    </div>
</template>

<script>
import { Tag } from 'bview'

export default {
    components: { Tag } ,
    data(){
        return {

        }
    } ,
    methods: {
        closeTag( event ){
            // event.preventDefault()
            return new Promise( ( resolve , reject ) => {
                setTimeout( () => {
                    resolve()
                } , 1000 )
            } )
        }
    } ,
}
</script>
```