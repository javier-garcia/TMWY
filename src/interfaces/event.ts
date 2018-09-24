import Vehicle from './vehicle';

interface Event {
	id: string;
	name: string;
	admin_name: string;
	place: string;
	vehicles: Array<Vehicle>;
}

export default Event;
