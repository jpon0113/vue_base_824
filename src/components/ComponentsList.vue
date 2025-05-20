<template>
	<div class="create-component-list">
		<div
			v-for="(item, index) in list"
			:key="index"
			class="component-item"
			@click="onItemClick(item)"
		>
			<jp-text v-bind="item" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JpText from './JpText.vue';
import { context } from 'ant-design-vue/lib/vc-image/src/PreviewGroup';
export default defineComponent({
	props: {
		list: {
			type: Array,
			required: true,
		},
	},
	emits: ['on-item-click'],
	name: 'components-list',
	components: {
		JpText,
	},
	setup(props, context) {
		const onItemClick = (data: any) => {
			context.emit('on-item-click', data);
		};

		return {
			onItemClick,
		};
	},
});
</script>

<style>
.component-item {
	width: 100px;
	margin: 0 auto;
	margin-bottom: 15px;
}
.component-item > * {
	position: static !important;
}
</style>
