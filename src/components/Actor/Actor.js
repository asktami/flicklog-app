import React from 'react';
import MISSING_IMG from '../../img/missing_image.png';

const Actor = ({ id, name, character, profile_path }) => {
	let pic = profile_path
		? 'https://image.tmdb.org/t/p/w138_and_h175_face' + profile_path
		: MISSING_IMG;

	return (
		<div className="actor">
			<a
				href={`https://www.themoviedb.org/person/${id}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src={pic} alt={name} />
			</a>
			<br />
			<span className="actor-name">{name}</span>
			<br />
			<span className="actor-character">{character}</span>
		</div>
	);
};

export default Actor;
