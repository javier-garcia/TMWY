import React from 'react';

interface Props {
	children(google: any): JSX.Element | null;
}

class GoogleAPI extends React.Component<Props, any> {
	state = {
		google: null
	};

	googleMapsPromise: Promise<any> | null = null;

	getGoogleMaps = () => {
		// If we haven't already defined the promise, define it
		if (!this.googleMapsPromise) {
			this.googleMapsPromise = new Promise(resolve => {
				// Add a global handler for when the API finishes loading
				(window as any).resolveGoogleMapsPromise = () => {
					// Resolve the promise
					resolve(google);

					// Tidy up
					delete (window as any).resolveGoogleMapsPromise;
				};

				// Load the Google Maps API
				const script = document.createElement('script');
				const API = 'AIzaSyCmprk1ltMHMHzlpgVp8ySC-2pVkVpp48o';
				script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&libraries=places&callback=resolveGoogleMapsPromise`;
				script.async = true;
				document.body.appendChild(script);
			});
		}

		// Return a promise for the Google Maps API
		return this.googleMapsPromise;
	};

	componentDidMount = () => {
		if (!(window as any).google) {
			this.getGoogleMaps().then(google => {
				this.setState({
					google
				});
			});
		} else {
			this.setState({
				google: (window as any).google
			});
		}
	};

	render = () => this.props.children(this.state.google);
}

export default GoogleAPI;
