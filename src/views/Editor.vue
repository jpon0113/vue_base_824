<template>
	<div class="editor-container">
		<a-layout>
			<a-layout-sider width="300" style="background: #fff">
				<div class="sidebar-container">
					組件列表區
					<components-list
						:list="defaultTextTemplates"
						@onItemClick="addItem"
					/>
				</div>
			</a-layout-sider>
			<a-layout style="padding: 0 24px 24px">
				<a-layout-content class="preview-container">
					<p>工作區</p>
					<div class="preview-list" id="canvas-area">
						<component
							v-for="component in components"
							:key="component.id"
							:is="component.name"
							v-bind="component.props"
						>
							{{ component.props.text }}
						</component>
					</div>
				</a-layout-content>
			</a-layout>
			<a-layout-sider
				width="300"
				style="background: purple"
				class="settings-panel"
			>
				組件屬性
			</a-layout-sider>
		</a-layout>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { GlobalDataProps } from '../store/index';
import JpText from '@/components/JpText.vue';
import ComponentsList from '@/components/ComponentsList.vue';
import defaultTextTemplates from '../defaultTemplates';

export default defineComponent({
	components: {
		JpText,
		ComponentsList,
	},
	setup() {
		const store = useStore<GlobalDataProps>();
		const components = computed(() => store.state.editor.components);
		const addItem = (component: any) => {
			console.log('addItem', component);
			store.commit('addComponent', component);
		};

		return {
			components,
			defaultTextTemplates,
			addItem,
		};
	},
});
</script>

<style>
.editor-container .preview-container {
	padding: 24px;
	margin: 0;
	min-height: 85vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
}
.editor-container .preview-list {
	padding: 0;
	margin: 0;
	min-width: 375px;
	min-height: 200px;
	border: 1px solid #efefef;
	background: #fff;
	overflow-x: hidden;
	overflow-y: auto;
	position: fixed;
	margin-top: 50px;
	max-height: 80vh;
}
</style>
