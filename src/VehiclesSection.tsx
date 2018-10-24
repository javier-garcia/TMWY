import React from 'react';
import styled from 'styled-components';

import Vehicle from './interfaces/Vehicle';
import Passenger from './interfaces/Passenger';

import { removeVehicle } from './providers/vehicle.provider';
import { removePassenger } from './providers/passenger.provider';

import VehicleList from './VehicleList/VehicleList';
import VehicleDetail from './VehicleDetail/VehicleDetail';
import VehicleCreation from './VehicleCreation/VehicleCreation';

const Wrapper = styled.div`
	padding: 20px 50px;
	display: flex;
	flex-direction: column;
	width: 100%;
	overflow-y: auto;
	position: relative;
`;

interface Props {
	eventId: string;
	vehicles: Array<Vehicle>;
	onVehicleAdded: Function;
	onVehicleRemoved: Function;
	onPassengerAdded: Function;
	onPassengerRemoved: Function;
}

class VehiclesSection extends React.Component<Props> {
	state = {
		view: 'list',
		selectedVehicleId: null
	};

	getSelectedVehicleData = () => {
		const { vehicles } = this.props;
		const { selectedVehicleId } = this.state;

		return vehicles.find((vehicle: Vehicle) => {
			return vehicle.id === selectedVehicleId;
		});
	};

	onVehicleCreationClick = () => {
		this.setState({
			view: 'creation'
		});
	};

	onVehicleDetailClick = (vehicleId: number) => {
		this.setState({
			view: 'detail',
			selectedVehicleId: vehicleId
		});
	};

	onVehicleDetailCloseClick = () => {
		this.setState({
			view: 'list',
			selectedVehicleId: null
		});
	};

	onVehicleRemoveClick = (vehicleId: string) => {
		const { onVehicleRemoved } = this.props;

		removeVehicle(vehicleId).then((result: any) => {
			onVehicleRemoved(result.data.data.deleteVehicle);
		});
	};

	onVehicleAdded = (newVehicle: Vehicle) => {
		const { onVehicleAdded } = this.props;
		this.setState({
			view: 'list'
		});

		onVehicleAdded(newVehicle);
	};

	onPassengerAdded = (newPassenger: Passenger) => {
		const { onPassengerAdded } = this.props;
		const { selectedVehicleId } = this.state;

		onPassengerAdded(newPassenger, selectedVehicleId);
	};

	onPassengerRemoved = (passengerId: String) => {
		const { onPassengerRemoved } = this.props;
		const { selectedVehicleId } = this.state;

		removePassenger(passengerId).then((result: any) => {
			onPassengerRemoved(result.data.data.deletePassenger, selectedVehicleId);
		});
	};

	renderVehicleList = () => {
		const { vehicles } = this.props;
		return (
			<Wrapper>
				<VehicleList
					vehicles={vehicles}
					onVehicleCreation={this.onVehicleCreationClick}
					onVehicleDetail={this.onVehicleDetailClick}
					onVehicleRemove={this.onVehicleRemoveClick}
				/>
			</Wrapper>
		);
	};

	renderVehicleCreation = () => {
		const { eventId } = this.props;
		return (
			<Wrapper>
				<VehicleCreation
					eventId={eventId}
					onCloseClick={this.onVehicleDetailCloseClick}
					onVehicleAdded={this.onVehicleAdded}
				/>
			</Wrapper>
		);
	};

	renderVehicleDetail = () => {
		const vehicle = this.getSelectedVehicleData();
		return (
			<Wrapper>
				{vehicle ? (
					<VehicleDetail
						vehicle={vehicle}
						onPassengerAdded={this.onPassengerAdded}
						onPassengerRemoved={this.onPassengerRemoved}
						onCloseClick={this.onVehicleDetailCloseClick}
					/>
				) : (
					<p>Vehicle not found</p>
				)}
			</Wrapper>
		);
	};

	render() {
		const { view } = this.state;

		switch (view) {
			case 'detail':
				return this.renderVehicleDetail();
			case 'creation':
				return this.renderVehicleCreation();
			case 'list':
			default:
				return this.renderVehicleList();
		}
	}
}

export default VehiclesSection;
