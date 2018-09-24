import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Vehicle from './interfaces/vehicle';

import EventDetail from './EventDetail';
import VehicleList from './VehicleList';

const Wrapper = styled.div`
	display: flex;
	height: 100%;
`;

interface Props {
	match: any;
}

interface Event {
	id: string;
	name: string;
	admin_name: string;
	place: string;
	vehicles: Array<Vehicle>;
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

		const graphQLQuery = `
      {
        getEvent(id: "${match.params.id}") {
          id
					name
					admin_name
					datetime
					place
					vehicles {
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
      }
		`;

		axios
			.post('http://localhost:3000/graphql', {
				query: graphQLQuery
			})
			.then(result => {
				this.setState({
					event: result.data.data.getEvent
				});
			});
	}

	onVehicleAdded = (vehicle: Vehicle) => {
		const { event } = this.state;
		//const newVehicleArray: Array<Vehicle> = [vehicle];

		if (event !== null) {
			const vehicles = [...event.vehicles, ...[vehicle]];

			const newEventState = Object.assign(event, { vehicles });

			this.setState({
				event: newEventState
			});
		}
	};

	onVehicleRemoved = (removedVehicle: Vehicle) => {
		const { event } = this.state;

		if (event !== null) {
			const vehicles = event.vehicles.filter((vehicle: Vehicle) => vehicle.id !== removedVehicle.id);

			const newEvent = Object.assign(event, { vehicles });

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
				<VehicleList
					vehicles={event.vehicles}
					eventId={event.id}
					onVehicleAdded={this.onVehicleAdded}
					onVehicleRemoved={this.onVehicleRemoved}
				/>
			</Wrapper>
		);
	}
}

export default EventDetailView;
