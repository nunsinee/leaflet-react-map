import React from "react";
import { Button } from "antd";

interface ButtonProps {
	id: string;
	onClick?: () => void;
	title: string;
	className?: string;
	children?: React.ReactNode; // Define children prop
	type?: string;
	size?: string;
}

const ButtonMode: React.FC<ButtonProps> = ({
	id,
	onClick,
	title,
	className,
	children,
	size,
	type,
}) => {
	return (
		<Button
			id={id}
			className={`marker-container ${className || ""}`}
			title={title}
			onClick={onClick}
			size={size}
			type={type}
		>
			{children}
		</Button>
	);
};

export default ButtonMode;

// how to use button properties

// const YourComponent: React.FC = () => {
// 	const handleClick = () => {
// 		setData("walk");
// 	};

// 	return (
// 		<div>
// 			<Button id="btn-walk" onClick={handleClick} title="walk mode" />
// 		</div>
// 	);
// };

// export default YourComponent;
