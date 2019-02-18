+ 可搜索选项



```vue
<template>
    <Cascader 
        v-model="value"
        :data="data" 
        filterable>
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
                            children: [
                                {
                                    value: 'baogongyuan',
                                    label: '包公园',
                                }
                            ],
                        },
                        {
                            value: 'huangshan',
                            label: '黄山' ,
                            children: [
                                {
                                    value: 'guangmingding',
                                    label: '光明顶',
                                } ,
                                {
                                    value: 'tiandufeng',
                                    label: '天都峰',
                                } ,
                            ],
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
}
</script>
```
通过设置 filterable 属性提供搜索级联选项的功能。注意搜索对象是初始化设置时的级联选项，动态加载的级联选项不在搜索范围中。
