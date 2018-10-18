import React from 'react';
import styled from 'styled-components';

import GoogleAPI from './components/GoogleAPI';
import LocationMap from './components/LocationMap';

const Wrapper = styled.div`
	height: 100%;
	padding: 20px 50px;
	background-image: linear-gradient(-180deg, #b4ec51 0%, #429321 100%);
	box-shadow: 4px 0 14px 0 rgba(0, 0, 0, 0.56);
`;

interface Props {
	event: any;
}

class EventDetail extends React.PureComponent<any> {
	getParsedCoordenates = () => {
		const { event } = this.props;

		if (event.place_coords == null) return null;

		let splittedCoordenates = event.place_coords.split('/');

		return {
			lat: splittedCoordenates[0],
			lng: splittedCoordenates[1]
		};
	};

	render() {
		const { event } = this.props;
		const datetimeString = new Date(parseInt(event.datetime, 10)).toLocaleString();
		const eventCoords = this.getParsedCoordenates();

		return (
			<Wrapper>
				<h1>{event.name}</h1>
				<p>(admin: {event.admin_name})</p>
				<p>When: {datetimeString}</p>
				<p>Where: {event.place}</p>

				<div style={{ width: '100%', height: '30vh', position: 'relative' }}>
					<GoogleAPI>
						{google => <LocationMap google={google} location={event.place} position={eventCoords} onMapClicked={null} />}
					</GoogleAPI>
				</div>
				<br />
			</Wrapper>
		);
	}
}

export default EventDetail;
