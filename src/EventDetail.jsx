import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
	padding: 20px 50px;
`;

class EventDetail extends React.Component {
	state = {
		event: null
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

	render() {
		const { event } = this.state;

		if (event === null) {
			return <h1>Loading...</h1>;
		}

		const datetimeString = new Date(parseInt(event.datetime, 10)).toLocaleString();

		return (
			<Wrapper>
				<h1>{event.name}</h1>
				<p>(admin: {event.admin_name})</p>
				<p>When: {datetimeString}</p>
				<p>Where: {event.place}</p>
				<p>Vehicles: {event.vehicles.length > 0 ? event.vehicles.length : 'no vehicles yet'}</p>
				<ul>
					{event.vehicles.map(vehicle => (
						<li key={vehicle.id}>
							<h2>Driver name: {vehicle.driver_name}</h2>
							<span>({vehicle.free_seats} free seats)</span>
							<p>Passengers: {vehicle.passengers.length}</p>
							<ul>
								{vehicle.passengers.map(passenger => (
									<li key={passenger.id}>{passenger.name}</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</Wrapper>
		);
	}
}

EventDetail.propTypes = {
	match: PropTypes.any.isRequired // eslint-disable-line react/forbid-prop-types
};

export default EventDetail;
