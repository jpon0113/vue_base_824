<template>
	<component
		:is="tag"
		:style="styleProps"
		class="jp-text-component"
		@click="handleClick"
		>{{ text }}</component
	>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { pick } from 'lodash-es';
import {
	transformToComponentProps,
	textDefaultProps,
	textStylePropNames,
} from '@/defaultProps';
import useComponentCommon from '@/hooks/useComponentCommon';
const defaultProps = transformToComponentProps(textDefaultProps);

export default defineComponent({
	name: 'jp-text',
	props: {
		// text: {
		// 	type: String,
		// },
		// fontSize: {
		// 	type: String,
		// },
		tag: {
			type: String,
			default: 'div',
		},
		...defaultProps,
	},
	setup(props) {
		const { styleProps, handleClick } = useComponentCommon(
			props,
			textStylePropNames
		);

		return {
			styleProps,
			handleClick,
		};
	},
});
</script>

<style scoped>
h2.jp-text-component,
p.jp-text-component {
	margin-bottom: 0;
}
button.jp-text-component {
	padding: 5px 10px;
	cursor: pointer;
}
.jp-text-component {
	box-sizing: border-box;
	white-space: pre-wrap;
	position: relative !important;
}
</style>
