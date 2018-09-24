// @flow
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["renderStep2"] }] */

import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from './shared/styledComponents/Button';
import Form from './shared/styledComponents/Form';

/* const axiosClient = axios.create({
	baseURL: 'http://localhost:3000/graphql'
}); */

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

ContentWrapper.Footer = styled.div`
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

class CreateEvent extends React.Component {
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

	onInputChangeHandler = event => {
		this.setState({
			eventName: event.target.value
		});
	};

	onDescriptionChangeHandler = event => {
		this.setState({
			eventDescription: event.target.value
		});
	};

	onLocationChangeHandler = event => {
		this.setState({
			eventLocation: event.target.value
		});
	};

	onStartDatetimeChangeHandler = event => {
		this.setState({
			eventStartDatetime: event.target.value
		});
	};

	onEndDatetimeChangeHandler = event => {
		this.setState({
			eventEndDatetime: event.target.value
		});
	};

	onAdminNameChangeHandler = event => {
		this.setState({
			adminName: event.target.value
		});
	};

	onAdminEmailChangeHandler = event => {
		this.setState({
			adminEmail: event.target.value
		});
	};

	onContinueHandler = () => {
		const { step } = this.state;
		this.setState({
			step: step + 1
		});
	};

	onCreateHandler = event => {
		event.preventDefault();

		const { history } = this.props;
		const { eventName, adminName, adminEmail, eventStartDatetime, place } = this.state;

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
						place
					}
				}
			})
			.then(result => {
				history.push(`/event/${result.data.data.newEvent.id}`);
			});
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
				<ContentWrapper.Header>
					<h1>Welcome</h1>
					<p>Start by creating an event</p>
				</ContentWrapper.Header>
				<Form>
					<label htmlFor="eventName">
						Event name
						<input
							type="text"
							placeholder="Your event name"
							value={eventName}
							id="eventName"
							onChange={this.onInputChangeHandler}
						/>
					</label>
					<Button onClick={this.onContinueHandler}>Let&#39;s do it</Button>
				</Form>
				<ContentWrapper.Footer>
					<button type="button">Or join an existing one</button>
				</ContentWrapper.Footer>
			</ContentWrapper>
		);
	}

	renderStep2() {
		const { eventName, eventDescription, eventLocation } = this.state;

		return (
			<ContentWrapper>
				<ContentWrapper.Header>
					<h1>Step 1 of 2</h1>
					<p>Tell us more about your event</p>
				</ContentWrapper.Header>
				<ContentWrapper.Form>
					<label htmlFor="eventName">
						Event name
						<input
							type="text"
							placeholder="Your event name"
							value={eventName}
							id="eventName"
							onChange={this.onInputChangeHandler}
						/>
					</label>
					<label htmlFor="eventDescription">
						Event description
						<input
							type="text"
							placeholder="The best event ever"
							value={eventDescription}
							id="eventDescription"
							onChange={this.onDescriptionChangeHandler}
						/>
					</label>
					<label htmlFor="eventLocation">
						Where
						<input
							type="text"
							placeholder="TBD"
							value={eventLocation}
							id="eventLocation"
							onChange={this.onLocationChangeHandler}
						/>
					</label>
					<label htmlFor="eventStartDatetime">
						When
						<input
							type="text"
							placeholder="TBD"
							value={this.getEventStartDatetimeString()}
							id="eventStartDatetime"
							onChange={this.onStartDatetimeChangeHandler}
						/>
					</label>
					<label htmlFor="eventEndDatetime">
						Until
						<input
							type="text"
							placeholder="TBD"
							value={this.getEventEndDatetimeString()}
							id="eventEndDatetime"
							onChange={this.onEndDatetimeChangeHandler}
						/>
					</label>
					<Button onClick={this.onContinueHandler}>Continue</Button>
				</ContentWrapper.Form>
			</ContentWrapper>
		);
	}

	renderStep3() {
		const { adminName, adminEmail, showEmail } = this.state;

		return (
			<ContentWrapper>
				<ContentWrapper.Header>
					<h1>Step 1 of 2</h1>
					<p>Tell us more about your event</p>
				</ContentWrapper.Header>
				<ContentWrapper.Form>
					<label htmlFor="hostName">
						Your name
						<input
							type="text"
							placeholder="Your name"
							value={adminName}
							id="hostName"
							onChange={this.onAdminNameChangeHandler}
						/>
					</label>
					<label htmlFor="hostEmail">
						Your email
						<input
							type="text"
							placeholder="Your email"
							value={adminEmail}
							id="hostEmail"
							onChange={this.onAdminEmailChangeHandler}
						/>
					</label>
					<label htmlFor="showHostEmail">
						Your email
						<input type="checkbox" checked={showEmail} id="showHostEmail" onChange={this.onInputChangeHandler} />
					</label>
					<Button type="submit" onClick={this.onCreateHandler}>
						Continue
					</Button>
				</ContentWrapper.Form>
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

CreateEvent.propTypes = {
	history: PropTypes.any.isRequired // eslint-disable-line react/forbid-prop-types
};

export default withRouter(CreateEvent);
