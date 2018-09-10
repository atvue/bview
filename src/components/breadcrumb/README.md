### 面包屑

```vue
<template>	
    <BreadCrumb separator=">">
        <BreadCrumbItem><a href="/" target="_blank">首页</a></BreadCrumbItem>
        <BreadCrumbItem to="/abc">IDC管理</BreadCrumbItem>
        <BreadCrumbItem>服务器管理</BreadCrumbItem>
    </BreadCrumb>
</template>

<script>
import BreadCrumb from '@/components/breadcrumb' ;
const { Item: BreadCrumbItem } = BreadCrumb ;

export default {  
    components: {
        BreadCrumb ,
        BreadCrumbItem ,
    }
}
</script>
```

##### BreadCrumb

| 属性        | 描述                         | 默认值  |
| --------- | -------------------------- | ---- |
| separator | 分隔符， String \| html String | /    |

##### BreadCrumbItem

| 属性   | 描述                      | 默认值  |
| ---- | ----------------------- | ---- |
| to   | 结合vue-router使用， 跳转链接，可选 | -    |

