import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Route, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import moment, { Moment } from 'moment';

import { createEvent } from '../providers/event.provider';

import EventInfo from './EventInfo';
import AdminInfo from './AdminInfo';
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
	google: any;
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
		showEmail: true,
		google: null
	};

	googleMapsPromise: Promise<any> | null = null;

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

		if (!(window as any).google) {
			this.getGoogleMaps().then(google => {
				this.setState({
					google
				});
			});
		} else {
			this.setState({
				google: (window as any).google
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

	getGoogleMaps() {
		// If we haven't already defined the promise, define it
		if (!this.googleMapsPromise) {
			this.googleMapsPromise = new Promise(resolve => {
				// Add a global handler for when the API finishes loading
				(window as any).resolveGoogleMapsPromise = () => {
					// Resolve the promise
					resolve(google);

					// Tidy up
					delete (window as any).resolveGoogleMapsPromise;
				};

				// Load the Google Maps API
				const script = document.createElement('script');
				const API = 'AIzaSyDYIN0KCDEf7373llU54-yJS9BYGcOtI60';
				script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&libraries=places&callback=resolveGoogleMapsPromise`;
				script.async = true;
				document.body.appendChild(script);
			});
		}

		// Return a promise for the Google Maps API
		return this.googleMapsPromise;
	}

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
		const { eventName, adminName, adminEmail, eventStartDatetime, eventLocation } = this.state;

		createEvent({
			name: eventName,
			admin_name: adminName,
			admin_email: adminEmail,
			datetime: eventStartDatetime.unix(),
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
			eventCoordinates,
			eventStartDatetime,
			// eventEndDatetime,
			adminName,
			adminEmail,
			showEmail,
			errors,
			google
		} = this.state;
		const { match } = this.props;

		return (
			<BodyWrapper>
				<Dialog.Dialog>
					<Dialog.ContentWrapper>
						{this.renderHeader()}
						<Form onSubmit={this.onCreateHandler}>
							<Redirect from={match.path} to={`${match.path}/event-info`} />
							<Route
								path={`${match.path}/event-info`}
								render={() => {
									if (google === null) return null;

									return (
										<React.Fragment>
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
											<LocationMap google={google} location={eventLocation} position={eventCoordinates} onMapClicked={null} />
										</React.Fragment>
									);
								}}
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
