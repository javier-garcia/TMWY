import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Vehicle from './interfaces/vehicle';

import VehicleCard from './VehicleCard';
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
	eventId: string;
	vehicles: Array<Vehicle>;
	onVehicleAdded: Function;
	onVehicleRemoved: Function;
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

	onVehicleRemoveClick = (vehicleId: number) => {
		const { onVehicleRemoved } = this.props;

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

		axios
			.post('http://localhost:3000/graphql', {
				query: graphQLQuery,
				variables: {
					deleteVehicle
				}
			})
			.then((result: any) => {
				onVehicleRemoved(result.data.data.deleteVehicle);
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
					<VehicleCard
						key={vehicle.id}
						vehicle={vehicle}
						onDetailClick={this.onVehicleDetailClick}
						onRemoveClick={this.onVehicleRemoveClick}
					/>
				))}
			</Wrapper>
		);
	};

	onVehicleAdded = (newVehicle: Vehicle) => {
		const { onVehicleAdded } = this.props;
		this.setState({
			view: 'list'
		});

		onVehicleAdded(newVehicle);
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
			case 'creation':
				return this.renderVehicleCreation();
			case 'list':
			default:
				return this.renderVehicleList();
		}
	}
}

export default VehicleList;
