import Passenger from './Passenger';

interface Vehicle {
	id?: string;
	event_id: string;
	driver_name: string;
	driver_email?: string;
	free_seats: number;
	start_location?: String;
	start_coordinates?: string;
	start_datetime?: number;
	comments?: string;
	passengers?: Array<Passenger>;
}

export default Vehicle;
