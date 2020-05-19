import React from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BackLink = ({ label, text }) => {
	let history = useHistory();

	const handleClickGoBack = () => {
		history.goBack();
	};
	return (
		<>
			<button
				aria-expanded="false"
				aria-label="back-button"
				className="btn-as-link"
				onClick={handleClickGoBack}
			>
				{label === 'icon' ? (
					<>
						<FontAwesomeIcon icon={['fas', 'chevron-circle-left']} size="1x" />{' '}
						{text}
					</>
				) : (
					text
				)}
			</button>
			<br />
			<br />
		</>
	);
};

export default BackLink;
