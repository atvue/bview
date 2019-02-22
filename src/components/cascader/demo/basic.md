---
order: 1
---

+ 基本用法



```vue
<template>
    <Cascader 
        :data="data" 
        v-model="value">
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
Cascader组件用于选择具有级联结构的数据，对数据格式有要求。数据项中需包含 value 、 label属性，children 为子集，具体格式可参考示例代码中的 data 对象。可使用 v-model 对选中值进行双向绑定。
