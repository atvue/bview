```vue
<template>
  <section>
    <div class="example">
      <span>test1:</span>
      <Textarea placeholder="请输入" v-model="value1" @blur="blur" @change="change" width="200px" height="50px" />
      </div>
       <div class="example">
      <span>test2:</span>
      <Textarea placeholder="请输入" v-model="value2" @blur="blur" @change="change"  autoResize  v-bind:maxlength="100"/>
      </div>
       <div class="example">
      <span>test3:</span>
      <Textarea placeholder="请输入" v-model="value3" @blur="blur" @change="change" disabled />
      </div>
       <div class="example">
      <span>test4:</span>
      <Textarea placeholder="请输入" v-model="value3" resize="vertical"/>
      </div>
  </section>
</template>
<script>
import Textarea from '@/components/Textarea';
export default {
    components: {
        Textarea
    },
    data() {
        return {
            value1: '',
            value2: '',
            value3: ''
        };
    },
    methods: {
        blur() {
            console.log('shijiao');
        },
        change() {
            console.log('change');
        }
    }
};
</script>
```