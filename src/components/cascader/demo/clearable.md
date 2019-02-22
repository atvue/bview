---
order: 3
---

+ 可清空的级联选择



```vue
<template>
    <Cascader 
        :data="data" 
        v-model="value" 
        clearable>
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
            value: ['anhui', 'huangshan', 'guangmingding'],
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
                        label: '杭州'
                    },
                ],
            }] ,
        }
    } ,
}
</script>
```
通过设置 clearable 属性来提供清空选择的功能。
