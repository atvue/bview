基本用法

```vue
<template>
    <div>
        <Tag>Tag1</Tag>
        <Tag><a href="https://163.com" target="_blank">跳转链接</a></Tag>
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
}
</script>

```