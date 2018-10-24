import Vehicle from './Vehicle';

interface Event {
	id?: string;
	name: string;
	description?: string;
	admin_name?: string;
	admin_email?: string;
	datetime?: number;
	place?: string;
	place_coords?: string;
	vehicles?: Array<Vehicle>;
}

export default Event;
