import styled from 'styled-components';

class Dialog {
	static Dialog = styled.div`
		width: 890px;
		height: 668px;
		background: linear-gradient(-134deg, rgba(48, 35, 174, 0.6) 0%, rgba(200, 109, 215, 0.6) 100%) top left no-repeat,
			transparent url(/public/images/background.png) left top no-repeat;
		box-shadow: 0 0 39px 0 rgba(0, 0, 0, 0.22);
	`;

	static ContentWrapper = styled.div`
		width: 480px;
		height: 100%;
		background-color: #ffffff;
		padding: 30px 47px;
		color: #260034;
	`;

	static Header = styled.header`
		h1 {
			font-size: 26px;
			margin-bottom: 0;
		}

		p {
			margin: 0;
			font-size: 18px;
		}
	`;

	static Footer = styled.div`
		button {
			font-size: 16px;
			color: #9855ca;
			text-align: center;
			text-transform: uppercase;
			margin-top: 180px;
			width: 100%;
			font-weight: 500;
		}
	`;
}

export default Dialog;
