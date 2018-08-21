import React, { Fragment } from 'react';
import styled from 'styled-components';

function CarCard() {
	const Article = styled.article`
		box-sizing: border-box;
		width: 448px;
		border-radius: 40px;
		padding: 30px 44px;
		-webkit-box-shadow: 0px 0px 26px 4px rgba(0, 0, 0, 0.28);
		-moz-box-shadow: 0px 0px 26px 4px rgba(0, 0, 0, 0.28);
		box-shadow: 0px 0px 26px 4px rgba(0, 0, 0, 0.28);
		background-color: #ffffff;
		margin: 50px auto 0;

		img {
			width: 100%;
			height: 230px;
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

		.section {
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

	const Credits = styled.div`
		color: #260034;
		margin: 0 auto;
		display: table;

		a {
			color: #ffffff;
		}
	`;

	return (
		<Fragment>
			<Article>
				<img alt="car" src="https://www.dropbox.com/s/iyc7mn7h7zd2cgl/test.png?raw=1" />
				<div className="header">
					<h3>Javi&#39;s Car</h3>
					<div>2 free seats of 4 available</div>
					<div className="options">
						<button type="button">
							<i className="icon icon-edit" />
						</button>
						<button type="button">
							<i className="icon icon-remove" />
						</button>
					</div>
				</div>
				<div className="section">
					<div className="sectionTitle">Departure from</div>
					<p className="icon icon-location">Sants Train Station</p>
				</div>
				<div className="section">
					<div className="sectionTitle">Departure time</div>
					<p className="icon icon-time">20 Aug. 2018 - 10:30</p>
					<p className="meta">ETA: 20 Aug. 2018 - 10:30 (-1h 10m until event start)</p>
				</div>
				<div className="section">
					<div className="sectionTitle">Comments</div>
					<p className="icon icon-comments">
						This is a comment for this auto. Here one can write indication for the auto for example.
					</p>
				</div>
				<div className="actions">
					<button type="button">Show people</button>
					<button type="button">Show route</button>
				</div>
			</Article>
			<Credits>
				<p>
					Car illustration by&nbsp;
					<a href="https://dribbble.com/Tahorin" rel="noopener noreferrer" target="_blank">
						Tahorin Jaman
					</a>
				</p>
			</Credits>
		</Fragment>
	);
}

export default CarCard;
