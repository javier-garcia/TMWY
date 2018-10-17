import React from 'react';
import styled from 'styled-components';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const ContentWrapper = styled.div`
	position: relative;

	.autocomplete-dropdown-container {
		position: absolute;
		box-shadow: 0px 4px 39px -6px rgba(0, 0, 0, 0.75);
		border: 1px solid #bbb;
		padding: 7px;
		background-color: #fff;

		.suggestion-item {
			background-color: rgb(255, 255, 255);
			cursor: pointer;
			margin: 8px 0px;
			color: #000;
		}

		&:empty {
			display: none;
		}
	}
`;

class LocationSearch extends React.Component<any> {
	state = {
		eventLocation: '',
		eventCoordinates: ''
	};

	onLocationChangeHandler = (eventLocation: any) => {
		this.setState({ eventLocation });
	};

	onLocationSelectHandler = (address: any) => {
		const { onLocationSelectHandler } = this.props;

		// console.log(address);
		geocodeByAddress(address).then((results: any) => {
			// console.log(results[0]);
			getLatLng(results[0])
				.then((latLng: any) => {
					console.log(latLng);
					/* this.setState({
						eventLocation: address,
						eventCoordinates: latLng
					}); */
					onLocationSelectHandler(address, latLng);
				})
				.catch((error: any) => console.error('Error', error));
		});
	};

	render = () => {
		const { placeholder, className, eventLocation, onLocationChange } = this.props;
		// @ts-ignore
		return (
			<ContentWrapper>
				<PlacesAutocomplete value={eventLocation} onChange={onLocationChange} onSelect={this.onLocationSelectHandler}>
					{({ getInputProps, suggestions, getSuggestionItemProps, loading }: any) => {
						return (
							<div style={{ position: 'relative' }}>
								<input
									{...getInputProps({
										placeholder,
										className
									})}
								/>
								<div className="autocomplete-dropdown-container">
									{loading && <div>Loading...</div>}
									{suggestions.map((suggestion: any) => {
										const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
										// inline style for demonstration purpose
										const style = suggestion.active
											? { backgroundColor: '#fafafa', cursor: 'pointer' }
											: { backgroundColor: '#ffffff', cursor: 'pointer' };
										return (
											<div
												{...getSuggestionItemProps(suggestion, {
													className,
													style
												})}
											>
												<span>{suggestion.description}</span>
											</div>
										);
									})}
								</div>
							</div>
						);
					}}
				</PlacesAutocomplete>
			</ContentWrapper>
		);
	};
}

export default LocationSearch;
