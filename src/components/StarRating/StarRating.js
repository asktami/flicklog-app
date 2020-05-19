import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StarRating = ({ rating }) => {
	const stars = [
		{ filled: false },
		{ filled: false },
		{ filled: false },
		{ filled: false },
		{ filled: false },
	];

	for (let i = 0; i < rating; i++) {
		stars[i].filled = true;
	}

	return (
		<span className="StarRating">
			{stars.map((star, index) => (
				<Star key={index} filled={star.filled} />
			))}
		</span>
	);
};

const Star = ({ filled }) => {
	const library = filled ? 'fas' : 'far';
	return <FontAwesomeIcon icon={[library, 'star']} />;
};

export default StarRating;
