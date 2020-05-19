import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { AppProvider } from './contexts/AppContext';
import App from './components/App/App';
import './index.css';

import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

import {
	faChevronCircleUp as fasChevronCircleUp,
	faChevronCircleLeft as fasChevronCircleLeft,
	faCheck as fasCheck,
	faTimes as fasTimes,
	faPen as fasPen,
	faChevronDown,
	faChevronUp,
	faStar as fasStar,
	faSearch,
} from '@fortawesome/free-solid-svg-icons';

library.add(
	fab,
	faSearch,
	faChevronDown,
	faChevronUp,
	fasChevronCircleUp,
	farStar,
	fasStar,
	fasCheck,
	fasTimes,
	fasPen,
	fasChevronCircleLeft
);

/*
to use FontAwesome icons
1. import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

2. when icon prefix is the default "fas":
<FontAwesomeIcon icon="check-square" />
OR
<FontAwesomeIcon icon={['fas', 'chevron-circle-left']} size="1x" />

3. when icon prefix is "fab":
<FontAwesomeIcon icon={['fab', 'apple']} />

4. without React:
<i class="fas fa-chevron-circle-left fa-2x"></i>
*/

ReactDOM.render(
	<BrowserRouter basename={process.env.PUBLIC_URL}>
		<AppProvider>
			<App />
		</AppProvider>
	</BrowserRouter>,
	document.getElementById('root')
);
