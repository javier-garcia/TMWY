import React from 'react';

const BackArrowIcon = () => {
	return (
		<svg
			width="18px"
			height="13px"
			viewBox="0 0 18 13"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
		>
			<desc>Created with Sketch.</desc>
			<defs />
			<g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
				<g id="Desktop-HD-Copy-10" transform="translate(-492.000000, -26.000000)" fill="#000000">
					<polygon
						id="keyboard_backspace---material"
						points="510 31.616 510 33.584 495.84 33.584 499.416 37.184 498 38.6 492 32.6 498 26.6 499.416 28.016 495.84 31.616"
					/>
				</g>
			</g>
		</svg>
	);
};

interface Props {
	onClick: Function;
}

const BackArrowButton = ({ onClick }: Props) => {
	const onButtonClick = () => {
		onClick();
	};

	return (
		<button className="closeDetail" onClick={onButtonClick}>
			<BackArrowIcon />
			Back to car list
		</button>
	);
};

export default BackArrowButton;
