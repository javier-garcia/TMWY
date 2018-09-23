import React from 'react';

interface Props {
	passengers: Array<any>;
}

const PassengerList = ({ passengers }: Props) => {
	return (
		<ul>
			{passengers.map((passenger: any) => (
				<li key={passenger.id}>
					{passenger.name}
					<button type="button">
						<i className="icon icon-remove" />
					</button>
				</li>
			))}
		</ul>
	);
};

export default PassengerList;
