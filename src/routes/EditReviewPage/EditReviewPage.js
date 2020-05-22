import React from 'react';
import AppContext from '../../contexts/AppContext';
import MovieApiService from '../../services/movie-api-service';
import ValidationError from '../../ValidationError';

import Nav from '../../components/Nav/Nav';
import BackLink from '../../components/BackLink/BackLink';

export default class EditReviewPage extends React.Component {
	static contextType = AppContext;

	static defaultProps = {
		match: { params: {} },
		location: {},
		history: {
			push: () => {},
		},
	};

	state = {
		movie: this.context.movie,
		formValid: true,
		errorCount: null,
		id: '',
		review: '',
		rating: '',
		movie_id: '',
		errors: {
			review: '',
			rating: '',
		},
	};

	componentDidMount() {
		// this parameter name is defined in App.js private route
		const review_id = this.props.match.params.id;
		this.context.clearError();

		MovieApiService.getReview(review_id)
			.then(this.context.setReview)
			.then((responseData) => {
				this.setState({
					id: parseInt(responseData.id),
					review: responseData.review,
					rating: responseData.rating,
					movie_id: responseData.movie_id,
				});
			})
			.catch(this.context.setError);

		// test error
		// this.context.setError('Testing Error in EditReviewPage - getReview');
	}

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

		if (name === 'rating') {
			if (value.length === 0) {
				err = 'You must enter a rating';
			} else if (
				!Number.isInteger(parseInt(value)) ||
				parseInt(value) < 1 ||
				parseInt(value) > 5
			) {
				err = 'The rating must be a number between 1 and 5';
			}
		}

		const { errors } = { ...this.state };
		errors[name] = err;
		this.setState({ errors });
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });

		this.validateField(name, value);
		this.updateErrorCount();
	};

	handleClickCancel = () => {
		this.props.history.push(`/movies/${this.state.movie_id}`);
	};

	resetFields = (newFields) => {
		this.setState({
			id: newFields.id || '',
			review: newFields.review || '',
			rating: newFields.rating || '',
			movie_id: newFields.movie_id || '',
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		// do NOT submit form if any errors
		if (this.state.errorCount > 0) return;

		const updatedReview = {
			id: this.state.id,
			review: this.state.review,
			rating: parseInt(this.state.rating),
			modified: new Date(),
		};

		MovieApiService.editReview(updatedReview)
			.then(() => this.context.editReview(updatedReview))
			.then(() => {
				this.resetFields(updatedReview);

				// test error
				// this.context.setError('Testing Error in EditReviewPage - handleSubmit');

				this.props.history.goBack();
			})
			.catch(this.context.setError);
	};

	render() {
		const { movie, errors, review, rating } = this.state;
		const { error } = this.context;

		if (error) {
			return (
				<>
					<header>
						<Nav />
					</header>
					<main>
						<section>
							<p className="error">
								There was an error, please wait a few minutes and try again.
								<br />
								{error.message
									? error.message
									: JSON.parse(JSON.stringify(error))}
							</p>
						</section>
					</main>
				</>
			);
		}

		return (
			<>
				<header>
					<Nav />
				</header>
				<main>
					<section>
						<div className="card">
							<img
								src={movie.background}
								alt={movie.title}
								className="figure-image"
							/>

							<div className="card-body">
								<div className="btn-container">
									<BackLink label="icon" text="Back" />
								</div>

								<h3>{movie.title}</h3>
								<small>{movie.converted_release_date}</small>

								<div>
									<strong>{movie.tagline}</strong>
								</div>

								<div className="card-body-text">{movie.overview}</div>
							</div>
						</div>

						<form onSubmit={this.handleSubmit}>
							<fieldset>
								<legend></legend>
								<label htmlFor="review">Review</label>
								<textarea
									id="review"
									name="review"
									placeholder="Type a review.."
									required
									aria-required="true"
									aria-describedby="reviewError"
									aria-label="Edit review..."
									aria-invalid="true"
									value={review}
									onChange={this.handleChange}
								/>
								{errors.review.length > 0 && (
									<ValidationError id={'reviewError'} message={errors.review} />
								)}
								<label htmlFor="rating">Rating</label>
								<select
									id="rating"
									name="rating"
									aria-label="Rating"
									required
									aria-required="true"
									aria-describedby="ratingError"
									aria-invalid="true"
									value={rating}
									onChange={this.handleChange}
								>
									<option value="">Rate this Movie</option>
									{[1, 2, 3, 4, 5].map((rating) => (
										<option key={rating} value={rating}>
											{rating} Stars
										</option>
									))}
								</select>
								{errors.rating.length > 0 && (
									<ValidationError id={'ratingError'} message={errors.rating} />
								)}
								<div className="btn-container">
									<button
										className="btn btn-cancel"
										onClick={this.handleClickCancel}
									>
										Cancel
									</button>
									&nbsp;&nbsp;&nbsp;
									<button
										className="btn btn-save-review"
										disabled={this.state.formValid === false}
										type="submit"
									>
										Save
									</button>
								</div>
							</fieldset>

							{this.state.errorCount !== null ? (
								<p className="form-status">
									Form is{' '}
									{this.state.formValid ? 'complete  ✅' : 'incomplete  ❌'}
								</p>
							) : null}
						</form>
					</section>
				</main>
			</>
		);
	}
}
