import React, { Fragment } from 'react';

class EventInfo extends React.PureComponent<any> {
	onContinueHandler = () => {
		const { validateField } = this.props;

		validateField('eventName');

		// Formik validateField take a moment to update the errors
		setTimeout(this.checkErrorsAndNext, 5);
	};

	checkErrorsAndNext = () => {
		const { errors, nextButtonHandler } = this.props;

		if (Object.keys(errors).length <= 0) {
			nextButtonHandler();
		}
	};

	// onstartDatetimeChangeHandler = (datetime: string | Moment) => {
	// 	this.setState({
	// 		eventStartDatetime: datetime
	// 	});
	// };

	// onEndDatetimeChangeHandler = (datetime: string | Moment) => {
	// 	this.setState({
	// 		eventEndDatetime: datetime
	// 	});
	// };

	getEventStartDatetimeString() {
		const { eventStartDatetime } = this.props;

		return `${eventStartDatetime.toLocaleDateString()} ${eventStartDatetime.toLocaleTimeString()}`;
	}

	getEventEndDatetimeString() {
		const { eventEndDatetime } = this.props;

		return `${eventEndDatetime.toLocaleDateString()} ${eventEndDatetime.toLocaleTimeString()}`;
	}

	render = () => {
		const {
			onFieldChangeHandler,
			eventName,
			eventDescription,
			eventLocation,
			eventStartDatetime,
			eventEndDatetime
		} = this.props;

		return (
			<Fragment>
				<label htmlFor="eventName">
					Event name
					<input
						type="text"
						placeholder="Your event name"
						value={eventName}
						name="eventName"
						onChange={onFieldChangeHandler}
					/>
				</label>
				<label htmlFor="eventDescription">
					Event description
					<input
						type="text"
						placeholder="The best event ever"
						value={eventDescription}
						name="eventDescription"
						onChange={onFieldChangeHandler}
					/>
				</label>
				<label htmlFor="eventLocation">
					Where
					<input type="text" placeholder="TBD" value={eventLocation} name="eventLocation" onChange={onFieldChangeHandler} />
				</label>
				<label htmlFor="eventStartDatetime">
					When
					<input
						type="text"
						placeholder="TBD"
						value={this.getEventStartDatetimeString()}
						name="eventStartDatetime"
						onChange={onFieldChangeHandler}
					/>
				</label>
				<label htmlFor="eventEndDatetime">
					Until
					<input
						type="text"
						placeholder="TBD"
						value={this.getEventEndDatetimeString()}
						name="eventEndDatetime"
						onChange={onFieldChangeHandler}
					/>
				</label>
			</Fragment>
		);
	};
}

export default EventInfo;
