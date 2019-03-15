```vue
<template>
  <section>
    <div class="example">
      <span>禁用状态:</span>
      <Input placeholder="请输入" v-model="value5" @focus="focus" type="password" clearable>
      </Input>
    </div>
  </section>

</template>
<script>
import { Input } from 'bview'
export default {
    components: {
        Input
    },
    data() {
        return {
            value4: '',
            maxlength: 20,
        };
    },
    methods: {
        focus() {
            console.log('focus');
        }
    }
};
</script>
```

通过添加 disabled 属性可设置为不可用状态。
