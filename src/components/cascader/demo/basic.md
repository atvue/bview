+ 基本用法



```vue
<template>
    <div>
        <Cascader 
            :data="data" 
            v-model="value2" 
            clearable 
            @on-change="handelChange"></Cascader>
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
                                    disabled: true,
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
        handelChange(value, obj){
            console.log(value,obj)
        } ,
    } ,
}
</script>
```
Cascader组件用于选择具有级联结构的数据
