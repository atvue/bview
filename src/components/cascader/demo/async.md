+ 异步用法



```vue
<template>
    <Cascader 
        v-model="value"
        :data="data" 
        :load-data="loadData" 
        @on-change="handelChange">
    </Cascader>
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
            value: [],
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
                    loading : false ,
                    children: [],
                }] ,
        }
    } ,
    methods: {
        loadData (item, callback) {
            item.loading = true;
            setTimeout(() => {
                if (item.value === 'hefei') {
                    item.children = [
                        {
                            value: 'baogongyuan',
                            label: '包公园',
                        }
                    ];
                } else if (item.value === 'huangshan') {
                    item.children = [
                        {
                            value: 'xidihongcun',
                            label: '西递宏村' ,
                        },
                        {
                            value: 'taihu',
                            label: '太湖'
                        }
                    ];
                } else if ( item.value === 'zhejiang' ) {
                    item.children = [
                        {
                            value: 'huzhou',
                            label: '湖州',
                        } ,
                        {
                            value: 'hangzhou',
                            label: '杭州',
                            loading : false ,
                            children: [],
                        },
                    ]
                } else if ( item.value === 'hangzhou' ) {
                    item.children = [
                        {
                            value: 'xihu',
                            label: '西湖',
                        } ,
                    ]
                }
                item.loading = false;
                callback();
            }, 1000);
        } ,
        handelChange(value, obj){
            console.log(value,obj)
        } ,
    } ,
}
</script>

```
通过设置 load-data 实现异步加载级联选项。load-data 接收用户定义的一个函数， 其第二个参数为回调函数，执行时会自动展开当前项的子列表。此外，注意需要给级联数据项增加 loading 属性来标识当前是否正在加载。


