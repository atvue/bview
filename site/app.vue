<template>
    <div class="wrapper">
        <div class="home-header">
            <div class="header-left">
                <div class="header-logo" />
                <div class="header-title">
                    Bee&nbsp;Design
                </div>
                <div class="header-search">
                    <Input
                        placeholder="请输入想要搜索的组件"
                    />
                </div>
            </div> 
            <div class="header-right">
                <ul>
                    <li>
                        <a href="/">
                            组件
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            开发指南
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            v1.0
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            帮助
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div   
            class="main-content" 
        >
            <!-- 随便生成的菜单 待替换 -->
            <SlideNav 
                :router-data="routerData"
            />
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
                <Anchor
                    ref="anchor" 
                >  
                    <AnchorLink
                        v-for="(item,index) in anchorList" 
                        :key="index"
                        :title="item.title" 
                        :href="item.href" 
                    />
                </Anchor>
            </div>
            <!--锚点内容-->
        </div>
        <div class="home-footer">
            <div class="about-info">
                <div class="about-title">
                    关于我们
                </div>
                <div class="about-txt">
                    Bee Design 是基于Vue.js的高质量UI组件库，致力于打造模块化、轻量级的企业产品设计。
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './style/app.less'
import Anchor from './components/anchor';
import SlideNav from './components/slideNav';
const { AnchorLink } = Anchor;

export default {
    components: {
        Anchor,
        AnchorLink,
        SlideNav
    },
    data(){
        return{
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


