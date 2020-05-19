import React from 'react';

export function Pipe() {
	return <span className="pipe">{' | '}</span>;
}

export function Required({ className, ...props }) {
	return (
		<span className={['required', className].join(' ')} {...props}>
			&#42;
		</span>
	);
}

export function convertDate(dateStr) {
	// to handle timezone, ensuring UTC time
	let date = new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
		// weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'America/New_York',
	});

	return date;
}
