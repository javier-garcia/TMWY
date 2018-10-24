import React from 'react';
// import Datetime from 'react-datetime';
// @ts-ignore
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import moment from 'moment';

import LocationSearch from '../components/LocationSearch';

// import '../assets/stylesheets/react-datetime.css';
import '../assets/stylesheets/picker.min.css';

class EventInfo extends React.Component<any> {
	render = () => {
		const {
			onFieldChangeHandler,
			onFieldFocusHandler,
			onFieldBlurHandler,
			onLocationChangeHandler,
			onLocationSelectHandler,
			onStartDatetimeChangeHandler,
			errors,
			eventName,
			eventDescription,
			eventLocation,
			eventStartDatetime
		} = this.props;

		const shortcuts = {
			Today: moment()
		};

		return (
			<div style={{ overflow: 'auto', height: '440px', padding: '16px' }}>
				<label htmlFor="eventName">
					Event name *
					<input
						className={errors.eventName ? 'error' : ''}
						type="text"
						placeholder="Your event name"
						value={eventName}
						name="eventName"
						onChange={onFieldChangeHandler}
						onFocus={onFieldFocusHandler}
						onBlur={onFieldBlurHandler}
					/>
					{errors.eventName ? <span className="errorMessage">{errors.eventName}</span> : null}
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
					<LocationSearch
						className="location-search-input"
						placeholder="The event location"
						eventLocation={eventLocation}
						onLocationChange={onLocationChangeHandler}
						onLocationSelectHandler={onLocationSelectHandler}
					/>
				</label>
				<label htmlFor="eventStartDatetime">
					When
					<DatetimePickerTrigger
						moment={eventStartDatetime}
						shortcuts={shortcuts}
						onChange={onStartDatetimeChangeHandler}
						appendToBody
					>
						<input type="text" value={eventStartDatetime ? eventStartDatetime.format('YYYY-MM-DD HH:mm') : ''} readOnly />
					</DatetimePickerTrigger>
				</label>
				{/* <label htmlFor="eventEndDatetime">
					Until
					<input
						type="text"
						placeholder="TBD"
						value={this.getEventEndDatetimeString()}
						name="eventEndDatetime"
						onChange={onFieldChangeHandler}
					/>
    </label> */}
			</div>
		);
	};
}

export default EventInfo;
