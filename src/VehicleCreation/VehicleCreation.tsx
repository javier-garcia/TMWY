import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
// @ts-ignore
import { DatetimePickerTrigger } from 'rc-datetime-picker';

import Vehicle from '../interfaces/Vehicle';
import { addVehicle } from '../providers/vehicle.provider';

import LocationSearch from '../components/LocationSearch';
import BackArrowButton from '../shared/BackArrowButton';
import Form from '../shared/styledComponents/Form';
import Button from '../shared/styledComponents/Button';

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: #ffffff;
	padding: 20px 40px;
`;

interface Props {
	eventId: string;
	onCloseClick: Function;
	onVehicleAdded: Function;
}

class VehicleCreation extends React.Component<Props> {
	state = {
		driverName: '',
		driverEmail: '',
		freeSeats: 4,
		startLocation: '',
		startCoordinates: '',
		startDatetime: moment(),
		comments: ''
	};

	driverNameRef = React.createRef<HTMLInputElement>();

	componentDidMount = () => {
		if (this.driverNameRef.current) {
			this.driverNameRef.current.focus();
		}
	};

	onFieldChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const input = event.target as HTMLInputElement;
		this.setState({
			[input.name]: input.value
		});
	};

	onFreeSeatsChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target as HTMLInputElement;
		this.setState({
			freeSeats: parseInt(input.value)
		});
	};

	onLocationChangeHandler = (startLocation: any) => {
		this.setState({ startLocation, startCoordinates: null });
	};

	onLocationSelectHandler = (startLocation: String, startCoordinates: any) => {
		this.setState({
			startLocation,
			startCoordinates
		});
	};

	formSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();

		const { eventId, onVehicleAdded } = this.props;
		const { driverName, driverEmail, freeSeats, startLocation, startCoordinates, startDatetime, comments } = this.state;

		let newVehicle: Vehicle = {
			event_id: eventId,
			driver_name: driverName,
			driver_email: driverEmail,
			free_seats: freeSeats,
			start_location: startLocation,
			start_datetime: startDatetime.unix(),
			comments
		};

		if (startCoordinates != null) {
			newVehicle = Object.assign(newVehicle, {
				start_coordinates: `${(startCoordinates as any).lat}/${(startCoordinates as any).lng}`
			});
		}

		addVehicle(newVehicle).then((newVehicle: any) => {
			onVehicleAdded(newVehicle);
		});
	};

	onStartDatetimeChangeHandler = (datetime: string | Moment) => {
		this.setState({
			startDatetime: datetime
		});
	};

	render() {
		const { onCloseClick } = this.props;
		const { driverName, driverEmail, freeSeats, startLocation, startDatetime, comments } = this.state;

		const shortcuts = {
			Today: moment()
		};

		return (
			<Wrapper>
				<BackArrowButton onClick={onCloseClick} />
				<Form onSubmit={this.formSubmitHandler}>
					<label htmlFor="driverName">
						Driver name
						<input
							ref={this.driverNameRef}
							type="text"
							placeholder="Driver name"
							value={driverName}
							name="driverName"
							onChange={this.onFieldChangeHandler}
						/>
					</label>

					<label htmlFor="driverEmail">
						Driver email
						<input
							type="text"
							placeholder="Driver email"
							value={driverEmail}
							name="driverEmail"
							onChange={this.onFieldChangeHandler}
						/>
					</label>

					<label htmlFor="freeSeats">
						Free seats
						<input
							type="number"
							placeholder="Free seats"
							value={freeSeats}
							name="freeSeats"
							onChange={this.onFreeSeatsChangeHandler}
						/>
					</label>

					<label htmlFor="location">
						Starting point
						<LocationSearch
							className="location-search-input"
							placeholder="The event location"
							location={startLocation}
							onLocationChange={this.onLocationChangeHandler}
							onLocationSelectHandler={this.onLocationSelectHandler}
						/>
					</label>

					<label htmlFor="startDatetime">
						When
						<DatetimePickerTrigger
							moment={startDatetime}
							shortcuts={shortcuts}
							onChange={this.onStartDatetimeChangeHandler}
							appendToBody
						>
							<input type="text" value={startDatetime ? startDatetime.format('DD-MM-YYYY HH:mm') : ''} readOnly />
						</DatetimePickerTrigger>
					</label>

					<label htmlFor="comments">
						Comments
						<textarea
							placeholder="Something more to say?"
							value={comments}
							name="comments"
							onChange={this.onFieldChangeHandler}
						/>
					</label>

					<div className="formButtons">
						<Button type="submit">Add car</Button>
					</div>
				</Form>
			</Wrapper>
		);
	}
}

export default VehicleCreation;
