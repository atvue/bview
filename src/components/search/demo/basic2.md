```vue
<template>
  <search 
    ref="search"
    :toggleAble="toggleAble"
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
            disabled:false,
            toggleAble:true
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


