import axios from 'axios';

const getEvent = (eventId: string): Promise<Event> => {
	const graphQLQuery = `
      {
        getEvent(id: "${eventId}") {
          id
					name
					description
					admin_name
					admin_email
					datetime
					place
					place_coords
					vehicles {
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
      }
    `;

	return new Promise((resolve, reject) => {
		axios
			.post('http://localhost:3000/graphql', { query: graphQLQuery })
			.then(result => {
				resolve(result.data.data.getEvent);
			})
			.catch(error => {
				reject(error);
			});
	});
};

const createEvent = (newEvent: any) => {
	const graphQLQuery = `
			mutation ($newEvent: NewEvent!) {
				newEvent(input: $newEvent) {
					id
					name
				}
			}
		`;

	return new Promise((resolve, reject) => {
		axios
			.post('http://localhost:3000/graphql', {
				query: graphQLQuery,
				variables: {
					newEvent
				}
			})
			.then(result => {
				resolve(result.data.data.newEvent);
			})
			.catch(error => {
				reject(error);
			});
	});
};

export { getEvent, createEvent };
