import React from 'react';

export default function ValidationError({ message, id }) {
	if (message) {
		return (
			<div id={id} className="error">
				<p>{message}</p>
			</div>
		);
	}

	return <></>;
}
