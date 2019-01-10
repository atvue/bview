`showSearch`展示搜索

```vue
<template>
    <Select 
        style="width: 140px;"
        placeholder="请选择学历"
        v-model="value"
        showSearch
    >
        <Option value="primary">小学</Option>
        <Option value="junior" disabled>初中</Option>
        <Option v-if="visibleSenior" value="senior">高中</Option>
        <Option value="university">大学</Option>
    </Select>
</template>

<script>
import { Select } from 'bview'
const { Option } = Select

export default {
    components: { Select , Option } ,
    data(){
        return {
            value: undefined ,
            visibleSenior: true ,
        }
    } ,
    watch: {
        value( val , oldValue ) {
            console.log( val )
        }
    } ,
    mounted(){
        setTimeout( () => {
            this.visibleSenior = false
            console.log( 'remove' , '高中' )
        } , 1000 )
    }
}
</script>
```