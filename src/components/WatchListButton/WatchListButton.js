import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../../contexts/AppContext';

import MovieApiService from '../../services/movie-api-service';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class WatchListButton extends Component {
	static contextType = AppContext;

	state = { isClicked: false };

	// NOTE: I use document.body.style.cursor and state 'isClicked' because of page render timing issues, to give feedback to user so that they see the app is adding to watchlist/removing from watchlist messages when the network is slow and that process is taking a while to complete; without it users complained that it looked like nothing was happening

	// a watchlist record has both the id AND logged in user's user_id

	// if stored watchList has this movie id then show the delete from watchlist button

	addToWatchList = (movie) => {
		this.setState({ isClicked: true });

		// change cursor
		document.body.style.cursor = 'wait';

		MovieApiService.addWatchListItem(
			movie.id,
			movie.poster_path,
			movie.backdrop_path,
			movie.title,
			movie.original_title,
			movie.release_date,
			movie.overview,
			movie.vote_average,
			movie.vote_count
		)
			.then(() => {
				MovieApiService.getWatchList().then((watchlistResult) => {
					MovieApiService.getMovieById(movie.id).then((movieResult) => {
						this.context.setWatchList(watchlistResult);
						this.context.setMovie(movieResult);

						// change cursor back
						document.body.style.cursor = 'default';
						this.setState({ isClicked: false });
					});
				});
			})
			.catch(this.context.setError);

		// test error
		// this.context.setError(
		// 	'Testing Error in WatchListButton - addWatchListItem'
		// );
	};

	removeFromWatchList = (movieId) => {
		this.setState({ isClicked: true });

		this.context.removeWatchListItem(movieId);

		// change cursor
		document.body.style.cursor = 'wait';

		MovieApiService.deleteWatchListItem(movieId)
			.then(() => {
				MovieApiService.getWatchList().then((watchlistResult) => {
					this.context.setWatchList(watchlistResult);

					// change cursor back
					document.body.style.cursor = 'default';
					this.setState({ isClicked: false });
				});
			})
			.catch(this.context.setError);

		// test error
		// this.context.setError(
		// 	'Testing Error in WatchListButton - deleteWatchListItem'
		// );
	};

	renderWatchListButton = (movie) => {
		const { loginUserId, watchList } = this.context;

		// find id in watchlist array of movie objects
		let foundMovie = watchList.filter(
			(obj) => parseInt(obj.id) === parseInt(movie.id)
		);

		let hasMovie = foundMovie.length > 0 ? true : false;

		if (loginUserId === '') {
			return (
				<Link to={`/movies/${movie.id}/add-to-watchlist`} className="btn">
					<FontAwesomeIcon icon={['fas', 'check']} size="1x" /> Add to WatchList
				</Link>
			);
		}

		if (loginUserId !== '') {
			return (
				<div>
					{hasMovie ? (
						<button
							className="btn btn-as-link"
							aria-label="remove-movie-from-watchlist-button"
							onClick={() => {
								this.removeFromWatchList(movie.id);
							}}
						>
							<FontAwesomeIcon icon={['fas', 'times']} size="1x" /> Remove from
							WatchList
						</button>
					) : (
						<button
							className="btn btn-as-link"
							aria-label="add-movie-to-watchlist-button"
							onClick={() => {
								this.addToWatchList(movie);
							}}
						>
							<FontAwesomeIcon icon={['fas', 'check']} size="1x" /> Add to
							WatchList
						</button>
					)}
				</div>
			);
		}
	};

	render() {
		const { isClicked } = this.state;

		if (isClicked === true) {
			return (
				<div>
					<button
						className="btn btn-as-link"
						aria-label="processing"
						disabled={true}
					>
						<FontAwesomeIcon icon={['fas', 'spinner']} size="1x" />
						&nbsp;&nbsp;Processing
					</button>
				</div>
			);
		} else {
			return this.renderWatchListButton(this.props);
		}
	}
}
