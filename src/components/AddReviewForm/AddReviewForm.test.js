import React from 'react';
import ReactDOM from 'react-dom';
import AddReviewForm from './AddReviewForm';

it('renders without crashing', () => {
	const div = document.createElement('div');
	const props = {
		review: '',
		rating: '',
	};
	ReactDOM.render(<AddReviewForm {...props} />, div);
	ReactDOM.unmountComponentAtNode(div);
});
