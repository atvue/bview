<template>
    <div style="padding: 40px;">
        <h1>组件示例demo</h1>
        普通按钮：
        <section class="demo-button">
            <Button @click="modal=true">点击出弹框</Button>
            <Button type="default">default样式</Button>
            <Button type="black">black样式</Button>
        </section>
    </div>
</template>

<script>
import Button from '../src/components/button'

export default {
    components: { 
        Button 
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

<style scoped>
h1 {
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: bold;
}
section {
    padding: 20px 10px;
}
</style>
