```vue
<template>
  <search 
    ref="search"
    :disabled = "disabled"
    @search="doSearch" >
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
            disabled:false
        }
    },
    mounted(){
        setTimeout(function(){
            this.$refs.search.reset();
        }.bind(this),5000)
    },
    methods: {
        doSearch(value){
            console.log('doSearch' + value);
        }
    }
};
</script>
```


