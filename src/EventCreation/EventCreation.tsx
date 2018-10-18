import React, { Fragment } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import moment, { Moment } from 'moment';

import { createEvent } from '../providers/event.provider';

import EventInfo from './EventInfo';
import AdminInfo from './AdminInfo';
import GoogleAPI from '../components/GoogleAPI';
import LocationMap from '../components/LocationMap';

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

const MapWrapper = styled.div`
	position: relative;
	width: 410px;
	height: 668px;
	left: 433px;
	top: -538px;
`;

interface State {
	currentStep: Number;
	errors: any;
	touched: any;
	eventName: String;
	eventDescription: String;
	eventLocation: String;
	eventCoordinates: any;
	eventStartDatetime: String | Moment;
	// eventEndDatetime: Date;
	adminName: String;
	adminEmail: String;
	showEmail: Boolean;
}

class EventCreation extends React.Component<RouteComponentProps<any>, State> {
	state = {
		currentStep: 1,
		errors: {},
		touched: {
			// Is this been used anywhere!!!!
			eventName: false,
			// eventStartDatetime: false,
			adminEmail: false
		},
		eventName: '',
		eventDescription: '',
		eventLocation: '',
		eventCoordinates: null,
		eventStartDatetime: moment(),
		// eventEndDatetime: new Date(),
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
				eventName: urlParams.eventName as String
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

	componentDidUpdate = () => {
		const { location, match, history } = this.props;
		const { currentStep } = this.state;

		if (location.pathname === `${match.path}/admin-info`) {
			this.validateEventInfo(false).then(errors => {
				if (Object.keys(errors).length > 0) {
					history.push(`${match.path}/event-info`);
					return;
				}

				if (currentStep != 2) {
					this.setState({
						currentStep: 2
					});
				}
			});
		}

		if (location.pathname === `${match.path}/event-info` && currentStep !== 1) {
			this.setState({
				currentStep: 1
			});

			return;
		}
	};

	onFieldChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target as HTMLInputElement;

		let newState: any = {
			[input.name]: input.value,
			errors: Object.assign({}, this.state.errors)
		};

		if (input.name === 'eventName' && input.value !== '') {
			delete newState.errors.eventName;
		}

		if (input.name === 'adminEmail' && (input.value === '' || this.isValidEmail(input.value))) {
			delete newState.errors.adminEmail;
		}

		this.setState(newState);
	};

	onFieldFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
		const input = event.target as HTMLInputElement;

