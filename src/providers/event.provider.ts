import axios from 'axios';

const getEvent = (eventId: string) => {
	const graphQLQuery = `
      {
        getEvent(id: "${eventId}") {
          id
					name
					admin_name
					datetime
					place
					vehicles {
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
      }
    `;

	return axios.post('http://localhost:3000/graphql', {
		query: graphQLQuery
	});
};

export { getEvent };
