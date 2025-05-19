interface HiProps {
	msg: string;
}

const Hi = (props: HiProps) => {
	return <div>{props.msg}</div>;
};

Hi.props = ['msg'];

export default Hi;
