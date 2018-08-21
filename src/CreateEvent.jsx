// @flow

import React from 'react';
import styled from 'styled-components';

function CreateEvent() {
	const BodyWrapper = styled.div`
		background-image: linear-gradient(-140deg, #b4ec51 0%, #429321 100%);
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	`;

	const Dialog = styled.div`
		width: 890px;
		height: 668px;
		background: linear-gradient(-134deg, rgba(48, 35, 174, 0.6) 0%, rgba(200, 109, 215, 0.6) 100%) top left no-repeat,
			transparent url(/public/images/background.png) left top no-repeat;
		box-shadow: 0 0 39px 0 rgba(0, 0, 0, 0.22);
	`;

	const ContentWrapper = styled.div`
		width: 480px;
		height: 100%;
		background-color: #ffffff;
		padding: 64px 47px;
		color: #260034;
	`;

	ContentWrapper.Header = styled.header`
		h1 {
			font-size: 26px;
			margin-bottom: 0;
		}

		p {
			margin: 0;
			font-size: 26px;
		}
	`;

	ContentWrapper.Form = styled.form`
		margin-top: 90px;

		label {
			font-size: 13px;
			color: #6ab231;
			text-transform: uppercase;
			display: block;
		}

		input {
			border: none;
			border-bottom: 2px solid #260034;
			width: 100%;
			font-size: 32px;
			padding: 8px 0;
			margin-top: 7px;

			&::placeholder {
				color: rgba(38, 0, 52, 0.22);
			}

			&:focus {
				outline: none;
				border-bottom: 2px solid #6ab231;
			}
		}

		button {
			background-image: linear-gradient(-134deg, rgba(112, 35, 174, 0.63) 0%, #c86dd7 100%);
			font-size: 26px;
			color: #ffffff;
			width: 100%;
			text-align: center;
			text-transform: uppercase;
			padding 20px;
			margin-top: 50px;
		}
	`;

	ContentWrapper.Footer = styled.div`
		button {
			font-size: 18px;
			color: #9855ca;
			text-align: center;
			text-transform: uppercase;
			margin-top: 180px;
			width: 100%;
			font-weight: 500;
		}
	`;

	return (
		<BodyWrapper>
			<Dialog>
				<ContentWrapper>
					<ContentWrapper.Header>
						<h1>Welcome</h1>
						<p>Start by creating an event</p>
					</ContentWrapper.Header>
					<ContentWrapper.Form>
						<label htmlFor="eventName">
							Event name
							<br />
							<input type="text" placeholder="Your event" value="" id="eventName" />
						</label>
						<button type="submit">Let&#39;s do it</button>
					</ContentWrapper.Form>
					<ContentWrapper.Footer>
						<button type="button">Or join an existing one</button>
					</ContentWrapper.Footer>
				</ContentWrapper>
			</Dialog>
		</BodyWrapper>
	);
}

export default CreateEvent;
