```vue
<template>
  <search 
    ref="search"
    :searchOptions="searchOptions" 
    :type = "type"
    :disabled = "disabled"
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
            type:'select',
            disabled:false
        }
    },
    mounted(){
        setTimeout(function(){
            this.$refs.search.reset();
        }.bind(this),5000)
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


