// @flow

import React from 'react';
import { injectGlobal } from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import CarCard from './CarCard';
import CreateEvent from './CreateEvent';
import EventDetailView from './EventDetailView';

const App = () => {
	injectGlobal`
    html {
      box-sizing: border-box;
    }

    html, body {
      margin: 0;
      height: 100%;
      min-height: calc(100% - 0);
    }

    *, *:before, *:after {
      box-sizing: inherit;
    }

    body {
      background-image: linear-gradient(-134deg, #3023AE 0%, #C86DD7 100%);
      margin: 0;
      font-family: Ubuntu;
    }

    #app {
      height: 100%;
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
				<Route path="/event/:id" component={EventDetailView} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
