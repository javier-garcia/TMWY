import React from 'react';
import styled from 'styled-components';

import Event from './interfaces/Event';
import Vehicle from './interfaces/Vehicle';
import Passenger from './interfaces/Passenger';

import { getEvent } from './providers/event.provider';

import EventDetail from './EventDetail';
import VehiclesSection from './VehiclesSection';

const Wrapper = styled.div`
	display: flex;
	height: 100%;
`;

interface Props {
	match: any;
}

interface State {
	event: null | Event;
}

class EventDetailView extends React.Component<Props, State> {
	state = {
		event: {
			id: '',
			name: '',
			admin_name: '',
			place: '',
			vehicles: []
		}
	};

	componentDidMount() {
		const { match } = this.props;

		getEvent(match.params.id).then((event: any) => {
			this.setState({
				event: event
			});
		});
	}

	onVehicleAdded = (newVehicle: Vehicle) => {
		const { event } = this.state;

		if (event !== null) {
			const vehicles = [...event.vehicles, ...[newVehicle]];

			const newEventState: Event = Object.assign(event, { vehicles });

			this.setState({
				event: newEventState
			});
		}
	};

	onVehicleRemoved = (removedVehicle: Vehicle) => {
		const { event } = this.state;

		if (event !== null) {
			const vehicles = event.vehicles.filter((vehicle: Vehicle) => vehicle.id !== removedVehicle.id);

			const newEventState = Object.assign(event, { vehicles });

			this.setState({
				event: newEventState
			});
		}
	};

	onPassengerAdded = (newPassenger: Passenger, vehicleId: String) => {
		const { event } = this.state;

		if (event !== null) {
			const vehicles = event.vehicles.map((vehicle: Vehicle) => {
				if (vehicle.id !== vehicleId) return vehicle;

				vehicle.passengers = [...vehicle.passengers!, ...[newPassenger]];

				return vehicle;
			});

			const newEventState = Object.assign(event, { vehicles });

			this.setState({
				event: newEventState
			});
		}
	};

	onPassengerRemoved = (removedPassenger: Passenger, vehicleId: String) => {
		const { event } = this.state;

		if (event != null) {
			const vehicles = event.vehicles.map((vehicle: Vehicle) => {
				if (vehicle.id !== vehicleId) return vehicle;

				vehicle.passengers = vehicle.passengers!.filter((passenger: Passenger) => {
					return passenger.id !== removedPassenger.id;
				});

				return vehicle;
			});

			const newEventState = Object.assign(event, { vehicles });

			this.setState({
				event: newEventState
			});
		}
	};

	render() {
		const { event } = this.state;

		if (event === null) {
			return <h1>Loading...</h1>;
		}

		return (
			<Wrapper>
				<EventDetail event={event} />
				<VehiclesSection
					vehicles={event.vehicles}
					eventId={event.id}
					onVehicleAdded={this.onVehicleAdded}
					onVehicleRemoved={this.onVehicleRemoved}
					onPassengerAdded={this.onPassengerAdded}
					onPassengerRemoved={this.onPassengerRemoved}
				/>
			</Wrapper>
		);
	}
}

export default EventDetailView;
