```vue
<template>
    <div>
        <div style="position:absolute;right:100px">
            <Anchor>
                <anchor-link title="hello" href="#hello" />
                <anchor-link title="hello2" href="#hello2" />
            </Anchor>
        </div>
        <div>
            <div>
                <h3 id="hello">hello</h3>
                <p v-for="i in 50" :key="`chinese-${i}`">
                    这是信息hdhhhhhh{{ i }}
                </p>
            </div>
            <div>
                <h3 id="hello2">hello2</h3>
                <p v-for="i in 50" :key="`chinese-${i}`">dakdhadhladl{{ i }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { Anchor } from 'bview';
const { AnchorLink } = Anchor;
export default {
    components: {
        Anchor,
        AnchorLink
    },
    data() {
        return {
            scrollOffset: '200px'
        };
    }
};
</script>
```
