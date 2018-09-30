import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';

import { addVehicle } from '../providers/vehicle.provider';

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
		freeSeats: 4
	};

	driverNameRef = React.createRef<HTMLInputElement>();

	componentDidMount = () => {
		if (this.driverNameRef.current) {
			this.driverNameRef.current.focus();
		}
	};

	onFieldChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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

	formSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();

		const { eventId, onVehicleAdded } = this.props;
		const { driverName, driverEmail, freeSeats } = this.state;

		const newVehicle = {
			event_id: eventId,
			driver_name: driverName,
			driver_email: driverEmail,
			free_seats: freeSeats
		};

		addVehicle(newVehicle).then((result: any) => {
			onVehicleAdded(result.data.data.newVehicle);
		});
	};

	render() {
		const { onCloseClick } = this.props;
		const { driverName, driverEmail, freeSeats } = this.state;

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

					<div className="formButtons">
						<Button type="submit">Add car</Button>
					</div>
				</Form>
			</Wrapper>
		);
	}
}

export default VehicleCreation;
