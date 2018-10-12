import React from 'react';
import styled from 'styled-components';

import Dialog from './shared/styledComponents/Dialog';
import Button from './shared/styledComponents/Button';
import Form from './shared/styledComponents/Form';

const BodyWrapper = styled.div`
	background-image: linear-gradient(-140deg, #b4ec51 0%, #429321 100%);
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

class Landing extends React.PureComponent<any> {
	state = {
		eventName: ''
	};

	onEventNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target as HTMLInputElement;
		this.setState({
			eventName: input.value
		});
	};

	onContinueHandler = () => {
		const { eventName } = this.state;
		const { history } = this.props;

		const searchString = eventName !== '' ? `?eventName=${eventName}` : '';

		history.push(`/new-event/event-info${searchString}`);
	};

	render = () => {
		const { eventName } = this.state;

		return (
			<BodyWrapper>
				<Dialog.Dialog>
					<Dialog.ContentWrapper>
						<Dialog.Header>
							<h1>Welcome</h1>
							<p>Start by creating an event</p>
						</Dialog.Header>
						<Form>
							<label htmlFor="eventName">
								Event name
								<input
									type="text"
									placeholder="Your event name"
									value={eventName}
									name="eventName"
									onChange={this.onEventNameChangeHandler}
								/>
							</label>
							<Button onClick={this.onContinueHandler}>Let&#39;s do it</Button>
						</Form>
						<Dialog.Footer>
							<button type="button">Or join an existing one</button>
						</Dialog.Footer>
					</Dialog.ContentWrapper>
				</Dialog.Dialog>
			</BodyWrapper>
		);
	};
}

export default Landing;
