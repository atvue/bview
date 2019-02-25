---
order: 15
---

#### 可选中/多选

```vue
<template>
    <Table
        :dataSource="tableData"
        :columns="columns"
        :expandOptions="expandOptions"
        selectable
    />
</template>
<script>
import { Table } from 'bview'
export default {
    components: { Table },
    data() {
        return {
            columns: [
                { key: 'checkbox', type: 'checkbox' },
                { key: 'name', title: '名称' },
                { key: 'age', title: '年龄' },
                {
                    key: 'opr',
                    title: '操作',
                    render: h => {
                        return <a>详情</a>
                    },
                },
            ],
            tableData: [
                { id: 0, name: 'Jerry', age: 20 },
                { id: 1, name: 'Tom', age: 20 },
            ],
        }
    },
    methods: {},
}
</script>
```

可选中：支持折叠抽屉方式折叠和展示详情数据，默认展开操作触发为单元格内 icon

通过配置 `columns` 指定某一列 `type: 'checkbox'`
