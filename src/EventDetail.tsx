import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	height: 100%;
	padding: 20px 50px;
	background-image: linear-gradient(-180deg, #b4ec51 0%, #429321 100%);
	box-shadow: 4px 0 14px 0 rgba(0, 0, 0, 0.56);
`;

interface Props {
	event: any;
}

function EventDetail({ event }: Props) {
	const datetimeString = new Date(parseInt(event.datetime, 10)).toLocaleString();

	return (
		<Wrapper>
			<h1>{event.name}</h1>
			<p>(admin: {event.admin_name})</p>
			<p>When: {datetimeString}</p>
			<p>Where: {event.place}</p>

			<div style={{ width: '100%' }}>
				<iframe
					title="mapa"
					width="100%"
					height="200"
					src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
					frameBorder="0"
					scrolling="no"
					marginHeight={0}
					marginWidth={0}
				>
					<a href="https://www.maps.ie/create-google-map/">Create Google Map</a>
				</iframe>
			</div>
			<br />
		</Wrapper>
	);
}

export default EventDetail;
