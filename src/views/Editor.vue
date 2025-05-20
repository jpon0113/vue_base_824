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
					<p>工作編輯區</p>
					<div class="preview-list" id="canvas-area">
						<edit-wrapper
							v-for="component in components"
							:key="component.id"
							:id="component.id"
							:active="component.id === (currentElement && currentElement.id)"
							@setActive="setActive"
						>
							<component
								:is="component.name"
								v-bind="component.props"
							></component>
						</edit-wrapper>
					</div>
				</a-layout-content>
			</a-layout>
			<a-layout-sider
				width="300"
				style="background: white"
				class="settings-panel"
			>
				組件屬性面板
				<props-table
					v-if="currentElement && currentElement.props"
					:props="currentElement.props"
				></props-table>
				<pre>
					{{ currentElement && currentElement.props }}
				</pre
				>
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
import EditWrapper from '@/components/EditWrapper.vue';
import PropsTable from '@/components/PropsTable.vue';
import defaultTextTemplates from '@/defaultTemplates';
import { ComponentData } from '@/store/editor';
export default defineComponent({
	components: {
		JpText,
		EditWrapper,
		PropsTable,
		ComponentsList,
	},
	setup() {
		const store = useStore<GlobalDataProps>();
		const components = computed(() => store.state.editor.components);
		const currentElement = computed<ComponentData | null>(
			() => store.getters.getCurrentElement
		);

		const addItem = (component: any) => {
			store.commit('addComponent', component);
		};

		const setActive = (id: string) => {
			console.log('setActive', id);
			store.commit('setActive', id);
		};

		return {
			components,
			defaultTextTemplates,
			addItem,
			setActive,
			currentElement,
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
