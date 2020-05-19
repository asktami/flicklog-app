import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import MovieApiService from '../../services/movie-api-service';

import ValidationError from '../../ValidationError';

export default class AddReviewForm extends Component {
	static contextType = AppContext;

	state = {
		formValid: false,
		errorCount: null,
		review: '',
		errors: {
			review: '',
		},
	};

	updateErrorCount = () => {
		let errors = this.state.errors;
		let count = 0;

		Object.values(errors).forEach((val) => {
			if (val.length > 0) {
				count++;
			}
		});

		this.setState({ errorCount: count });
		let valid = count === 0 ? true : false;
		this.setState({ formValid: valid });
	};

	validateField = (name, value) => {
		let err = '';

		if (name === 'review') {
			if (value.length === 0) {
				err = 'You must enter a review';
			} else if (value.length < 5) {
				err = 'The review must be at least 5 characters long';
			}
		}

		const { errors } = { ...this.state };
		errors[name] = err;
		this.setState({ errors });
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value.trim() });

		this.validateField(name, value);
		this.updateErrorCount();
	};

	handleSubmit = (e) => {
		e.preventDefault();

		// do NOT submit form if any errors
		if (this.state.errorCount > 0) return;

		// get the form fields from the event
		const { movie, addReview, setError } = this.context;
		const { review, rating } = e.target;

		console.log('******* before add review, movie id = ', movie.id);

		console.log('******* before add review, movie d = ', JSON.stringify(movie));

		MovieApiService.postReview(
			movie.id,
			review.value,
			Number(rating.value),
			movie.poster_path,
			movie.backdrop_path,
			movie.title,
			movie.original_title,
			movie.release_date,
			movie.overview,
			movie.vote_average,
			movie.vote_count
		)
			.then(addReview)
			.then(() => {
				review.value = '';
				this.setState({ errorCount: null });
			})
			.catch(setError);
	};

	render() {
		const { errors } = this.state;

		if (this.context.error) {
			return <p className="error">{this.context.error}</p>;
		}
		return (
			<form onSubmit={this.handleSubmit}>
				<fieldset>
					<legend>Add a Review</legend>
					<div className="text">
						<textarea
							aria-label="Enter a review..."
							name="review"
							id="review"
							placeholder="Enter a review.."
							required
							aria-required="true"
							aria-describedby="reviewError"
							aria-invalid="true"
							onChange={this.handleChange}
						/>
						{errors.review.length > 0 && (
							<ValidationError message={errors.review} id={'reviewError'} />
						)}
						<br />
					</div>

					<select
						required
						aria-label="Rate this movie"
						type="number"
						name="rating"
						id="rating"
						aria-required="true"
						aria-invalid="true"
						onChange={this.handleChange}
					>
						{[1, 2, 3, 4, 5].map((rating) => (
							<option key={rating} value={rating}>
								{rating} Stars
							</option>
						))}
					</select>
					<br />
					<br />
					<button
						className="btn btn-as-link"
						disabled={this.state.formValid === false}
					>
						Save
					</button>
				</fieldset>

				{this.state.errorCount !== null ? (
					<p className="form-status">
						Form is {this.state.formValid ? 'complete  ✅' : 'incomplete  ❌'}
					</p>
				) : null}
			</form>
		);
	}
}
