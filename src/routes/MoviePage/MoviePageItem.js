import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../../contexts/AppContext';

import WatchListButton from '../../components/WatchListButton/WatchListButton';

import AddReviewForm from '../../components/AddReviewForm/AddReviewForm';
import MovieReviews from '../../components/MovieReviews/MovieReviews';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackLink from '../../components/BackLink/BackLink';
import YouTube from '../../components/YouTube/YouTube';
import { convertDate } from '../../components/Utils/Utils';

import MISSING_IMG from '../../img/missing_image.png';

// alternative missing image placeholder
// const DEFAULT_PLACEHOLDER_IMAGE = 'https://via.placeholder.com/154';

export default class MoviePageItem extends Component {
	static contextType = AppContext;

	renderGenres = (genres) => {
		return (
			<div className="genre-container">
				{genres.map((g) => (
					<span key={g.id}>{g.name}</span>
				))}
			</div>
		);
	};

	renderYouTubes = () => {
		const { videos } = this.context;
		return (
			<ul>
				{videos.map((video) => (
					<li key={video.key}>
						<YouTube id={video.key} title={video.name} />
					</li>
				))}
			</ul>
		);
	};

	renderMovie() {
		const { movie, videos, loginUserId } = this.context;

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
		movie.converted_release_date = convertDate(movie.release_date);

		return (
			<>
				<div className="card">
					<img src={movie.background} alt={movie.title} />
					<div className="card-body">
						<div className="btn-container">
							<BackLink label="icon" text="Back" />
						</div>
						<h3>{movie.title}</h3>
						<small>{movie.converted_release_date}</small>
						<div>
							<strong>{movie.tagline}</strong>
						</div>
						<div>
							<FontAwesomeIcon icon={['fas', 'star']} size="1x" />
							&nbsp;
							{movie.vote_average * 10}%&nbsp;&nbsp;
							<span className="votes">({movie.vote_count}&nbsp;votes)</span>
						</div>
						{movie.genres && this.renderGenres(movie.genres)}
						<div className="card-body-text">
							{movie.overview}

							{movie.homepage && (
								<>
									<br />
									<br />
									<a
										href={movie.homepage}
										className="btn-as-link"
										target="_blank"
										rel="noopener noreferrer"
									>
										Visit homepage
									</a>
								</>
							)}
						</div>
						<div className="card-body-buttons">
							<WatchListButton {...movie} /> &nbsp;
							{loginUserId === '' ? (
								<Link to={`/movies/${movie.id}/add-review`} className="btn">
									<FontAwesomeIcon icon={['fas', 'pen']} size="1x" /> Review
								</Link>
							) : null}
						</div>

						{videos.length > 0 && this.renderYouTubes()}
					</div>
				</div>

				<MovieReviews />
				{loginUserId === '' ? null : <AddReviewForm />}
			</>
		);
	}

	render() {
		return this.renderMovie();
	}
}
