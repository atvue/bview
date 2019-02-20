<template>
    <div class="slider-nav">
        <div class="nav-scroll">
            <div
                v-for="(r, i) in routerData"
                :key="getMetaName(r, i)"
                class="nav-parent"
            >
                <div class="nav-parent-title">
                    <!-- <RouterLink
                            > -->
                    {{ getMetaName(r, i) }}
                </div>

                <div
                    v-show="r.children && r.children.length > 0"
                    class="nav-child"
                >
                    <div
                        v-for="(c, j) in r.children"
                        :key="getMetaName(c, j)"
                        class="nav-child-title"
                    >
                        <RouterLink :to="r.path + '/' + c.path">
                            {{ getMetaName(c, j) }}
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: `SlideNav` ,
    props: {
        routerData: {
            type: Array ,
            default() {
                return []
            } ,
        } ,
    } ,
    methods: {
        getMetaName( r , i ) {
            return ( r.meta && r.meta.name ) || i
        } ,
    } ,
}
</script>
