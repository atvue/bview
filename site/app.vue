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
            </div>
        </div>
    </div>
</template>

<script>
import basic from '@/components/button/demo/basic.md'


export default {
    components: { 
        basic ,
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
</style>
