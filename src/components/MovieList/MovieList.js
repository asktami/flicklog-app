import React from 'react';

import MovieListItem from '../../components/MovieListItem/MovieListItem';

const MovieList = (props) => {
	const { movies, onSavedList = false, showWatchListButton = '' } = props;

	const renderMovieList = () => {
		if (movies && movies.length > 0) {
			let unique_movie_list = [];
			return movies.map((movie, i) => {
				// can have more than 1 review record per user per movie
				// only for watchList and reviewList only show 1 instance of movie
				// for movie search lists show whatever is found

				if (
					onSavedList === true &&
					!unique_movie_list.includes(movie.movie_id)
				) {
					unique_movie_list.push(movie.movie_id);
					return (
						<MovieListItem
							key={movie.id}
							movie={movie}
							showWatchListButton={showWatchListButton}
						/>
					);
				} else if (onSavedList !== true) {
					return (
						<MovieListItem
							key={movie.id}
							movie={movie}
							showWatchListButton={showWatchListButton}
						/>
					);
				} else {
					return null;
				}
			});
		} else {
			return 'No results.';
		}
	};

	return renderMovieList();
};
export default MovieList;
