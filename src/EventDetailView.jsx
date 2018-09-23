import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import EventDetail from './EventDetail';
import VehicleList from './VehicleList';

const Wrapper = styled.div`
	display: flex;
	height: 100%;
`;

class EventDetailView extends React.Component {
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

	render() {
		const { event } = this.state;

		if (event === null) {
			return <h1>Loading...</h1>;
		}

		return (
			<Wrapper>
				<EventDetail event={event} />
				<VehicleList vehicles={event.vehicles} />
			</Wrapper>
		);
	}
}

EventDetailView.propTypes = {
	match: PropTypes.any.isRequired // eslint-disable-line react/forbid-prop-types
};

export default EventDetailView;
