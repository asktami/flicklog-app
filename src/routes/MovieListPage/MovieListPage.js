import React, { Component } from 'react';

import AppContext from '../../contexts/AppContext';

import MovieApiService from '../../services/movie-api-service';

import Nav from '../../components/Nav/Nav';
import SearchForm from '../../components/SearchForm/SearchForm';
import Pagination from '../../components/Pagination/Pagination';

// using trackPromise so can use LoadingIndicator
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

import MovieList from '../../components/MovieList/MovieList';

export default class MovieListPage extends Component {
	static contextType = AppContext;

	static defaultProps = {
		match: { params: {} },
		location: {},
		history: {
			push: () => {},
		},
	};

	// change page
	handleChangePage = (pageNumber) => {
		this.context.clearError();
		this.context.setPageNumber(pageNumber);

		trackPromise(
			MovieApiService.getMovies(this.context.query, pageNumber)
				.then((res) => {
					const movies = res.results;

					// default = do not append search results
					this.context.setMovieList(movies);
				})
				.catch(this.context.setError)
		);

		// test error
		// this.context.setError('Testing Error in MovieListPage - handleChangePage');
	};

	loadMore = () => {
		// not reliable:
		// update state value based on previous state value, using Hooks
		// setPageNumber(prevPageNumber => prevPageNumber + 1);

		this.context.clearError();
		this.context.setPageNumber(this.context.pageNumber + 1);

		trackPromise(
			MovieApiService.getMovies(this.context.query, this.context.pageNumber + 1)
				.then((res) => {
					const movies = res.results;

					// append search results for loadMore
					this.context.setMovieList(this.context.movieList.concat(movies));
				})
				.catch(this.context.setError)
		);

		// test error
		// this.context.setError('Testing Error in MovieListPage - loadMore');
	};

	render() {
		const {
			error,
			totalPages,
			pageNumber,
			pageName,
			movieList = [],
		} = this.context;

		return (
			<>
				<header>
					<Nav />
					<SearchForm />
				</header>
				<main>
					{!error &&
					this.props.location.pathname.includes('/movies/search') &&
					totalPages !== 0 ? (
						<Pagination
							handleChangePage={this.handleChangePage}
							currentPage={pageNumber}
							totalPages={totalPages}
							loadMore={this.loadMore}
						/>
					) : null}
					<section>
						<h2>{pageName}</h2>
						{error ? (
							<p className="error">
								There was an error, please wait a few minutes and try again.
								<br />
								{error.message
									? error.message
									: JSON.parse(JSON.stringify(error))}
							</p>
						) : (
							<ul className="grid">
								<MovieList movies={movieList} />
							</ul>
						)}

						{error || pageNumber === totalPages || totalPages === 0 ? null : (
							<div className="center">
								<button
									className="btn"
									onClick={(e) => {
										this.loadMore();
									}}
								>
									Load More
								</button>
							</div>
						)}

						<LoadingIndicator />
					</section>
				</main>
			</>
		);
	}
}
