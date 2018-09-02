import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class EventDetail extends React.Component {
	state = {
		event: null
	};

	componentDidMount() {
		const { match } = this.props;

		const graphQLQuery = `
      {
        getEvent(id: "${match.params.id}") {
          id
          name
        }
      }
    `;

		axios
			.post('http://localhost:3000/graphql', {
				query: graphQLQuery
			})
			.then(result => {
				this.setState({
					event: result.data.data.getEvent
				});
			});
	}

	render() {
		const { event } = this.state;

		return <h1>{event != null ? event.name : 'Loading...'}</h1>;
	}
}

EventDetail.propTypes = {
	match: PropTypes.any.isRequired // eslint-disable-line react/forbid-prop-types
};

export default EventDetail;
