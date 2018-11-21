```vue
<template>
  <section>
    <div class="example">
      <span>test1:</span>
      <Input placeholder="请输入" v-model="value1" @blur="blur" @change="change" width="300px" />
    </div>
    <div class="example">
      <span>test2:</span>
      <Input placeholder="请输入" v-model="value2" @blur="blur" @change="change" clearable />
    </div>
    <div class="example">
      <span>test3:</span>
      <Input placeholder="请输入" v-model="value3" @blur="blur" @change="change" search @search="search" />
    </div>
    <div class="example">
      <span>test4:</span>
      <Input placeholder="请输入" v-model="value4" @focus="focus" prependIcon="icon-riqi" />
    </div>
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
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            value5: '',
            maxlength: 20
        };
    },
    methods: {
        blur() {
            console.log('shijiao');
        },
        change() {
            console.log('change');
        },
        search() {
            console.log('search');
        },
        focus() {
            console.log('focus');
        }
    }
};
</script>
```


