// @flow

import React from 'react';
import { injectGlobal } from 'styled-components';
// import CarCard from './CarCard';
import CreateEvent from './CreateEvent';

const App = () => {
	injectGlobal`
    html {
      height: 100%;
      box-sizing: border-box;
    }

    *, *:before, *:after {
      box-sizing: inherit;
    }

    body {
      background-image: linear-gradient(-134deg, #3023AE 0%, #C86DD7 100%);
      margin: 0;
      font-family: Ubuntu;
    }

    button {
      outline: none;
      border: none;
      background-color: transparent;
      cursor: pointer;
    }
  `;

	return (
		<div>
			<CreateEvent />
		</div>
	);
};

export default App;
