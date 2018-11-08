<template>
    <div style="padding: 40px;">
        <h1>组件示例</h1>
        <div class="box">
            <div>
                <ul>
                    Button
                </ul>
            </div>
            <div>
                <basic />
                <demo />
            </div>
        </div>
    </div>
</template>

<script>
import basic , { demo } from '@/components/button/demo/basic.md'
import Button from '@/components/button/button.vue'

export default {
    components: { 
        basic ,
        Button ,
        demo ,
    } ,
    data() {
        return {
            modal: false,
            toast: false,
            selected: undefined
        }
    } ,
    mounted() {
        // debugger;
    }
};
</script>

<style type="less">
.box {
    display: flex ;
}
.box > div {
    margin-right: 10px ;
}
</style>
