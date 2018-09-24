import React, { SyntheticEvent } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

	onDriverNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target as HTMLInputElement;
		this.setState({
			driverName: input.value
		});
	};

	onDriverEmailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target as HTMLInputElement;
		this.setState({
			driverEmail: input.value
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

		const graphQLQuery = `
      mutation ($newVehicle: NewVehicle!) {
        newVehicle(input: $newVehicle) {
					id
						driver_name
						free_seats
						start_point
						start_datetime
						comments
						passengers {
							id
							name
						}
				}
      }
		`;

		const newVehicle = {
			event_id: eventId,
			driver_name: driverName,
			driver_email: driverEmail,
			free_seats: freeSeats
		};

		axios
			.post('http://localhost:3000/graphql', {
				query: graphQLQuery,
				variables: {
					newVehicle
				}
			})
			.then((result: any) => {
				console.log(result);
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
							type="text"
							placeholder="Driver name"
							value={driverName}
							id="driverName"
							onChange={this.onDriverNameChangeHandler}
						/>
					</label>

					<label htmlFor="driverEmail">
						Driver email
						<input
							type="text"
							placeholder="Driver email"
							value={driverEmail}
							id="driverEmail"
							onChange={this.onDriverEmailChangeHandler}
						/>
					</label>

					<label htmlFor="freeSeats">
						Free seats
						<input
							type="number"
							placeholder="Free seats"
							value={freeSeats}
							id="freeSeats"
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
