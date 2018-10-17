import React from 'react';
// @ts-ignore
import { Map, Marker } from 'google-maps-react';

const tempStyle = {
	position: 'relative',
	width: '410px',
	height: '668px',
	left: '433px',
	top: '-538px'
};

const intialPosition = { lat: 41.3850639, lng: 2.1734034999999494 }; // Required because google-maps-react fail if a new center attribute is set with value null

const LocationMap = ({ google, location, position, onMapClicked }: any) => {
	return (
		<Map
			google={google}
			zoom={14}
			center={position ? position : intialPosition}
			className={`eventLocationMap${position === null ? ' hidden' : ''}`}
			containerStyle={tempStyle}
			fullscreenControl={false}
			streetViewControl={false}
			onClick={onMapClicked}
		>
			{position !== null ? <Marker title={location} name={'SOMA'} position={position} /> : null}
		</Map>
	);
};

export default LocationMap;
