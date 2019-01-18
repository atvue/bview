#### 简化版本

简洁版本，此时 showTotal、showElevator、showSizer 配置项将失效

```vue
<template>
    <Pager
        :total="200"
        :current.sync="page"
        :pageSize="10"
        :pageSizeOpts="[10, 20, 30, 40, 50]"
        simple
    ></Pager>
</template>

<script>
import { Pager } from 'bview';

export default {
    components: { Pager },
    data() {
        return {
            page: 1
        };
    }
};
</script>
```
