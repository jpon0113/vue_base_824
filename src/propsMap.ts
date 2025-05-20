import { TextComponentProps } from './defaultProps';

export interface PropToForm {
	component: string;
	subComponent?: string;
	value?: string;
	extraProps?: {
		[key: string]: any;
	};
	text?: string;
	options?: { text: string; value: any }[];
	initalTransform?: (v: any) => any;
}

export type PropsToForms = {
	[P in keyof TextComponentProps]?: PropToForm;
};

export const mapPropsToForms: PropsToForms = {
	text: {
		component: 'a-textarea',
		extraProps: { rows: 3 },
		text: '文字內容',
	},
	fontSize: {
		component: 'a-input-number',
		text: '字體大小',
		initalTransform: (v: string) => parseInt(v),
	},
	lineHeight: {
		component: 'a-slider',
		extraProps: { min: 0, max: 3, step: 0.1 },
		text: '行高',
		initalTransform: (v: string) => parseFloat(v),
	},
	textAlign: {
		component: 'a-radio-group',
		subComponent: 'a-radio-button',
		text: '對齊',
		options: [
			{ value: 'left', text: '左' },
			{ value: 'center', text: '中' },
			{ value: 'right', text: '右' },
		],
	},
	fontFamily: {
		component: 'a-select',
		subComponent: 'a-select-option',
		text: '字體',
		options: [
			{ value: '', text: '無' },
			{ text: '宋體', value: '"SimSun","STSong"' },
			{ text: '黑體', value: '"SimHei","STHeiti"' },
			{ text: '楷體', value: '"KaiTi","STKaiti"' },
			{ text: '仿宋', value: '"FangSong","STFangsong"' },
		],
	},
};
