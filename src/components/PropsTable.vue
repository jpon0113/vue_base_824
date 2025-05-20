<template>
	<div class="props-table">
		<div v-for="(value, key) in finalProps" :key="key" class="prop-item">
			<span class="label" v-if="value.text">{{ value.text }}</span>
			<div class="prop-component">
				<component
					v-if="value"
					:is="value.component"
					:value="value.value"
					v-bind="value.extraProps"
				>
					<template v-if="value.options">
						<component
							v-for="(option, k) in value.options"
							:key="k"
							:is="value.subComponent"
							:value="option.value"
							>{{ option.text }}</component
						>
					</template>
				</component>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { reduce } from 'lodash';
import { TextComponentProps } from '@/defaultProps';
import { mapPropsToForms, PropsToForms } from '@/propsMap';

export default defineComponent({
	name: 'props-table',
	props: {
		props: {
			type: Object as PropType<TextComponentProps>,
			require: true,
		},
	},
	setup(props) {
		const finalProps = computed(() => {
			return reduce(
				props.props,
				(result, value, key) => {
					const newkey = key as keyof TextComponentProps;
					const item = mapPropsToForms[newkey];
					if (item) {
						(item.value = item.initalTransform
							? item.initalTransform(value)
							: value),
							(result[newkey] = item);
					}

					return result;
				},
				{} as Required<PropsToForms>
			);
		}, {});

		return {
			finalProps,
		};
	},
});
</script>

<style>
.prop-item {
	display: flex;
	margin-bottom: 10px;
	align-items: center;
}
.label {
	width: 28%;
}
.prop-component {
	width: 70%;
}
</style>
