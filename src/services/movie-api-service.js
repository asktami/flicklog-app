import { config } from '../config';
import TokenService from './token-service';

const MovieApiService = {
	getMoviesByTheme(theme) {
		// unprotected endpoint
		// will work even when logged in / not

		let url = `${config.EXTERNAL_ENDPOINT}/movie/${theme}?api_key=${config.API_KEY}&region=US|CA`;

		return fetch(url, {
			headers: {
				'content-type': 'application/json',
				authorization: `none`,
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	getMovies(query, pageNumber) {
		// unprotected endpoint
		// will work even when not logged in
		// pass AuthToken so can use loginUserId when logged in to join movies + watchlist records

		let url = `${config.EXTERNAL_ENDPOINT}/search/movie?language=en-US&page=1&include_adult=false&api_key=${config.API_KEY}&query=${query}&page=${pageNumber}`;

		if (TokenService.hasAuthToken()) {
			return fetch(url, {
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`,
				},
			}).then((res) =>
				!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
			);
		} else {
			return fetch(url, {
				headers: {
					'content-type': 'application/json',
					authorization: `none`,
				},
			}).then((res) =>
				!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
			);
		}
	},

	getMovieById(movie_id) {
		// unprotected endpoint
		// will work even when logged in / not

		const url = `${config.EXTERNAL_ENDPOINT}/movie/${movie_id}?api_key=${config.API_KEY}&language=en-US&append_to_response=videos,credits`;

		return fetch(url, {
			headers: {
				'content-type': 'application/json',
				authorization: `none`,
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	getMovie(movie_id) {
		// NOT protected endpoint
		// will work even when not logged in
		// pass AuthToken so can use loginUserId when logged in to join movies + watchlist records

		const url = `${config.EXTERNAL_ENDPOINT}/movie/${movie_id}?api_key=${config.API_KEY}&language=en-US&append_to_response=videos`;

		if (TokenService.hasAuthToken()) {
			return fetch(url, {
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`,
				},
			}).then((res) =>
				!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
			);
		} else {
			return fetch(url, {
				headers: {
					'content-type': 'application/json',
					authorization: `none`,
				},
			}).then((res) => {
				// NOTE: sometimes comes back with e.headers.get() is null and so errors with cannot ready property indexOf of null
				const isJSON =
					res.headers.get('content-type') !== null &&
					res.headers.get('content-type').indexOf('application/json') !== -1
						? res.headers.get('content-type').indexOf('application/json') !== -1
						: null;

				return !res.ok
					? isJSON
						? res.json().then((e) => Promise.reject(e))
						: res.text().then((e) => Promise.reject(e))
					: res.json();
			});
		}
	},
	getMovieReviews(movie_id) {
		// unprotected endpoint
		// will work even when not logged in
		// pass AuthToken so can use loginUserId when logged

		if (TokenService.hasAuthToken()) {
			return fetch(`${config.API_ENDPOINT}/movies/${movie_id}/reviews`, {
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`,
				},
			}).then((res) => {
				// NOTE: sometimes comes back with e.headers.get() is null and so errors with cannot ready property indexOf of null
				const isJSON =
					res.headers.get('content-type') !== null &&
					res.headers.get('content-type').indexOf('application/json') !== -1
						? res.headers.get('content-type').indexOf('application/json') !== -1
						: null;

				return !res.ok
					? isJSON
						? res.json().then((e) => Promise.reject(e))
						: res.text().then((e) => Promise.reject(e))
					: res.json();
			});
		} else {
			return fetch(`${config.API_ENDPOINT}/movies/${movie_id}/reviews`, {
				headers: {
					'content-type': 'application/json',
					authorization: `none`,
				},
			}).then((res) => {
				// NOTE: sometimes comes back with e.headers.get() is null and so errors with cannot ready property indexOf of null
				const isJSON =
					res.headers.get('content-type') !== null &&
					res.headers.get('content-type').indexOf('application/json') !== -1
						? res.headers.get('content-type').indexOf('application/json') !== -1
						: null;

				return !res.ok
					? isJSON
						? res.json().then((e) => Promise.reject(e))
						: res.text().then((e) => Promise.reject(e))
					: res.json();
			});
		}
	},
	getReview(review_id) {
		// protected endpoint
		return fetch(`${config.API_ENDPOINT}/reviews/${review_id}`, {
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},

	deleteReview(review_id) {
		// protected endpoint
		return fetch(`${config.API_ENDPOINT}/reviews/${review_id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		}).then(
			(res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : null)

			// WAS - SyntaxError: Unexpected end of JSON input
			// .then(res =>
			// 	!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	editReview(review) {
		// protected endpoint
		return fetch(`${config.API_ENDPOINT}/reviews/${review.id}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify(review),
		}).then(
			(res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : null)

			// WAS - SyntaxError: Unexpected end of JSON input
			// .then(res =>
			// 	!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},
	postReview(
		movie_id,
		review,
		rating,
		poster_path,
		backdrop_path,
		title,
		original_title,
		release_date,
		overview,
		vote_average,
		vote_count
	) {
		// protected endpoint
		return fetch(`${config.API_ENDPOINT}/reviews`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify({
				movie_id,
				review,
				rating,
				poster_path,
				backdrop_path,
				title,
				original_title,
				release_date,
				overview,
				vote_average,
				vote_count,
			}),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},

	getWatchList() {
		// protected endpoint
		// only get watchlist if have loginUserId

		// loginUserId is retrieved by API when it processes the AuthToken, via jwt-auth.js, which finds the user record using the username stored in the AuthToken and then adds the user record to the req object (i.e req.user = user)
		// so can get loginUserId via req.user.id

		// this will ALWAYS send the loginUserId BECAUSE of the authoriztion header, which has the AuthToken, which is set at time of 1st login with the user record id
		// see auth-api-service

		// only getWatchList IF logged in
		if (TokenService.getAuthToken()) {
			return fetch(`${config.API_ENDPOINT}/watchlist`, {
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`,
				},
			}).then((res) =>
				!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
			);
		}
	},

	addWatchListItem(
		movie_id,
		poster_path,
		backdrop_path,
		title,
		original_title,
		release_date,
		overview,
		vote_average,
		vote_count
	) {
		// protected endpoint
		return fetch(`${config.API_ENDPOINT}/watchlist/${movie_id}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify({
				movie_id,
				poster_path,
				backdrop_path,
				title,
				original_title,
				release_date,
				overview,
				vote_average,
				vote_count,
			}),
		}).then(
			(res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : null)

			// WAS - SyntaxError: Unexpected end of JSON input
			// .then(res =>
			// 	!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},

	deleteWatchListItem(movie_id) {
		// protected endpoint
		return fetch(`${config.API_ENDPOINT}/watchlist/${movie_id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		}).then(
			(res) => (!res.ok ? res.json().then((e) => Promise.reject(e)) : null)

			// WAS - SyntaxError: Unexpected end of JSON input
			// .then(res =>
			// 	!res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
		);
	},

	getReviewList() {
		// protected endpoint

		// only get reviews if have loginUserId
		// i.e. all reviews created by loginUserId

		// loginUserId is retrieved by API when it processes the AuthToken, via jwt-auth.js, which finds the user record using the username stored in the AuthToken and then adds the user record to the req object (i.e req.user = user)
		// so can get loginUserId via req.user.id

		// this will ALWAYS send the loginUserId BECAUSE of the authoriztion header, which has the AuthToken, which is set at time of 1st login with the user record id
		// see auth-api-service

		// only getReviews IF logged in
		if (TokenService.getAuthToken()) {
			return fetch(`${config.API_ENDPOINT}/reviews`, {
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`,
				},
			}).then((res) =>
				!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
			);
		}
	},
};

export default MovieApiService;
