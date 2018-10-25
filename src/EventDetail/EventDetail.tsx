import React, { Fragment } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import GoogleAPI from '../components/GoogleAPI';
import LocationMap from '../components/LocationMap';

import { getParsedCoordinates } from '../utils';

import Event from '../interfaces/Event';

const Wrapper = styled.div`
	height: 100%;
	padding: 20px 50px;
	background-image: linear-gradient(-180deg, #b4ec51 0%, #429321 100%);
	box-shadow: 4px 0 14px 0 rgba(0, 0, 0, 0.56);
	flex: 1;
	min-width: 400px;
`;

interface Props {
	event: Event;
}

class EventDetail extends React.PureComponent<Props> {
	render() {
		const { event } = this.props;
		const datetimeString = moment.unix(event.datetime!).format('dddd, DD/MM/YYYY, HH:mm');
		const eventCoords = event.place_coords ? getParsedCoordinates(event.place_coords!) : null;

		return (
			<Wrapper>
				<h1 contentEditable>{event.name}</h1>
				<p>{event.description}</p>
				<p>
					{event.admin_name !== '' ? (
						<Fragment>
							<strong>Admin:</strong>
							<br />
							{event.admin_email !== '' ? `( ${event.admin_email} )` : null}
						</Fragment>
					) : null}
				</p>
				<p>
					<strong>When:</strong>
					<br />
					{datetimeString}
				</p>
				<p>
					<strong>Where:</strong>
					<br />
					{event.place}
				</p>

				<div style={{ width: '100%', height: '30vh', position: 'relative', marginTop: '60px', border: '1px solid #aaa' }}>
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
