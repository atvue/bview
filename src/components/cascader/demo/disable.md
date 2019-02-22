---
order: 4
---

+ 禁用状态的级联选择



```vue
<template>
    <Cascader 
        :data="data" 
        v-model="value" >
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
                        label: '安庆',
                        disabled: true,
                    }
                ]
            }, {
                value: 'zhejiang',
                label: '浙江',
                children: [
                    {
                        value: 'huzhou',
                        label: '湖州',
                        disabled: true,
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
                        label: '杭州'
                    },
                ],
            }] ,
        }
    } ,
}
</script>
```
通过给级联数据项设置 disabled: true 可以禁用该项，用户无法选中。
