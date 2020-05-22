import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import MovieApiService from '../../services/movie-api-service';
import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';

export default class MovieReviews extends Component {
	static contextType = AppContext;

	componentDidMount() {
		this.context.clearError();
	}

	handleClickDeleteReview = (review_id) => {
		this.context.clearError();

		MovieApiService.deleteReview(review_id)
			.then(() => this.context.deleteReview(review_id))
			.catch(this.context.setError);

		// test error
		// this.context.setError(
		// 	'Testing Error in MovieReviews - handleClickDeleteReview'
		// );
	};

	render() {
		const { error, loginUserId, reviews } = this.context;

		return (
			<>
				<ul className="review-list">
					<h3 className="movie-reviews-title">Reviews</h3>

					{error ? (
						<p className="error">
							There was an error, please wait a few minutes and try again.
							<br />
							{error.message
								? error.message
								: JSON.parse(JSON.stringify(error))}
						</p>
					) : null}

					{reviews.length === 0 && (
						<li className="review-item">
							<div className="review-text">No reviews.</div>
						</li>
					)}

					{(reviews || []).map((review) => (
						<li key={review.id} className="review-item">
							<div className="review-text">
								{review.review}
								<br />

								<div className="flex-row review-footer ">
									<div>
										<StarRating rating={review.rating} />
										<br />
										<span className="review-user">{review.fullname}</span>
									</div>
									{review.user_id === loginUserId ? (
										<div className="btn-container">
											<Link to={`/reviews/${review.id}`}>
												<button className="btn btn-as-link" type="submit">
													Edit
												</button>
											</Link>
											&nbsp;&nbsp;&nbsp;
											<button
												className="btn btn-as-link"
												onClick={() => this.handleClickDeleteReview(review.id)}
											>
												Delete
											</button>
										</div>
									) : null}
								</div>
							</div>
						</li>
					))}
				</ul>
			</>
		);
	}
}
