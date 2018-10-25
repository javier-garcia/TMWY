import axios from 'axios';
import { resolve } from 'dns';

const addVehicle = (newVehicle: any) => {
	const graphQLQuery = `
      mutation ($newVehicle: NewVehicle!) {
        newVehicle(input: $newVehicle) {
					id
						driver_name
						free_seats
						start_location
						start_coordinates
						start_datetime
						comments
						passengers {
							id
							name
						}
				}
      }
    `;

	return new Promise((resolve, reject) => {
		axios
			.post('http://localhost:3000/graphql', {
				query: graphQLQuery,
				variables: {
					newVehicle
				}
			})
			.then(result => {
				resolve(result.data.data.newVehicle);
			})
			.catch(error => {
				reject(error);
			});
	});
};

const removeVehicle = (vehicleId: string) => {
	const graphQLQuery = `
      mutation ($deleteVehicle: DeleteVehicle!) {
        deleteVehicle(input: $deleteVehicle) {
					id,
					driver_name
				}
      }
		`;

	const deleteVehicle = {
		id: vehicleId
	};

	return new Promise((resolve, reject) => {
		axios
			.post('http://localhost:3000/graphql', {
				query: graphQLQuery,
				variables: {
					deleteVehicle
				}
			})
			.then(result => {
				resolve(result.data.data.deleteVehicle);
			})
			.catch(error => {
				reject(error);
			});
	});
};

export { addVehicle, removeVehicle };
