---
order: 25
---

#### 可筛选

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
                    title: '品种',
                    key: 'type',
                    filters: ['猫', '老鼠'],
                    filterMethod: (val, row) => {
                        return val.indexOf(row.type) !== -1
                    },
                    filterable: true,
                },
                {
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
