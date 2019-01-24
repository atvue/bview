

```vue
<template>
    <section>
        <div class="example" style="margin-top:20px;">
            <Textarea placeholder="请输入" v-model="value3" resize="vertical" />
        </div>
    </section>
</template>
<script>
import {Textarea} from 'bview';
export default {
    components: {
        Textarea
    },
    data() {
        return {
            value:''
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
调整输入框尺寸
