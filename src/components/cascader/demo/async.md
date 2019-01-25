+ 异步用法



```vue
<template>
    <div class="center">
        <Cascader 
            v-model="value2"  
            clearable 
            changeOnSelect
            :data="data" 
            :load-data="loadData" 
            :render-format="renderFormat"
            @on-change="handelChange">
        </Cascader>
    </div>
</template>

<script>
import { Cascader } from 'bview'

export default {
    name: 'HelloWorld',
    components:{
        Cascader ,
    } ,
    data () {
        return {
            value2: ['zhejiang', 'hangzhou', 'xihu'],
            data: [{
                    value: 'anhui',
                    label: '安徽',
                    children: [
                        {
                            value: 'hefei',
                            label: '合肥',
                            loading : false ,
                            children: [],
                        },
                        {
                            value: 'huangshan',
                            label: '黄山' ,
                            loading : false ,
                            children: [],
                        },
                        {
                            value: 'anqing',
                            label: '安庆'
                        }
                    ]
                }, {
                    value: 'zhejiang',
                    label: '浙江',
                    children: [
                        {
                            value: 'huzhou',
                            label: '湖州',
                            children: [
                                {
                                    value: 'moganshan',
                                    label: '莫干山',
                                },
                                {
                                    value: 'baicaoyuan',
                                    label: '百草园',
                                }
                            ]
                        } ,
                        {
                            value: 'hangzhou',
                            label: '杭州',
                            children: [
                                {
                                    value: 'xihu',
                                    label: '西湖',
                                }
                            ]
                        },
                    ],
                }] ,
        }
    } ,
    methods: {
        loadData (item, callback) {
            item.loading = true;
            setTimeout(() => {
                if (item.value === 'hefei') {
                    item.children = [

                    ];
                } else if (item.value === 'huangshan'||item.value === 'xidihongcun') {
                    item.children = [
                        {
                            value: 'xidihongcun',
                            label: '西递宏村' ,
                            loading : false ,
                            children: [],
                        },
                        {
                            value: 'taihu',
                            label: '太湖'
                        }
                    ];
                }
                item.loading = false;
                callback();
            }, 1000);
        } ,
        renderFormat(label){
            return label.join(' - ');
        },
        handelChange(value, obj){
            console.log(value,obj)
        } ,
    } ,
}
</script>

<style scoped lang="less">
.center{padding:50px;}
</style>

```
Cascader组件用于选择具有级联结构的数据
