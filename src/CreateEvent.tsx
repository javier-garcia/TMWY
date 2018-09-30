import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import Button from './shared/styledComponents/Button';
import Form from './shared/styledComponents/Form';

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

const Header = styled.header`
	h1 {
		font-size: 26px;
		margin-bottom: 0;
	}

	p {
		margin: 0;
		font-size: 26px;
	}
`;

const Footer = styled.div`
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

class CreateEvent extends React.Component<RouteComponentProps<any>, any> {
	state = {
		step: 1,
		eventName: '',
		eventDescription: '',
		eventLocation: '',
		eventStartDatetime: new Date(),
		eventEndDatetime: new Date(),
		adminName: '',
		adminEmail: '',
		showEmail: true
	};

	onFieldChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target as HTMLInputElement;
		this.setState({
			[input.name]: input.value
		});
	};

	onContinueHandler = () => {
		const { step } = this.state;
		this.setState({
			step: step + 1
		});
	};

	onCreateHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const { history } = this.props;
		const { eventName, adminName, adminEmail, eventStartDatetime, eventLocation } = this.state;

		const graphQLQuery = `
			mutation ($newEvent: NewEvent!) {
				newEvent(input: $newEvent) {
					id
					name
				}
			}
		`;

		axios
			.post('http://localhost:3000/graphql', {
				query: graphQLQuery,
				variables: {
					newEvent: {
						name: eventName,
						admin_name: adminName,
						admin_email: adminEmail,
						datetime: eventStartDatetime.toString(),
						place: eventLocation
					}
				}
			})
			.then(result => {
				history.push(`/event/${result.data.data.newEvent.id}`);
			});

		return false;
	};

	getEventStartDatetimeString() {
		const { eventStartDatetime } = this.state;

		return `${eventStartDatetime.toLocaleDateString()} ${eventStartDatetime.toLocaleTimeString()}`;
	}

	getEventEndDatetimeString() {
		const { eventEndDatetime } = this.state;

		return `${eventEndDatetime.toLocaleDateString()} ${eventEndDatetime.toLocaleTimeString()}`;
	}

	renderStep() {
		const { step } = this.state;

		switch (step) {
			case 2:
				return this.renderStep2();
			case 3:
				return this.renderStep3();
			case 1:
			default:
				return this.renderStep1();
		}
	}

	renderStep1() {
		const { eventName } = this.state;

		return (
			<ContentWrapper>
				<Header>
					<h1>Welcome</h1>
					<p>Start by creating an event</p>
				</Header>
				<Form>
					<label htmlFor="eventName">
						Event name
						<input
							type="text"
							placeholder="Your event name"
							value={eventName}
							name="eventName"
							onChange={this.onFieldChangeHandler}
						/>
					</label>
					<Button onClick={this.onContinueHandler}>Let&#39;s do it</Button>
				</Form>
				<Footer>
					<button type="button">Or join an existing one</button>
				</Footer>
			</ContentWrapper>
		);
	}

	renderStep2() {
		const { eventName, eventDescription, eventLocation } = this.state;

		return (
			<ContentWrapper>
				<Header>
					<h1>Step 1 of 2</h1>
					<p>Tell us more about your event</p>
				</Header>
				<Form>
					<label htmlFor="eventName">
						Event name
						<input
							type="text"
							placeholder="Your event name"
							value={eventName}
							name="eventName"
							onChange={this.onFieldChangeHandler}
						/>
					</label>
					<label htmlFor="eventDescription">
						Event description
						<input
							type="text"
							placeholder="The best event ever"
							value={eventDescription}
							name="eventDescription"
							onChange={this.onFieldChangeHandler}
						/>
					</label>
					<label htmlFor="eventLocation">
						Where
						<input
							type="text"
							placeholder="TBD"
							value={eventLocation}
							name="eventLocation"
							onChange={this.onFieldChangeHandler}
						/>
					</label>
					<label htmlFor="eventStartDatetime">
						When
						<input
							type="text"
							placeholder="TBD"
							value={this.getEventStartDatetimeString()}
							name="eventStartDatetime"
							onChange={this.onFieldChangeHandler}
						/>
					</label>
					<label htmlFor="eventEndDatetime">
						Until
						<input
							type="text"
							placeholder="TBD"
							value={this.getEventEndDatetimeString()}
							name="eventEndDatetime"
							onChange={this.onFieldChangeHandler}
						/>
					</label>
					<Button onClick={this.onContinueHandler}>Continue</Button>
				</Form>
			</ContentWrapper>
		);
	}

	renderStep3() {
		const { adminName, adminEmail, showEmail } = this.state;

		return (
			<ContentWrapper>
				<Header>
					<h1>Step 1 of 2</h1>
					<p>Tell us more about your event</p>
				</Header>
				<Form>
					<label htmlFor="hostName">
						Your name
						<input
							type="text"
							placeholder="Your name"
							value={adminName}
							name="adminName"
							onChange={this.onFieldChangeHandler}
						/>
					</label>
					<label htmlFor="hostEmail">
						Your email
						<input
							type="text"
							placeholder="Your email"
							value={adminEmail}
							name="adminEmail"
							onChange={this.onFieldChangeHandler}
						/>
					</label>
					<label htmlFor="showHostEmail">
						Your email
						<input type="checkbox" checked={showEmail} id="showHostEmail" onChange={this.onFieldChangeHandler} />
					</label>
					<Button type="submit" onClick={this.onCreateHandler}>
						Continue
					</Button>
				</Form>
			</ContentWrapper>
		);
	}

	render() {
		return (
			<BodyWrapper>
				<Dialog>{this.renderStep()}</Dialog>
			</BodyWrapper>
		);
	}
}

export default withRouter(CreateEvent);
