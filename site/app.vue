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
                <basicMd />
            </div>
        </div>
    </div>
</template>

<script>
import basicMd from '@/components/button/demo/basic.md'

export default {
    components: {
        basicMd ,
    }
}
</script>

<style type="less">
.box {
    display: flex ;
}
.box > div {
    margin-right: 30px ;
}
</style>
