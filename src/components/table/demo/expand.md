---
order: 10
---

#### 可展开行

```vue
<template>
    <Table
        :dataSource="tableData"
        :columns="columns"
        :expandOptions="expandOptions"
    />
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
                    render: h => {
                        return <a>详情</a>
                    },
                },
            ],
            tableData: [
                { id: 0, name: 'Jerry', age: 20 },
                { id: 1, name: 'Tom', age: 20 },
            ],
            expandOptions: {
                type: 'multiple',
                render: (h, { row, index }) => {
                    return <p>123</p>
                },
            },
        }
    },
    methods: {
        expandRender(h) {
            return <p>展开行内容</p>
        },
    },
}
</script>
```

可展开：支持折叠抽屉方式折叠和展示详情数据，默认展开操作触发为单元格内 icon

通过配置 `columns` 指定某一列 `type: 'expand'`
