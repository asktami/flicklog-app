// to do - split into 2 different pages: MovieListContainer and MovieList

import React from 'react';
import MovieApiService from '../../services/movie-api-service';

// using trackPromise so can use LoadingIndicator
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

import MovieList from '../../components/MovieList/MovieList';

export default class LandingMovieList extends React.Component {
	state = {
		mounted: false,
		movies: null,
		error: null,
	};

	handleAPICall = (props) => {
		trackPromise(
			MovieApiService.getMoviesByTheme(props.theme)
				.then((data) => {
					this.setState({ movies: data.results });
				})
				.catch((error) => {
					this.setState({
						error: error.errors,
					});
				})
		);
	};

	componentDidUpdate(nextProps) {
		// reset page if items array has changed
		if (nextProps.url !== this.props.url && nextProps.url !== '') {
			this.setState({ mounted: true, url: nextProps.url });
			this.handleAPICall(nextProps);
		}
	}

	componentDidMount() {
		if (this.props.url !== '') {
			this.handleAPICall(this.props);
			this.setState({ mounted: true });
		}
	}
	componentWillUnmount() {
		this.setState({ mounted: false });
	}

	render() {
		return (
			<section data-loaded={this.state.mounted}>
				<h2>{this.props.title}</h2>
				<div className="horizontal-scroll">
					<MovieList movies={this.state.movies} />
				</div>

				<LoadingIndicator />
			</section>
		);
	}
}
