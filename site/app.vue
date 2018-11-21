<template>
    <div style="padding: 10px;">
        <h1>组件库</h1>
        <div style="display:flex">
            <!-- 随便生成的菜单 待替换 -->
            <div style="width: 160px;margin-top:20px;flex:0 0 160px;">
                <div v-for="r in routerData" :key="r.meta.name">
                    <router-link :to="r.path" :key="r.meta.name">{{r.meta.name}}</router-link>
                    <div v-show="r.children&&r.children.length>0">
                        <div v-for="c in r.children" :key="c.meta.name" style="padding-left:10px;">
                            <router-link :to="r.path+'/'+c.path">{{c.meta.name}}</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END 随便生成的菜单 待替换 -->
            <!-- 文档内容 -->
            <router-view></router-view>
            <!-- END 文档内容 -->
        </div>
    </div>
</template>

<script>
import './common.css';
import '../src/style.less';

export default {
    computed: {
        routerData() {
            return this.$router.options.routes;
        }
    }
};
</script>

