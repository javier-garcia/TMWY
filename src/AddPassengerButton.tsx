import React from 'react';

import Passenger from './interfaces/Passenger';
import { addPassenger } from './providers/passenger.provider';

interface Props {
	vehicleId: string;
	onPassengerAdded: Function;
}

class AddPassengerButton extends React.Component<Props> {
	state = {
		open: false,
		passengerName: ''
	};

	nameInputRef = React.createRef<HTMLInputElement>();

	onButtonClick = () => {
		this.setState(
			{
				open: true
			},
			() => {
				if (this.nameInputRef.current) {
					this.nameInputRef.current.focus();
				}
			}
		);
	};

	onPassengerNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target as HTMLInputElement;
		this.setState({
			passengerName: input.value
		});
	};

	formSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();

		const { vehicleId, onPassengerAdded } = this.props;
		const { passengerName } = this.state;

		const newPassenger: Passenger = {
			vehicle_id: vehicleId,
			name: passengerName,
			email: ''
		};

		addPassenger(newPassenger).then(result => {
			this.closeForm();

			onPassengerAdded(result.data.data.newPassenger);
		});
	};

	closeForm = () => {
		this.setState({
			open: false,
			passengerName: ''
		});
	};

	renderForm = () => {
		const { passengerName } = this.state;

		return (
			<div className="addPassengerInput">
				<form onSubmit={this.formSubmitHandler}>
					<input
						ref={this.nameInputRef}
						type="text"
						placeholder="Passenger name"
						value={passengerName}
						onChange={this.onPassengerNameChangeHandler}
					/>
					<button type="submit">add</button>
					<button type="button" onClick={this.closeForm}>
						cancel
					</button>
				</form>
			</div>
		);
	};

	render() {
		const { open } = this.state;

		return (
			<div className="addPassengerButton">
				{!open ? <button onClick={this.onButtonClick}>Add passengers</button> : this.renderForm()}
			</div>
		);
	}
}

export default AddPassengerButton;
