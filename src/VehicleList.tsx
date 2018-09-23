import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Vehicle from './interfaces/vehicle';

import VehicleCard from './VehicleCard';
import VehicleDetail from './VehicleDetail/VehicleDetail';

const Wrapper = styled.div`
	padding: 20px 50px;
	display: flex;
	flex-direction: column;
	width: 100%;
	overflow-y: auto;
	position: relative;
`;

const NewCarSection = styled.div`
	border: 2px dashed rgba(0, 0, 0, 0.5);
	text-align: center;
	border-radius: 40px;
	padding: 40px 44px;
	color: #ffffff;
	background-color: rgba(255, 255, 255, 0.1);
	font-size: 20px;
	margin: 50px 0;

	button {
		background-color: #ffffff;
		font-size: 20px;
		text-transform: uppercase;
		padding: 20px 50px;
		border-radius: 10px;
	}
`;

interface Props {
	vehicles: Array<Vehicle>;
}

class VehicleList extends React.Component<Props> {
	state = {
		view: 'list',
		selectedVehicle: null
	};

	onVehicleCreationClick = () => {
		this.setState({
			view: 'creation'
		});
	};

	onVehicleDetailClick = (vehicleId: number) => {
		this.setState({
			view: 'detail',
			selectedVehicle: vehicleId
		});
	};

	onVehicleDetailCloseClick = () => {
		this.setState({
			view: 'list',
			selectedVehicle: null
		});
	};

	getSelectedVehicleData() {
		const { vehicles } = this.props;
		const { selectedVehicle } = this.state;

		return vehicles.find((vehicle: Vehicle) => vehicle.id === selectedVehicle);
	}

	renderVehicleList = () => {
		const { vehicles } = this.props;
		return (
			<Wrapper>
				<NewCarSection>
					<p>Are you going to this event and have a car with free seats to share?</p>
					<button onClick={this.onVehicleCreationClick}>Add a car!</button>
				</NewCarSection>
				{vehicles.map(vehicle => (
					<VehicleCard key={vehicle.id} vehicle={vehicle} onDetailClick={this.onVehicleDetailClick} />
				))}
				<VehicleCard
					key={'1234'}
					vehicle={{
						comments: 'Here the comments for the car.',
						driver_name: 'Javi',
						free_seats: 4,
						id: '5b99404118f29a3960085070',
						start_datetime: '',
						start_point: 'My Place',
						passengers: []
					}}
					onDetailClick={this.onVehicleDetailClick}
				/>
			</Wrapper>
		);
	};

	renderVehicleDetail = () => {
		const { vehicles } = this.props;

		return (
			<Wrapper>
				<VehicleDetail vehicle={this.getSelectedVehicleData()} onCloseClick={this.onVehicleDetailCloseClick} />
			</Wrapper>
		);
	};

	render() {
		const { view } = this.state;

		switch (view) {
			case 'detail':
				return this.renderVehicleDetail();
			case 'list':
			default:
				return this.renderVehicleList();
		}
	}
}

export default VehicleList;
