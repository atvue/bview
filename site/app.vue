<template>
    <div class="wrapper">
        <div class="home-header">
            <h1>组件库</h1>
        </div>
        <div style="display:flex">
            <!-- 随便生成的菜单 待替换 -->
            <div style="width: 160px;margin-top:20px;flex:0 0 160px;">
                <div 
                    v-for="(r,i) in routerData" 
                    :key="getMetaName(r,i)"
                >
                    <RouterLink :to="r.path">
                        {{ getMetaName(r,i) }}
                    </RouterLink>
                    <div v-show="r.children&&r.children.length>0">
                        <div 
                            v-for="(c,j) in r.children"
                            :key="getMetaName(c,j)"
                            style="padding-left:10px;"
                        >
                            <RouterLink
                                :to="r.path+'/'+c.path"
                            >
                                {{ getMetaName(c,j) }}
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END 随便生成的菜单 待替换 -->
            <!-- 文档内容 -->
            <div class="main-wrapper">
                <RouterView />
            </div>
            <!-- END 文档内容 -->
        </div>
    </div>
</template>

<script>
import './style/app.less'

export default {
    computed: {
        routerData() {
            return this.$router.options.routes;
        }
    } ,
    methods: {
        getMetaName( r , i ){
            return r.meta && r.meta.name || i
        } ,
    }
};
</script>

