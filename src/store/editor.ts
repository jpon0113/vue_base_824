import { v4 as uuidv4 } from 'uuid';
import { Module } from 'vuex';
import { GlobalDataProps } from './index';
import { TextComponentProps, ImageComponentProps } from '@/defaultProps';

export interface EditorProps {
	// 工作區渲染用數據
	components: ComponentData[];
	// 當前編輯是哪個元素(uuid)
	currentElement: string;
}

export interface ComponentData {
	// 元素屬性
	props: Partial<TextComponentProps & ImageComponentProps>;
	// id, uuid v4產生
	id: string;
	// 組件名稱 ex: jp-text, jp-image
	name: 'jp-text' | 'jp-image';
}

export const testComponents: ComponentData[] = [
	{
		id: uuidv4(),
		name: 'jp-text',
		props: {
			text: 'test1',
			fontSize: '20px',
			color: '#000000',
			lineHeight: '1',
			textAlign: 'left',
			fontFamily: '',
		},
	},
	{
		id: uuidv4(),
		name: 'jp-text',
		props: {
			text: 'test2',
			fontSize: '10px',
			fontWeight: 'bold',
			lineHeight: '2',
			textAlign: 'center',
			fontFamily: '',
		},
	},
	{
		id: uuidv4(),
		name: 'jp-text',
		props: {
			text: 'test3',
			fontSize: '14px',
			actionType: 'url',
			url: 'https://www.nba.com',
			textAlign: 'center',
		},
	},
];

const editor: Module<EditorProps, GlobalDataProps> = {
	state: {
		components: testComponents,
		currentElement: '',
	},
	mutations: {
		addComponent(state, component: ComponentData) {
			state.components.push(component);
		},
		setActive(state, currentId: string) {
			state.currentElement = currentId;
		},
		updateComponent(state, { key, value }) {
			const updatedComponent = state.components.find(
				(component) => component.id === state.currentElement
			);
			if (updatedComponent) {
				updatedComponent.props[key as keyof TextComponentProps] = value;
			}
		},
	},
	getters: {
		getCurrentElement: (state) => {
			return state.components.find(
				(component) => component.id === state.currentElement
			);
		},
	},
};

export default editor;
