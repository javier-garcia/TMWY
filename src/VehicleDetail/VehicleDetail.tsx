import React, { Fragment } from 'react';
import styled from 'styled-components';

import Vehicle from '../interfaces/vehicle';
import PassengerList from './PassengerList';
import BackArrowButton from '../shared/BackArrowButton';

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: #ffffff;
	padding: 20px 40px;

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

interface Props {
	vehicle: Vehicle | undefined;
	onCloseClick: Function;
}

const VehicleDetail = ({ vehicle, onCloseClick }: Props) => {
	const onCloseButtonClick = () => {
		onCloseClick();
	};

	const renderVehicle = () => {
		if (vehicle) {
			const datetimeString = new Date(parseInt(vehicle.start_datetime, 10)).toLocaleString();

			return (
				<Fragment>
					<div className="CarImageContainer">
						<img alt="car" src="https://www.dropbox.com/s/iyc7mn7h7zd2cgl/test.png?raw=1" />
					</div>
					<div className="CarInfoContainer">
						<div className="header">
							<h3>{`${vehicle.driver_name}'s Car`}</h3>
							<div>{`2 free seats of ${vehicle.free_seats} available`}</div>
							<div className="options">
								<button type="button">
									<i className="icon icon-edit" />
								</button>
								<button type="button">
									<i className="icon icon-remove" />
								</button>
							</div>
						</div>
						<Section>
							<div className="sectionTitle">Departure from</div>
							<p className="icon icon-location">{vehicle.start_point}</p>
						</Section>
						<Section>
							<div className="sectionTitle">Departure time</div>
							<p className="icon icon-time">{datetimeString}</p>
							<p className="meta">ETA: 20 Aug. 2018 - 10:30 (-1h 10m until event start)</p>
						</Section>
						<Section>
							<div className="sectionTitle">Comments</div>
							<p className="icon icon-comments">{vehicle.comments}</p>
						</Section>
						<div>
							<Section>
								<div className="sectionTitle">Passengers</div>
								<PassengerList passengers={vehicle.passengers} />
							</Section>
						</div>
					</div>
				</Fragment>
			);
		}

		return (
			<Fragment>
				<p>Vehicle not found</p>
			</Fragment>
		);
	};

	return (
		<Wrapper>
			<BackArrowButton onClick={onCloseButtonClick} />
			{renderVehicle()}
		</Wrapper>
	);
};

export default VehicleDetail;
