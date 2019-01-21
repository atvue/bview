#### 基本用法

```vue
<template>
    <Pager
        :total="200"
        :pageSize="10"
        :pageSizeOpts="[10, 20, 30, 40, 50]"
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

显示总页数、数据条数详情，页码导航（支持省略），分页切换，输入页码快速跳转
