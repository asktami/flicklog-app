import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';

import Landing from '../../routes/LandingPage/LandingPage';

import MovieListPage from '../../routes/MovieListPage/MovieListPage';

import SavedMovieListPage from '../../routes/SavedMovieListPage/SavedMovieListPage';

import MoviePage from '../../routes/MoviePage/MoviePage';

import EditReviewPage from '../../routes/EditReviewPage/EditReviewPage';

import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';

import BackToTop from '../../components/BackToTop/BackToTop';

import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import IdleService from '../../services/idle-service';

import AppContext from '../../contexts/AppContext';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.ref_Top = React.createRef();
	}

	static contextType = AppContext;

	state = { hasError: false, showBackToTop: false };

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);

		this.updateLoginUserId();
		/*
		  set the function (callback) to call when a user goes idle
		  we'll set this to logout a user when they're idle
		*/
		IdleService.setIdleCallback(this.logoutFromIdle);

		/* if a user is logged in */
		if (TokenService.hasAuthToken()) {
			/*
			tell the idle service to register event listeners
			the event listeners are fired when a user does something, e.g. move their mouse
			if the user doesn't trigger one of these event listeners,
			  the idleCallback (logout) will be invoked
		  */
			IdleService.registerIdleTimerResets();

			/*
			Tell the token service to read the JWT, looking at the exp value
			and queue a timeout just before the token expires
		  */
			TokenService.queueCallbackBeforeExpiry(() => {
				/* the timeout will call this callback just before the token expires */
				AuthApiService.postRefreshToken();
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);

		/*
		  when the app un-mounts,
		  stop the event listeners that auto logout (clear the token from storage)
		*/
		IdleService.unRegisterIdleResets();
		/*
		  and remove the refresh endpoint request
		*/
		TokenService.clearCallbackBeforeExpiry();
	}

	logoutFromIdle = () => {
		/* remove the token from localStorage */
		TokenService.clearAuthToken();
		/* remove any queued calls to the refresh endpoint */
		TokenService.clearCallbackBeforeExpiry();
		/* remove the timeouts that auto logout when idle */
		IdleService.unRegisterIdleResets();
		/*
		  react won't know the token has been removed from local storage,
		  so we need to tell React to re-render
		*/
		this.forceUpdate();
	};

	updateLoginUserId = () => {
		let token = TokenService.getAuthToken();
		if (token) {
			let parsed = TokenService.parseJwt(token);
			let loginUserId = parsed.user_id;
			this.context.setLoginUserId(loginUserId);
		}
	};

	scrollToRef = (el) => {
		window.scrollTo({
			top: el.current.offsetTop,
			behavior: 'smooth',
		});
	};

	handleScroll = () => {
		if (window.scrollY === 0) {
			// back to top
			// hide back to top button
			// this.btnBackToTop.style.display = '';
			this.setState({
				showBackToTop: false,
			});
		} else {
			// scrolling
			// show back to top button
			// this.btnBackToTop.style.display = 'block';
			this.setState({
				showBackToTop: true,
			});
		}
	};

	render() {
		if (this.context.error) {
			return <p className="error">{this.context.error}</p>;
		}

		return (
			<>
				<div ref={this.ref_Top}></div>

				{this.state.hasError && (
					<p className="error">
						APP state.hasError = There was an error! Oh no!{' '}
						{this.state.hasError}
					</p>
				)}

				<Switch>
					<Route
						exact
						path="/"
						render={(props) => <Landing title="Landing" {...props} />}
					/>

					<PublicOnlyRoute path={'/login'} component={LoginPage} />

					<PublicOnlyRoute path={'/register'} component={RegistrationPage} />

					<Route path={'/movies/search'} component={MovieListPage} />

					<Route exact path={'/movies/:id'} component={MoviePage} />

					<PrivateRoute
						exact
						path={'/movies/:id/add-review'}
						component={MoviePage}
					/>

					<PrivateRoute
						exact
						path={'/movies/:id/add-to-watchlist'}
						component={MoviePage}
					/>

					<PrivateRoute
						exact
						path={'/reviews/:id/'}
						component={EditReviewPage}
					/>

					<PrivateRoute path={'/watchlist'} component={SavedMovieListPage} />

					<PrivateRoute
						exact
						path={'/reviews'}
						component={SavedMovieListPage}
					/>

					<Route component={NotFoundPage} />
				</Switch>
				<footer>
					<BackToTop
						goBackToTop={() => this.scrollToRef(this.ref_Top)}
						showBackToTop={this.state.showBackToTop}
					/>
					&copy; 2019 Built by{' '}
					<a
						href="http://www.asktami.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						Tami Williams
					</a>{' '}
					| Hero Photo by Denise Jans on Unsplash
				</footer>
			</>
		);
	}
}
