import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../../contexts/AppContext';

import MovieApiService from '../../services/movie-api-service';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class WatchListButton extends Component {
	static contextType = AppContext;

	state = { wasClicked: null };

	// NOTE: I use document.body.style.cursor and state 'wasClicked' because of page render timing issues, to give feedback to user so that they see the app is adding to watchlist/removing from watchlist messages when the network is slow and that process is taking a while to complete; without it users complained that it looked like nothing was happening

	// a watchlist record has both the id AND logged in user's user_id

	// if stored watchList has this movie id then show the delete from watchlist button

	addToWatchList = (props) => {
		// add movie to watchlist
		const movie = this.props;

		console.log('--- Add Watchlist movie.title = ', movie.title);
		console.log('--- Add Watchlist movie.id = ', movie.id);
		console.log('--- Add Watchlist movie.poster_path = ', movie.poster_path);
		console.log(
			'--- Add Watchlist movie.backdrop_path = ',
			movie.backdrop_path
		);

		// this.setState({ wasClicked: id });

		// this.context.addWatchListItem(id);

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

						this.setState({ wasClicked: null });
					});
				});
			})
			.catch(this.context.setError);
	};

	removeFromWatchList = (id) => {
		// remove movie from watchlist

		// this.setState({ wasClicked: id });

		this.context.removeWatchListItem(id);

		// change cursor
		document.body.style.cursor = 'wait';

		MovieApiService.deleteWatchListItem(id)
			.then(() => {
				MovieApiService.getWatchList().then((watchlistResult) => {
					this.context.setWatchList(watchlistResult);

					// change cursor back
					document.body.style.cursor = 'default';

					this.setState({ wasClicked: null });
				});
			})
			.catch(this.context.setError);
	};

	renderWatchListButton = (props) => {
		const { loginUserId, watchList } = this.context;
		const { id } = this.props;

		console.log('------ WatchListButton watchlist = ', watchList);
		console.log('------ WatchListButton id = ', id);

		// find id in watchlist array of movie objects
		let foundMovie = watchList.filter(
			(obj) => parseInt(obj.id) === parseInt(id)
		);

		let hasMovie = foundMovie.length > 0 ? true : false;

		console.log(
			'------ WatchListButton found movie = ',
			JSON.stringify(foundMovie)
		);

		console.log('------ WatchListButton hasMovie = ', hasMovie);

		if (loginUserId === '') {
			return (
				<Link to={`/movies/${id}/add-to-watchlist`} className="btn">
					<FontAwesomeIcon icon={['fas', 'check']} size="1x" /> Add to WatchList
				</Link>
			);
		}

		if (loginUserId !== '') {
			return (
				<div>
					{hasMovie ? (
						<>
							{id === this.state.wasClicked ? (
								<span className="processing">Removing ...</span>
							) : (
								<button
									className="btn btn-as-link"
									aria-label="remove-movie-from-watchlist-button"
									onClick={() => {
										this.removeFromWatchList(id);
										this.setState({ wasClicked: id });
									}}
								>
									<FontAwesomeIcon icon={['fas', 'times']} size="1x" /> Remove
									from WatchList
								</button>
							)}
						</>
					) : null}
					{!hasMovie ? (
						<>
							{id === this.state.wasClicked ? (
								<span className="processing">Processing ...</span>
							) : (
								<button
									className="btn btn-as-link"
									aria-label="add-movie-to-watchlist-button"
									onClick={() => {
										this.addToWatchList(props);
										this.setState({ wasClicked: id });
									}}
								>
									<FontAwesomeIcon icon={['fas', 'check']} size="1x" /> Add to
									WatchList
								</button>
							)}
						</>
					) : null}
				</div>
			);
		}
	};

	render() {
		return this.renderWatchListButton(this.props);
	}
}
