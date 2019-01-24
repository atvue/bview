+ 禁用
```vue
<template>
    <section>
        <div class="example" >
            <Textarea
                placeholder="请输入"
                v-model="value"
                @blur="blur"
                @change="change"
                disabled
            />
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
禁用状态
