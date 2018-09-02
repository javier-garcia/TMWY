// @flow

import React from 'react';
import { injectGlobal } from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import CarCard from './CarCard';
import CreateEvent from './CreateEvent';
import EventDetail from './EventDetail';

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
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={CreateEvent} />
				<Route path="/event/:id" component={EventDetail} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
