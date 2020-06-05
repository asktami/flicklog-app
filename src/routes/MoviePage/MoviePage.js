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

		trackPromise(
			MovieApiService.getMovieById(id)
				.then((movie) => {
					movie.user_id = this.context.loginUserId;

					this.context.setMovie(movie);

					// need to save movie.videos.results AND movie.credits.cast separately because when don't is not seen as an array of objects when I try to extract from context's movie object
					this.context.setVideos(movie.videos.results);

					this.context.setCast(movie.credits.cast);
				})
				.catch(this.context.setError)
		);

		MovieApiService.getMovieReviews(id)
			.then(this.context.setReviews)
			.catch(this.context.setError);

		// test error
		// this.context.setError('Testing Error in MoviePage');
	}

	componentWillUnmount() {
		this.context.clearMovie();
	}

	render() {
		const { error } = this.context;
		return (
			<>
				<header>
					<Nav />
				</header>
				<main>
					{error ? (
						<section>
							<p className="error">
								There was an error, please wait a few minutes and try again.
								<br />
								{error.message
									? error.message
									: JSON.parse(JSON.stringify(error))}
							</p>
						</section>
					) : (
						<section>
							<MoviePageItem />
							<LoadingIndicator />
						</section>
					)}
				</main>
			</>
		);
	}
}
