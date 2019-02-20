```vue
<template>
    <section>
        <div class="example">
            <span>可清空状态</span>
            <Input
                placeholder="请输入"
                v-model="value1"
                @blur="blur"
                @change="change"
                width="300px"
                clearable
                :nativeProps="mag"
            />
        </div>
        <div class="example" style="margin-top:20px;">
            <span>带search的输入框:</span>
            <Input
                placeholder="请输入"
                v-model="value3"
                @blur="blur"
                @change="change"
                search
                @search="search"
            />
        </div>
    </section>
</template>
<script>
import { Input } from 'bview';
export default {
    components: {
        Input
    },
    data() {
        return {
            value1: '',
            value2: '',
            mag: {
                msg: 'hello'
            }
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

开启属性 clearable 可显示清空按钮
