import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import MovieApiService from '../../services/movie-api-service';
import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';

export default class MovieReviews extends Component {
	static contextType = AppContext;

	handleClickDeleteReview = (review_id) => {
		MovieApiService.deleteReview(review_id)
			.then(() => this.context.deleteReview(review_id))
			.catch(this.context.setError);
	};

	render() {
		const { loginUserId, reviews } = this.context;

		return (
			<>
				<ul className="review-list">
					<h3 className="movie-reviews-title">Reviews</h3>
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
