import React, { Component } from 'react';

import AppContext from '../../contexts/AppContext';

import MovieApiService from '../../services/movie-api-service';

import Nav from '../../components/Nav/Nav';
import SearchForm from '../../components/SearchForm/SearchForm';

// using trackPromise so can use LoadingIndicator
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

import MovieList from '../../components/MovieList/MovieList';

export default class SavedMovieList extends Component {
	static contextType = AppContext;

	componentDidMount() {
		this.context.clearError();

		//-----------------------------------
		// get watchlist and reviewlist

		trackPromise(
			Promise.all([
				MovieApiService.getWatchList(),
				MovieApiService.getReviewList(),
			])
				.then((results) => {
					const watchlist = results[0];
					const reviews = results[1];

					this.context.setWatchList(watchlist);
					this.context.setReviewList(reviews);
				})
				.catch(this.context.setError)
		);
		//-----------------------------------
	}

	renderMovies() {
		const { watchList = [], reviewList = [] } = this.context;

		// do not use setPageName because that sets state and will cause an unending loop

		let movieList;
		let pageName;

		if (this.props.location.pathname === '/watchlist') {
			movieList = watchList;
			pageName = 'Watchlist';
		} else {
			movieList = reviewList;
			pageName = 'Reviews';
		}

		if (movieList.length === 0) {
			return (
				<>
					<h2>{pageName}</h2>
					<div className="center">No results.</div>
				</>
			);
		} else {
			return (
				<>
					<h2>{pageName}</h2>
					<ul className="grid">
						<MovieList
							onSavedList={true}
							showWatchListButton={pageName === 'Watchlist' ? true : false}
							movies={movieList}
						/>
					</ul>
				</>
			);
		}
	}

	render() {
		const { error } = this.context;

		return (
			<>
				<header>
					<Nav />
					<SearchForm />
				</header>
				<main>
					{this.context.error && (
						<p id="error" className="error">
							{'Error: ' + this.context.error}
						</p>
					)}
					<section>
						{error ? (
							<p className="error">
								There was an error, try again.
								<br />
								{error.message
									? error.message
									: JSON.parse(JSON.stringify(error))}
							</p>
						) : (
							this.renderMovies()
						)}
						<LoadingIndicator />
					</section>
				</main>
			</>
		);
	}
}
