```vue
<template>
  <section>
    <div style="display:flex">
     <div>
     <span>可自定义文字</span>
      <Switches v-model="value1">
        <span slot="open">开</span>
        <span slot="close">关</span>
      </Switches>
     </div>
     <div style="margin-left:20px;">
       <span>加载状态</span>
      <Switches v-model="value2" loading></Switches>
     </div>
      <div style="margin-left:20px;">
      <span>禁用状态</span>
      <Switches v-model="value2" disabled></Switches>
      </div>
      <div>
      <div style="margin-left:20px;">
      <span>可插入图标</span>
      <Switches v-model="value3">
        <i slot="open" class="iconfont icon-success"></i>
        <i slot="close" class="iconfont icon-closesmall"></i>
      </Switches>
      </div>
      </div>
    </div>
  </section>
</template>
<script>
import {Switches} from 'bview';
export default {
    components: {
        Switches
    },
    data() {
        return {
            value1: true,
            value2: true,
            value3: true,
        };
    }
};
</script>
```
可自定义文字，通过可以利用loading来标识切换状态的过渡。