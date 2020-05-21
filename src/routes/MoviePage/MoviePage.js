import React, { Component } from 'react';

import AppContext from '../../contexts/AppContext';
import MovieApiService from '../../services/movie-api-service';

import Nav from '../../components/Nav/Nav';

// using trackPromise so can use LoadingIndicator
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

import MoviePageItem from './MoviePageItem';

export default class MoviePage extends Component {
	static contextType = AppContext;

	state = { wasClicked: null };

	componentDidMount() {
		this.context.clearError();

		const { id } = this.props.match.params;

		// scroll to top of widow when view page
		window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

		console.log(
			'------------ 1. MOVIEPAGE componentDidMount props = ',
			JSON.stringify(this.props)
		);
		console.log(
			'------------ 2. MOVIEPAGE componentDidMount params.id = ',
			this.props.match.params.id
		);
		console.log('------------ 3. MOVIEPAGE componentDidMount has id = ', id);

		trackPromise(
			MovieApiService.getMovieById(id)
				.then((movie) => {
					movie.user_id = this.context.loginUserId;

					this.context.setMovie(movie);

					// need to save movie.videos.results separately because when don't is not seen as an array of objects when I try to extract from context's movie object
					this.context.setVideos(movie.videos.results);
				})
				.catch(this.context.setError)
		);

		trackPromise(
			MovieApiService.getMovieReviews(id)
				.then(this.context.setReviews)
				.catch(this.context.setError)
		);
	}

	componentWillUnmount() {
		this.context.clearMovie();
	}

	render() {
		const { loginUserId } = this.context;

		return (
			<>
				<header>
					<Nav />
				</header>
				<main>
					<MoviePageItem
						loginUserId={loginUserId}
						addToWatchList={this.addToWatchList}
						removeFromWatchList={this.removeFromWatchList}
					/>
					<LoadingIndicator />
				</main>
			</>
		);
	}
}
