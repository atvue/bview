---
order: 5
---

#### 自定义单元格内容

```vue
<template>
    <Table :dataSource="tableData" :columns="columns" />
</template>
<script>
import { Table } from 'bview'
export default {
    components: { Table },
    data() {
        return {
            columns: [
                { key: 'name', title: '名称' },
                { key: 'age', title: '年龄' },
                {
                    key: 'opr',
                    title: '操作',
                    render: (h, { text, data, index }) => {
                        return <a>操作</a>
                    },
                },
            ],
            tableData: [
                { id: 1, name: 'Jerry', age: 20 },
                { id: 2, name: 'Tom', age: 20 },
            ],
        }
    },
}
</script>
```

可定义：通过 `render` 函数自定义展示内容
