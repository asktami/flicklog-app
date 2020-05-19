import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import AppContext from '../../contexts/AppContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// using trackPromise so can use LoadingIndicator
import { trackPromise } from 'react-promise-tracker';

import MovieApiService from '../../services/movie-api-service';

class SearchForm extends Component {
	static contextType = AppContext;

	handleSubmit = async (e) => {
		e.preventDefault();
		this.context.setPageNumber(1);

		this.context.setPageName('Movies: ' + this.context.query);

		trackPromise(
			MovieApiService.getMovies(this.context.query, this.context.pageNumber)
				.then((res) => {
					const data = res;
					const movies = res.results;

					this.context.setTotalPages(data.total_pages);

					this.context.setMovieList(movies);
				})
				.catch(this.context.setError)
		);

		this.props.history.push(`/movies/search`);

		// uncontrolled search input field
		// to clear searchTerm from input after submit
		// document.getElementById('searchTerm').value = '';
	};

	render() {
		console.log('-------SearchForm props = ', this.props);
		return (
			<form
				id="searchForm"
				className="searchForm"
				onSubmit={(e) => this.handleSubmit(e)}
			>
				<label htmlFor="searchTerm" className="sr-only">
					Search
				</label>
				<input
					type="search"
					id="searchTerm"
					name="searchTerm"
					required
					aria-required="true"
					aria-label="Search for a flick"
					placeholder="Search for a flick..."
					results="5"
					onChange={(e) => this.context.handleInputChange(e)}
				/>
				<button className="btn-search" type="submit">
					<FontAwesomeIcon icon={['fa', 'search']} size="1x" />
				</button>
			</form>
		);
	}
}

export default withRouter(SearchForm);
