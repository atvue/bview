```vue
<template>
  <search 
    ref="search"
    :disabled = "disabled"
    :hasIcon = "hasIcon"
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
            disabled:false,
            hasIcon:true
        }
    },
    methods: {
        doSearch(value){
            console.log('doSearch' + value);
        }
    }
};
</script>
```


