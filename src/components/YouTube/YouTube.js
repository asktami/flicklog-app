import React from 'react';
const YouTube = ({ title, id }) => {
	return (
		<div
			className="video"
			// style={{
			// 	position: 'relative',
			// 	paddingBottom: '56.25%' /* 16:9 */,
			// 	paddingTop: 25,
			// 	height: 0,
			// }}
		>
			<iframe
				title={title}
				// style={{
				// 	position: 'absolute',
				// 	top: 0,
				// 	left: 0,
				// 	width: '100%',
				// 	height: '100%',
				// }}
				src={`https://www.youtube.com/embed/${id}`}
				frameBorder="0"
			/>
		</div>
	);
};

export default YouTube;
