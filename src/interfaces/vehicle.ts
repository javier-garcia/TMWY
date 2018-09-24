interface Vehicle {
	id: string;
	driver_name: string;
	free_seats: number;
	start_point: string;
	start_datetime: string;
	comments: string;
	passengers: Array<any>;
}

export default Vehicle;
