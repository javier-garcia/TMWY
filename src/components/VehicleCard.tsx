import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import Vehicle from '../interfaces/Vehicle';

const CarCardWrapper = styled.article`
	box-sizing: border-box;
	width: 100%;
	border-radius: 40px;
	padding: 30px 44px;
	box-shadow: 0px 0px 26px 4px rgba(0, 0, 0, 0.28);
	background-color: #ffffff;
	margin: 50px auto 0;
	display: flex;

	img {
		width: 300px;
		height: 80%;
	}

	.header {
		position: relative;

		h3 {
			margin: 0;
			font-weight: 500;
			font-size: 32px;
			color: #260034;
			letter-spacing: -0.27px;
		}

		.options {
			position: absolute;
			top: 8px;
			right: 0;

			button {
				margin-left: 10px;

				.icon {
					width: 21px;
					height: 21px;
					display: block;
				}
			}
		}
	}

	.icon {
		position: relative;
		display: block;
	}

	.icon:before {
		content: '';
		width: 21px;
		height: 21px;
		left: 0;
		top: -1px;
		display: block;
		position: absolute;
		background-repeat: no-repeat;
		background-position: center center;
	}

	.icon.icon-location:before {
		background-image: url(/public/images/location_icon.svg);
	}

	.icon.icon-time:before {
		background-image: url(/public/images/clock_icon.svg);
	}

	.icon.icon-comments:before {
		background-image: url(/public/images/speech_icon.svg);
	}

	.icon.icon-edit:before {
		background-image: url(/public/images/edit_icon.svg);
	}

	.icon.icon-remove:before {
		background-image: url(/public/images/trash_icon.svg);
	}

	.actions {
		display: flex;
		justify-content: flex-end;
		margin-top: 42px;

		button {
			font-size: 14px;
			font-weight: 500;
			color: #9855ca;
			text-align: right;
			text-transform: uppercase;
			padding: 10px 20px;
		}

		button:hover {
			background-color: #eeeeee;
		}
	}
`;

const Section = styled.div`
	margin: 30px auto;

	.sectionTitle {
		font-size: 14px;
		color: #a6a6a6;
		text-transform: uppercase;
	}

	p {
		margin: 10px 0;

		&.icon {
			padding-left: 26px;
		}
	}

	.meta {
		font-size: 14px;
		color: rgba(38, 0, 52, 0.5);
		padding-left: 26px;
	}
`;

const Credits = styled.div`
	color: #260034;
	margin: 0 auto;
	display: table;

	a {
		color: #ffffff;
	}
`;

interface Props {
	vehicle: Vehicle;
	onDetailClick: Function;
	onRemoveClick: Function;
}

function VehicleCard({ vehicle, onDetailClick, onRemoveClick }: Props) {
	const datetimeString = moment.unix(vehicle.start_datetime!).format('dddd, DD/MM/YYYY, HH:mm');

	const onDetailButtonClick = () => {
		onDetailClick(vehicle.id);
	};

	const onRemoveButtonClick = () => {
		onRemoveClick(vehicle.id);
	};

	const getFreeSeats = (): Number => {
		return vehicle.free_seats - vehicle.passengers!.length;
	};

	const freeSeats = getFreeSeats();

	return (
		<div>
			<CarCardWrapper>
				<div className="CarImageContainer">
					<img alt="car" src="https://www.dropbox.com/s/iyc7mn7h7zd2cgl/test.png?raw=1" />
				</div>
				<div className="CarInfoContainer">
					<div className="header">
						<h3>{`${vehicle.driver_name}'s Car`}</h3>
						<div>{freeSeats > 0 ? `${freeSeats} free seats of ${vehicle.free_seats} available` : 'No seats available'}</div>
						<div className="options">
							<button type="button">
								<i className="icon icon-edit" />
							</button>
							<button type="button" onClick={onRemoveButtonClick}>
								<i className="icon icon-remove" />
							</button>
						</div>
					</div>
					<Section>
						<div className="sectionTitle">Departure from</div>
						<p className="icon icon-location">{vehicle.start_location}</p>
					</Section>
					<Section>
						<div className="sectionTitle">Departure time</div>
						<p className="icon icon-time">{datetimeString}</p>
						<p className="meta">ETA: 20 Aug. 2018 - 10:30 (-1h 10m until event start)</p>
					</Section>
					<div className="actions">
						<button type="button" onClick={onDetailButtonClick}>
							Show details
						</button>
					</div>
				</div>
			</CarCardWrapper>
			<Credits>
				<p>
					Car illustration by&nbsp;
					<a href="https://dribbble.com/Tahorin" rel="noopener noreferrer" target="_blank">
						Tahorin Jaman
					</a>
				</p>
			</Credits>
		</div>
	);
}

export default VehicleCard;
