import axios from 'axios';

const addVehicle = (newVehicle: any) => {
	const graphQLQuery = `
      mutation ($newVehicle: NewVehicle!) {
        newVehicle(input: $newVehicle) {
					id
						driver_name
						free_seats
						start_point
						start_datetime
						comments
						passengers {
							id
							name
						}
				}
      }
    `;

	return axios.post('http://localhost:3000/graphql', {
		query: graphQLQuery,
		variables: {
			newVehicle
		}
	});
};

export { addVehicle };
