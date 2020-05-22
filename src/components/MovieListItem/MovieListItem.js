import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import WatchListButton from '../../components/WatchListButton/WatchListButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertDate } from '../Utils/Utils';

import MISSING_IMG from '../../img/missing_image.png';

// alternative missing image placeholder
// const DEFAULT_PLACEHOLDER_IMAGE = 'https://via.placeholder.com/154';

const MovieListItem = (props) => {
	const { movie, showWatchListButton } = props;

	// update stored movie.background
	// let background_test = DEFAULT_PLACEHOLDER_IMAGE;
	movie.background = movie.poster_path
		? 'https://image.tmdb.org/t/p/w300' + movie.poster_path
		: movie.backdrop_path
		? `https://image.tmdb.org/t/p/w154${movie.backdrop_path}`
		: MISSING_IMG;

	// update stored movie.title
	if (!movie.title) {
		movie.title = movie.original_title;
	}

	// update stored movie.converted_release_date
	// handle that postgres adds a timestamp to the field which I don't want
	if (movie.release_date !== undefined && movie.release_date.includes('T')) {
		movie.converted_release_date = convertDate(
			movie.release_date.split('T')[0]
		);
	} else {
		movie.converted_release_date = convertDate(movie.release_date);
	}

	return (
		<figure>
			<img src={movie.background} alt={movie.title} className="figure-image" />
			<figcaption>
				<Link to={`/movies/${movie.id}`}>{movie.title}</Link>
				<br />
				{movie.converted_release_date}
				{showWatchListButton ? (
					<>
						<br />
						<WatchListButton {...movie} />{' '}
					</>
				) : null}

				<div className="overlay">
					<p className="overlay-text">
						<FontAwesomeIcon icon={['fas', 'star']} size="1x" />
						&nbsp;
						{movie.vote_average * 10}%{' '}
						<span className="votes">{movie.vote_count}&nbsp;votes</span>
					</p>
				</div>
			</figcaption>
		</figure>
	);
};

export default MovieListItem;
