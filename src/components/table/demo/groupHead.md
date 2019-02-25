---
order: 20
---

#### 表头分组

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
                { key: 'name', title: '姓名' },
                {
                    title: '其他',
                    children: [
                        {
                            key: 'pensonal',
                            title: '个人',

                            children: [
                                { key: 'age', title: '年龄' },
                                {
                                    key: 'type',
                                    title: '品种',
                                },
                            ],
                        },
                        { key: 'social', title: '社群' },
                    ],
                },
                {
                    id: 3,
                    key: 'opr',
                    title: '操作',
                    render: h => {
                        return <a>详情</a>
                    },
                },
            ],
            tableData: [
                {
                    id: 0,
                    name: 'Jerry',
                    age: 20,
                    type: '老鼠',
                    social: '吱吱吱',
                },
                { id: 1, name: 'Tom', age: 20, type: '猫', social: '喵喵喵' },
            ],
        }
    },
    methods: {},
}
</script>
```

`columns[n]` 可以内嵌 `children` ，以渲染分组表头
