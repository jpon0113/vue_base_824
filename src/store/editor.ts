import { v4 as uuidv4 } from 'uuid';
import { Module } from 'vuex';
import { GlobalDataProps } from './index';

export interface EditorProps {
	// 工作區渲染用數據
	components: ComponentData[];
	// 當前編輯是哪個元素(uuid)
	currentElement: string;
}

interface ComponentData {
	// 元素屬性
	props: { [key: string]: any };
	// id, uuid v4產生
	id: string;
	// 組件名稱 ex: jp-text, jp-image
	name: string;
}

export const testComponents: ComponentData[] = [
	{
		id: uuidv4(),
		name: 'jp-text',
		props: { text: 'test1', fontSize: '20px', color: 'red' },
	},
	{
		id: uuidv4(),
		name: 'jp-text',
		props: { text: 'test2', fontSize: '10px', fontWeight: 'bold' },
	},
	{ id: uuidv4(), name: 'jp-text', props: { text: 'test3', fontSize: '14px' } },
];

const editor: Module<EditorProps, GlobalDataProps> = {
	state: {
		components: testComponents,
		currentElement: '',
	},
};

export default editor;
