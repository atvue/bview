禁用`disabled`

```vue
<template>
    <div>
        <Tag>语文</Tag>
        <Tag disabled>英语</Tag>
        <Tag>数学</Tag>
    </div>
</template>


<script>
import { Tag } from 'bview'


export default {
    components: { Tag } ,
}
</script>

```