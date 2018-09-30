import axios from 'axios';

const addPassenger = (newPassenger: any) => {
	const graphQLQuery = `
			mutation ($newPassenger: NewPassenger!) {
				newPassenger(input: $newPassenger) {
					id
          name
				}
			}
    `;

	return axios.post('http://localhost:3000/graphql', {
		query: graphQLQuery,
		variables: {
			newPassenger
		}
	});
};

const removePassenger = (passengerId: String) => {
	const graphQLQuery = `
			mutation ($deletePassenger: DeletePassenger!) {
				deletePassenger(input: $deletePassenger) {
					id
          name
				}
			}
		`;

	const deletePassenger = {
		id: passengerId
	};

	return axios.post('http://localhost:3000/graphql', {
		query: graphQLQuery,
		variables: {
			deletePassenger
		}
	});
};

export { addPassenger, removePassenger };
