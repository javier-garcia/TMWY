import Coordinates from './interfaces/coordinates';

const getParsedCoordinates = (coordinatesAsString: String): Coordinates => {
	let splittedCoordenates: Array<string> = coordinatesAsString.split('/');

	return {
		lat: parseFloat(splittedCoordenates[0]),
		lng: parseFloat(splittedCoordenates[1])
	};
};

const isValidEmail = (email: String): boolean => {
	if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) return true;

	return false;
};

export { getParsedCoordinates, isValidEmail };
