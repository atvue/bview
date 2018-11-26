```vue
<template>
  <section>
    <div class="example">
      <span>test5:</span>
      <Input placeholder="请输入" v-model="value5" @focus="focus">
             <i slot="append" class="iconfont icon-riqi"></i>
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
            maxlength: 20
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


