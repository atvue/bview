<template>
    <div style="padding: 40px;">
        <h1>组件示例demo</h1>
        面包屑步骤：
        <section class="demo-breadcrum">
            <!-- <Breadcrumb>
                <BreadcrumbItem>
                    testFather
                </BreadcrumbItem>
                <BreadcrumbItem>
                    testSon
                </BreadcrumbItem>
            </Breadcrumb> -->
        </section>
        分页器：
        <section class="demo-pager">
            <!-- <Pager :total="100"></Pager> -->
        </section>
        普通按钮：
        <section class="demo-button">
            <Button @click="modal=true">点击出弹框</Button>
            <Button type="default">default样式</Button>
            <Button type="black">black样式</Button>
        </section>
        <!-- <section class="demo-modal"> -->
        <!-- <Modal v-model="modal" title="弹框标题">
            我是一个弹框
        </Modal> -->
        <!-- </section> -->
        link样式按钮：
        <section class="demo-linkbutton">
            <!-- <LinkButton @click="$toast.success('成功toast')">点击successtoast</LinkButton>
            <LinkButton @click="$toast.fail('失败toast')">点击errortoast</LinkButton>
            <LinkButton @click="$toast.info('提示toast')">点击infotoast</LinkButton>
            <LinkButton type="default">default样式</LinkButton> -->
        </section>
        下拉选框：
        <section class="demo-select">
            <!-- <Select v-model="selected">
                <Option :value="1">1</Option>
                <Option :value="2">2</Option>
                <Option :value="3">3</Option>
            </Select> -->
        </section>
    </div>
</template>

<script>
import { Button } from '../lib/components/button';

// var Button = require('../lib/components/button/button.js').default;
// debugger;

export default {
    components: { Button },
    data() {
        return {
            modal: false,
            toast: false,
            selected: undefined
        };
    },
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
