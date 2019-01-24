+ 可显示数目，限制输入字符数
```vue
<template>
    <section>
        <div>
            <Textarea
                placeholder="请输入"
                v-model="value2"
                @blur="blur"
                @change="change"
                autoResize
                v-bind:maxlength="100"
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
输入框自动计数