		this.setState({
			touched: Object.assign(this.state.touched, { [input.name]: true })
		});
	};

	// onStartDatetimeFocusHandler = (event: any) => {
	// 	event.persist();
	// 	console.log(event);
	// };

	isValidEmail = (email: String) => {
		return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
	};

	onFieldBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
		const input = event.target as HTMLInputElement;
		let errors: any = Object.assign(this.state.errors);

		switch (input.name) {
			case 'eventName':
				if (input.value === '') {
					errors = Object.assign(errors, { eventName: 'The event name is required!' });
				} else {
					delete errors.eventName;
				}
				break;
			case 'adminEmail':
				if (input.value !== '' && !input.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
					errors = Object.assign(errors, { adminEmail: 'This is not a valid email' });
				} else {
					delete errors.adminName;
				}
				break;
		}

		this.setState({
			errors
		});
	};

	// onStartdatetimeBlurHandler = (event: any) => {
	// 	const { eventStartDatetime } = this.state;
	// 	let errors: any = Object.assign(this.state.errors);

	// 	if (typeof eventStartDatetime === 'string' && eventStartDatetime !== '') {
	// 		errors = Object.assign(errors, { eventStartDatetime: 'The start datetime muss be a valid datetime' });
	// 	} else {
	// 		delete errors.eventStartDatetime;
	// 	}

	// 	this.setState({
	// 		errors
	// 	});
	// };

	onLocationChangeHandler = (eventLocation: any) => {
		this.setState({ eventLocation, eventCoordinates: null });
	};

	onLocationSelectHandler = (eventLocation: String, eventCoordinates: any) => {
		this.setState({
			eventLocation,
			eventCoordinates
		});
	};

	onStartDatetimeChangeHandler = (datetime: string | Moment) => {
		console.log(datetime);

		let newState: any = {
			eventStartDatetime: datetime,
			errors: Object.assign({}, this.state.errors)
		};

		if (typeof datetime === 'object' || datetime === '') {
			delete newState.errors.eventStartDatetime;
		}

		this.setState(newState);
	};

	validateEventInfo = (shouldUpdateState: boolean) => {
		const { eventName } = this.state;
		let errors: any = {}; // Object.assign(this.state.errors);

		return new Promise((resolve, reject) => {
			if (eventName === '') {
				errors = Object.assign(errors, { eventName: 'The event name is required!' });
			} else {
				delete errors.eventName;
			}

			if (shouldUpdateState) {
				this.setState(
					{
						errors
					},
					() => {
						resolve(errors);
					}
				);
			} else {
				resolve(errors);
			}
		});
	};

	onContinueHandler = (e: any) => {
		const { history } = this.props;
		const { errors } = this.state;

		e.preventDefault();

		this.validateEventInfo(true).then(errors => {
			if (Object.keys(errors).length > 0) return;

			this.setState({
				currentStep: 2
			});

			history.push('/new-event/admin-info');
		});
	};

	onCreateHandler = (event: React.MouseEvent<HTMLFormElement>) => {
		event.preventDefault();

		const { history } = this.props;
		const { eventName, adminName, adminEmail, eventStartDatetime, eventLocation, eventCoordinates } = this.state;

		let newEvent = {
			name: eventName,
			admin_name: adminName,
			admin_email: adminEmail,
			datetime: eventStartDatetime.unix(),
			place: eventLocation
		};

		if (eventCoordinates != null) {
			newEvent = Object.assign(newEvent, {
				place_coords: `${(eventCoordinates as any).lat}/${(eventCoordinates as any).lng}`
			});
		}

		createEvent(newEvent).then((newEvent: any) => {
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
			eventCoordinates,
			eventStartDatetime,
			// eventEndDatetime,
			adminName,
			adminEmail,
			showEmail,
			errors
		} = this.state;
		const { match } = this.props;

		return (
			<BodyWrapper>
				<Dialog.Dialog>
					<Dialog.ContentWrapper>
						{this.renderHeader()}
						<Form onSubmit={this.onCreateHandler}>
							<Redirect exact from="/new-event" to={`${match.path}/event-info`} />
							<Route
								path={`${match.path}/event-info`}
								render={() => (
									<GoogleAPI>
										{google => {
											if (!google) return null;

											return (
												<Fragment>
													<EventInfo
														onFieldChangeHandler={this.onFieldChangeHandler}
														onFieldFocusHandler={this.onFieldFocusHandler}
														onFieldBlurHandler={this.onFieldBlurHandler}
														onLocationChangeHandler={this.onLocationChangeHandler}
														onLocationSelectHandler={this.onLocationSelectHandler}
														onStartDatetimeChangeHandler={this.onStartDatetimeChangeHandler}
														errors={errors}
														eventName={eventName}
														eventDescription={eventDescription}
														eventLocation={eventLocation}
														eventStartDatetime={eventStartDatetime}
													/>
													<MapWrapper>
														<LocationMap google={google} location={eventLocation} position={eventCoordinates} onMapClicked={null} />
													</MapWrapper>
												</Fragment>
											);
										}}
									</GoogleAPI>
								)}
							/>
							<Route
								path={`${match.path}/admin-info`}
								render={() => (
									<AdminInfo
										onFieldChangeHandler={this.onFieldChangeHandler}
										onFieldFocusHandler={this.onFieldFocusHandler}
										onFieldBlurHandler={this.onFieldBlurHandler}
										errors={errors}
										adminName={adminName}
										adminEmail={adminEmail}
										showEmail={showEmail}
									/>
								)}
							/>
							{currentStep == 1 ? (
								<Button type="button" onClick={this.onContinueHandler} style={{ position: 'relative', top: '-700px' }}>
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
