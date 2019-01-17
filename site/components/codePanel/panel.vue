<template>
    <div 
        ref="panel"
        class="bPanel" 
    >  
        <CollapseTransition>
            <div
                v-show="isActive"
                class="bPanel-body-wrapper" 
            >
                <div class="bPanel-body">
                    <slot name="content"></slot>
                </div>
            </div>
        </CollapseTransition>
        <div 
            :class="['bPanel-footer',{'is-fixed':fixedControl}]"
            @click="toggle"
        >
            <slot></slot>
            <span 
                v-show="!isActive"
                class="bPanel-footer-state"      
            > </>展开代码</span>
            <span 
                v-show="isActive"
                class="bPanel-footer-state" 
            ></>收起代码</span>
        </div>
    </div>
</template>
<script>
import CollapseTransition from './collapse-transition'
export default {
    name:"CodePanel",
    components:{
        CollapseTransition
    },
    data(){
        return {
            isActive:false,
            fixedControl:false,
            scrollEle:null
        }
    },
    watch:{
        isActive(val){
            let t = this;
            if(!val){
                this.fixedControl = false;
                return;
            }      
            this.removeScrollHandler();
            setTimeout(()=>{
                t.scrollEle =window;
                t.scrollEle.addEventListener("scroll",t.scrollHandler);
                t.scrollHandler();
            },300);
            
        }
    },
    destroyed(){
        this.removeScrollHandler();
    },
    methods:{
        toggle(){
            this.isActive=!this.isActive;
        },
        scrollHandler(){
            let {top,bottom}=this.$refs.panel.getBoundingClientRect();
            let clientHeight = document.documentElement.clientHeight; 
            this.fixedControl = bottom > clientHeight&&top+40<=clientHeight;
        },
        removeScrollHandler(){
            this.scrollEle&&this.scrollEle.removeEventListener('scroll',this.scrollHandler);
        }
    }
}
</script>
<style lang="less">
.bPanel {
    border: 1px solid #ebebeb;
    border-top: none;
    line-height: 0;
    .is-fixed {
        position: fixed;
        bottom: 0;
        width: calc(100% - 415px);
        border: 1px solid #ebebeb;
    }
}
.bPanel-footer {
    position: relative;
    border-top: 1px solid #ebebeb; 
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
}

.bPanel-footer-state {
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    color: #2c80ff;
    &:hover {
        background: #f9fafc;
    }
    > span {
        display: inline-block;
        
    }
}
.collapse-transition {
    transition: height 0.3s ease-in-out, padding-top 0.3s ease-in-out,
        padding-bottom 0.3s ease-in-out;
}

</style>



