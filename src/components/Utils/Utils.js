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

export function getErrorMessage(error) {
	if (!error) return '';
	
	// If error has a message property, use it
	if (error.message) {
		return error.message;
	}
	
	// If error has status_message (from The Movie DB API), use it
	if (error.status_message) {
		return error.status_message;
	}
	
	// If error is a string, return it
	if (typeof error === 'string') {
		return error;
	}
	
	// If error is an object, try to extract a meaningful message
	if (typeof error === 'object') {
		// Try status_message first (The Movie DB API format)
		if (error.status_message) {
			return error.status_message;
		}
		// Try message
		if (error.message) {
			return error.message;
		}
		// Fall back to JSON string representation
		try {
			return JSON.stringify(error);
		} catch (e) {
			return 'An unknown error occurred';
		}
	}
	
	return 'An error occurred';
}
