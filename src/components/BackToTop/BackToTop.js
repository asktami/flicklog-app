import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BackToTop = ({ goBackToTop, showBackToTop, text }) => {
	return (
		<button
			id="back-to-top"
			className="btn back-to-top"
			onClick={goBackToTop}
			style={{ display: showBackToTop ? 'block' : 'none' }}
		>
			back to top
			<br />
			<FontAwesomeIcon icon={['fas', 'chevron-circle-up']} size="3x" /> {text}
		</button>
	);
};

export default BackToTop;
