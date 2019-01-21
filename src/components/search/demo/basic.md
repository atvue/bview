```vue
<template>
  <search 
    :searchOptions="searchOptions" 
    :type = "type"
    @search="doSearch" 
    @change="searchValueChange">
  </search>

</template>
<script>
import { Search } from 'bview'
export default {
    components: {
        Search
    },
    data() {
        return {
            searchOptions:[],
            type:'select'
        }
    },
    methods: {
        searchValueChange(value){
            console.log('createOptions' + value);
            this.sto = clearTimeout(this.sto);
            this.sto = setTimeout(()=>{
                let list = [];
                if (value){
                    for (let i = 0,item;i<4;i++){
                        item = value+'-'+i;
                        list.push({
                            value:item,
                            label:item
                        });
                    }
                    this.searchOptions = list.concat();
                }
            },500)
        },
        doSearch(value){
            console.log('doSearch' + value);
        }
    }
};
</script>
```


