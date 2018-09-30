import React from 'react';

import Passenger from '../interfaces/passenger';

interface Props {
	passengers: Array<Passenger>;
	onPassengerRemoved: Function;
}

const PassengerList = ({ passengers, onPassengerRemoved }: Props) => {
	return (
		<ul>
			{passengers.map((passenger: Passenger) => {
				function onRemoveHandler() {
					onPassengerRemoved(passenger.id);
				}

				return (
					<li key={passenger.id}>
						{passenger.name}
						<button type="button" onClick={onRemoveHandler}>
							<i className="icon icon-remove" />
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export default PassengerList;
