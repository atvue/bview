<template>
	<i :class="className" />
</template>

<script>
// icon 放在 阿里妈妈图标库中

export default {
	name: 'icon' ,
	props: {
		type: {
			type: String ,
			required: true ,
		}
	} ,
	computed: {
		className(){
			let { type } = this
			return `bview-iconfont bicon-${type}`
		}
	}
}
</script>