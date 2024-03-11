"use client";

import ProgressBar from "react-progressbar";

interface BaseProgressBarProps {
	completed: number;
	fgColor?: string;
	style?: React.CSSProperties;
	show: boolean;
}

const BaseProgressBar: React.FC<BaseProgressBarProps> = ({
	completed,
	fgColor = "#FF8319",
	style = { zIndex: 500 }, // Set default style
}) => {
	return (
		<ProgressBar
			completed={completed}
			bgColor={fgColor}
			style={style}
			show={false}
		/>
	);
};

export default BaseProgressBar;
