import React, { Component } from 'react';

const AppContext = React.createContext({
	movie: [],
	videos: [],
	reviews: [],
	movieList: [],
	watchList: [],
	reviewList: [],
	setPageName: () => {},
	setPageNumber: () => {},
	setTotalPages: () => {},
	setLoginUserId: () => {},
	setError: () => {},
	setQuery: () => {},
	clearError: () => {},
	setMovieList: () => {},
	setWatchList: () => {},
	setReviewList: () => {},
	setMovie: () => {},
	setVideos: () => {},
	setReviews: () => {},
	clearMovie: () => {},
	addReview: () => {},
	editReview: () => {},
	deleteReview: () => {},
	addWatchListItem: () => {},
	removeWatchListItem: () => {},
	showBackToTop: () => {},
	handleInputChange: () => {},
});
export default AppContext;

export class AppProvider extends Component {
	state = {
		loginUserId: '',
		error: null,
		query: '',
		movieList: [],
		watchList: [],
		reviewList: [],
		movie: [],
		videos: [],
		reviews: [],
		showBackToTop: false,
		pageName: '',
		pageNumber: 1,
		totalPages: 0,
	};

	setShowBackToTop = (show) => {
		this.setState({ showBackToTop: show });
	};

	setPageName = (pageName) => {
		this.setState({ pageName });
	};

	setPageNumber = (pageNumber) => {
		this.setState({ pageNumber });
	};

	setTotalPages = (totalPages) => {
		this.setState({ totalPages });
	};

	setLoginUserId = (id) => {
		this.setState({ loginUserId: id });
	};

	setError = (error) => {
		this.setState({ error });
	};

	clearError = () => {
		this.setState({ error: null });
	};

	setQuery = (q) => {
		this.setState({ query: q });
	};

	handleInputChange = async (e) => {
		await this.setQuery(e.target.value.trim());
	};

	setMovieList = (movieList) => {
		this.setState({ movieList });
	};

	setWatchList = (watchList) => {
		this.setState({ watchList });
	};

	setReviewList = (reviewList) => {
		this.setState({ reviewList });
	};

	setMovie = (movie) => {
		this.setState({ movie });
	};

	setVideos = (videos) => {
		this.setState({ videos });
	};

	setReviews = (reviews) => {
		this.setState({ reviews });
	};

	clearMovie = () => {
		this.setMovie([]);
		this.setReviews([]);
	};

	addReview = (review) => {
		this.setReviews([...this.state.reviews, review]);
	};

	editReview = (updatedReview) => {
		const newReviews = this.state.reviews.map((review) =>
			review.id !== updatedReview.id ? review : updatedReview
		);

		this.setReviews(newReviews);
	};

	deleteReview = (reviewId) => {
		const newReviews = this.state.reviews.filter(
			(review) => review.id !== reviewId
		);

		this.setReviews(newReviews);
	};

	addWatchListItem = ({ movie }) => {
		this.setWatchList([...this.state.watchList, movie]);
	};

	removeWatchListItem = (movieId) => {
		const newWatchList = this.state.watchList.filter(
			(watchlist) => watchlist.movie_id !== movieId
		);
		this.setWatchList(newWatchList);
	};

	render() {
		const value = {
			totalPages: this.state.totalPages,
			setTotalPages: this.setTotalPages,
			pageNumber: this.state.pageNumber,
			setPageNumber: this.setPageNumber,
			pageName: this.state.pageName,
			setPageName: this.setPageName,
			setLoginUserId: this.setLoginUserId,
			loginUserId: this.state.loginUserId,
			error: this.state.error,
			setError: this.setError,
			clearError: this.clearError,
			query: this.state.query,
			setQuery: this.setQuery,
			movieList: this.state.movieList,
			watchList: this.state.watchList,
			reviewList: this.state.reviewList,
			setMovieList: this.setMovieList,
			setWatchList: this.setWatchList,
			setReviewList: this.setReviewList,
			movie: this.state.movie,
			videos: this.state.videos,
			reviews: this.state.reviews,
			setMovie: this.setMovie,
			setVideos: this.setVideos,
			setReviews: this.setReviews,
			clearMovie: this.clearMovie,
			addReview: this.addReview,
			editReview: this.editReview,
			deleteReview: this.deleteReview,
			addWatchListItem: this.addWatchListItem,
			removeWatchListItem: this.removeWatchListItem,
			showBackToTop: this.showBackToTop,
			handleInputChange: this.handleInputChange,
		};
		return (
			<AppContext.Provider value={value}>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}
