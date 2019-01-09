
使用options替代Option组件

```vue
<template>
    <Select 
        style="width: 140px;"
        placeholder="请选择学历"
        v-model="value"
        :options="options"
    />
</template>

<script>
import { Select } from 'bview'
const { Option } = Select

export default {
    components: { Select , Option } ,
    data(){
        return {
            value: undefined ,
            options: [
                { value: 'primary' , label: '小学' } ,
                { value: 'junior' , label: '初中' , disabled: true } ,
                { value: 'senior' , label: '高中' } ,
                { value: 'university' , label: '大学' } ,
            ] ,
        }
    } ,
    watch: {
        value( val , oldValue ) {
            console.log( val )
        }
    }
}
</script>
```