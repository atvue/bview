---
order: 1
---

#### 基本使用

```vue
<template>
    <Table :dataSource="dataSource" :columns="columns" rowKey="name" />
</template>
<script>
import { Table } from 'bview'
export default {
    components: { Table },
    data() {
        return {
            columns: [
                { key: 'name', title: '名称' },
                { key: 'age', title: '年龄', className: '', style: '' },
            ],
            dataSource: [
                { id: 1, name: 'Jerry', age: 20 },
                { id: 2, name: 'Tom', age: 20 },
            ],
        }
    },
}
</script>
```

传入 `columns` 和 `dataSource` 属性，即可获得表格最基础展示
