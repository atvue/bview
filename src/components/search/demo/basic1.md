```vue
<template>
  <search 
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


