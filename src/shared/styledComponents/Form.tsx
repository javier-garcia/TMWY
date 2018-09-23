import styled from 'styled-components';

const Form = styled.form`
	margin-top: 24px;

	label {
		font-size: 13px;
		color: #6ab231;
		text-transform: uppercase;
		display: block;
		margin-top: 20px;
	}

	input {
		border: none;
		border-bottom: 2px solid #260034;
		width: 100%;
		font-size: 32px;
		padding: 8px 0;
		margin-top: 7px;

		&::placeholder {
			color: rgba(38, 0, 52, 0.22);
		}

		&:focus {
			outline: none;
			border-bottom: 2px solid #6ab231;
		}
	}
`;

export default Form;
