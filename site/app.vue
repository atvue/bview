<template>
    <div class="wrapper">
        <div class="home-header">
            <div class="header-left">
                <div class="header-logo">
                </div>
                <div 
                    class="header-title"
                >Bee Design </div>
                <div class="header-search" >
                    <Input
                        placeholder="请输入想要搜索的组件"
                    />
                </div>
            </div> 
            <div class="header-right">
                <ul>
                    <li><a href="/">组件</a></li>
                    <li><a href="/">开发指南</a></li>
                    <li><a href="/">v1.0</a></li>
                    <li><a href="/">帮助</a></li>
                </ul>
            </div>
        </div>
        <div   
            class="main-content" 
        >
            <!-- 随便生成的菜单 待替换 -->
            <div class="slider-nav">
                <div 
                    v-for="(r,i) in routerData" 
                    :key="getMetaName(r,i)" 
                    class="nav-parent"
                >
                    <div class="nav-parent-title">
                        <!-- <RouterLink 
                            > -->
                        {{ getMetaName(r,i) }}
                    </div>
                    
                    <div 
                        v-show="r.children&&r.children.length>0" 
                        class="nav-child">
                        <div 
                            v-for="(c,j) in r.children"
                            :key="getMetaName(c,j)"
                            class="nav-child-title"
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
            <div
                ref="mainWrapper"
                class="main-wrapper" 
            >
                <RouterView />
            </div>
            <!-- END 文档内容 -->
            <!--锚点内容-->
            <div style="position:absolute;right:100px">
                <Anchor>  
                    <anchor-link
                      v-for="item in anchorList" 
                        :title="item.title"
                        :href="item.href"
                    />
                </Anchor>
            </div>
            <!--锚点内容-->
        </div>
    </div>
</template>

<script>
import './style/app.less'
import searchIcon from './assets/icons/search'
import downIcon from './assets/icons/down'
import Anchor from './components/anchor';
const { AnchorLink } = Anchor;

export default {
    components: {
        Anchor,
        AnchorLink
    },
    data(){
        return{
            searchIcon:searchIcon,
            downIcon:downIcon,
            anchorList:[]
        }
    },
    computed: {
        routerData() {
            return this.$router.options.routes;
        }
    } ,
    watch:{
        $route(){
            this.$nextTick(()=>{
                this.updateAnchor();
            })  
        }
    },
    mounted(){
        this.updateAnchor();
    },
    methods: {
        getMetaName( r , i ){
            return r.meta && r.meta.name || i
        },
        updateAnchor(){
            this.anchorList = [];
            let ele = this.$refs.mainWrapper.querySelectorAll('h3');
            ele.forEach(item => {
                if(item.id){
                    this.anchorList.push({
                        title:item.innerText,
                        href:"#"+item.id
                    })
                }  
            })
        }
    }   
};
</script>

