import React from 'react';
import ReactDOM from 'react-dom';
import StarRating from './StarRating';

it('renders without crashing', () => {
	const div = document.createElement('div');
	const props = {
		rating: 3,
	};
	ReactDOM.render(<StarRating {...props} />, div);
	ReactDOM.unmountComponentAtNode(div);
});
