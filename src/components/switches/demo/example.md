```vue
<template>
  <section>
    <div>
      <Switches v-model="value1">
        <span slot="open">开</span>
        <span slot="close">关</span>
      </Switches>
      <Switches v-model="value2" loading></Switches>
      <Switches v-model="value2" disabled></Switches>
      <Switches v-model="value3">
        <i slot="open" class="iconfont icon-success"></i>
        <i slot="close" class="iconfont icon-closesmall"></i>
      </Switches>
      <Switches v-model="value5" trueText="对" falseText="错">
      </Switches>
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
            value5: true
        };
    }
};
</script>
```