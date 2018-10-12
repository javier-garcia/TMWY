import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

import VehicleCard from '../components/VehicleCard';

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
	vehicles: Array<any>;
	onVehicleCreation: MouseEventHandler;
	onVehicleDetail: Function;
	onVehicleRemove: Function;
}

const VehicleList = ({ vehicles, onVehicleCreation, onVehicleDetail, onVehicleRemove }: Props) => {
	return (
		<div>
			<NewCarSection>
				<p>Are you going to this event and have a car with free seats to share?</p>
				<button onClick={onVehicleCreation}>Add a car!</button>
			</NewCarSection>
			{vehicles.map(vehicle => (
				<VehicleCard key={vehicle.id} vehicle={vehicle} onDetailClick={onVehicleDetail} onRemoveClick={onVehicleRemove} />
			))}
		</div>
	);
};

export default VehicleList;
