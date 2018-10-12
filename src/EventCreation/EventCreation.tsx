import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import queryString from 'query-string';

import { createEvent } from '../providers/event.provider';

import EventInfo from './EventInfo';
import AdminInfo from './AdminInfo';

import Dialog from '../shared/styledComponents/Dialog';
import Form from '../shared/styledComponents/Form';
import Button from '../shared/styledComponents/Button';

const BodyWrapper = styled.div`
	background-image: linear-gradient(-140deg, #b4ec51 0%, #429321 100%);
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

class EventCreation extends React.Component<RouteComponentProps<any>, any> {
	state = {
		currentStep: 1,
		eventName: '',
		eventDescription: '',
		eventLocation: '',
		eventStartDatetime: new Date(),
		eventEndDatetime: new Date(),
		adminName: '',
		adminEmail: '',
		showEmail: true
	};

	componentDidMount = () => {
		const { location, history, match } = this.props;
		const { currentStep } = this.state;

		const urlParams = queryString.parse(this.props.location.search);

		if (urlParams.eventName) {
			this.setState({
				eventName: urlParams.eventName
			});
		}

		if (location.pathname === `${match.path}/admin-info` && currentStep != 2) {
			this.setState({
				currentStep: 1
			});
			history.push(`${match.path}/event-info`);
		}

		if (location.pathname === `${match.path}/event-info`) {
			this.setState({
				currentStep: 1
			});
		}
	};

	onFieldChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target as HTMLInputElement;
		this.setState({
			[input.name]: input.value
		});
	};

	onContinueHandler = (e: any) => {
		const { history } = this.props;

		e.preventDefault();

		this.setState({
			currentStep: 2
		});

		history.push('/new-event/admin-info');
	};

	onCreateHandler = (event: React.MouseEvent<HTMLFormElement>) => {
		event.preventDefault();

		const { history } = this.props;
		const { eventName, adminName, adminEmail, eventStartDatetime, eventLocation } = this.state;

		createEvent({
			name: eventName,
			admin_name: adminName,
			admin_email: adminEmail,
			datetime: Math.round(eventStartDatetime.getTime() / 1000),
			place: eventLocation
		}).then((newEvent: any) => {
			history.push(`/event/${newEvent.id}`);
		});

		return false;
	};

	renderHeader() {
		const { currentStep } = this.state;

		if (currentStep === 2) {
			return (
				<Dialog.Header>
					<h1>Step 2 of 2</h1>
					<p>Tell us more about your you</p>
				</Dialog.Header>
			);
		}

		return (
			<Dialog.Header>
				<h1>Step 1 of 2</h1>
				<p>Tell us more about your event</p>
			</Dialog.Header>
		);
	}

	render() {
		const {
			currentStep,
			eventName,
			eventDescription,
			eventLocation,
			eventStartDatetime,
			eventEndDatetime,
			adminName,
			adminEmail,
			showEmail
		} = this.state;
		const { match } = this.props;

		return (
			<BodyWrapper>
				<Dialog.Dialog>
					<Dialog.ContentWrapper>
						{this.renderHeader()}
						<Form onSubmit={this.onCreateHandler}>
							<Route
								path={`${match.path}/event-info`}
								render={() => (
									<EventInfo
										onFieldChangeHandler={this.onFieldChangeHandler}
										eventName={eventName}
										eventDescription={eventDescription}
										eventLocation={eventLocation}
										eventStartDatetime={eventStartDatetime}
										eventEndDatetime={eventEndDatetime}
									/>
								)}
							/>
							<Route
								path={`${match.path}/admin-info`}
								render={() => (
									<AdminInfo
										onFieldChangeHandler={this.onFieldChangeHandler}
										adminName={adminName}
										adminEmail={adminEmail}
										showEmail={showEmail}
									/>
								)}
							/>
							{currentStep == 1 ? (
								<Button type="button" onClick={this.onContinueHandler}>
									Next
								</Button>
							) : (
								<Button type="submit">Create!</Button>
							)}
						</Form>
					</Dialog.ContentWrapper>
				</Dialog.Dialog>
			</BodyWrapper>
		);
	}
}

export default withRouter(EventCreation);
