<template>
    <div :class="`${b}-tool-tip`">
        <Dropdown :value="true">
            <slot />
            <div
                slot="overlay"
                :class="`${b}-tool-tip-overlay`"
            >
                <div :class="`${b}-tool-tip-content`">
                    <div :class="`${b}-tool-tip-inner`">
                        <template v-if="hasTitle">
                            {{ title }}
                        </template>
                        <slot
                            v-else
                            name="title"
                        />
                    </div>
                </div>
            </div>
        </Dropdown>
    </div>
</template>

<script>
import Dropdown from '../dropdown'
import { bviewPrefix as b } from '../../utils/macro.js'

export default {
    name: `ToolTip` ,
    components: { Dropdown } ,
    props: {
        title: {
            type: String ,
            default: undefined ,
        } ,
    } ,
    data() {
        return {
            b ,
        }
    } ,
    computed: {
        hasTitle() {
            return this.title !== undefined
        } ,
    } ,
    methods: {} ,
}
</script>
