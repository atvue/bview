+ 允许选中任意一级



```vue
<template>
    <Cascader 
        v-model="value"
        changeOnSelect
        :data="data" >
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
通过设置属性 changeOnSelect 使得用户能够选中任意一级的选项。
