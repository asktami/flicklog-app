import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';

import AuthApiService from '../../services/auth-api-service';
import MovieApiService from '../../services/movie-api-service';

// using trackPromise so can use LoadingIndicator
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

export default class LoginForm extends Component {
	static contextType = AppContext;

	static defaultProps = {
		onLoginSuccess: () => {},
	};

	state = { error: null };

	handleSubmitJwtAuth = (e) => {
		e.preventDefault();
		this.setState({ error: null });
		const { username, password } = e.target;

		AuthApiService.postLogin({
			username: username.value,
			password: password.value,
			history: this.props.history,
		})
			.then((res) => {
				username.value = '';
				password.value = '';

				// save loginUserId
				this.context.setLoginUserId(res.user_id);

				//	TokenService.saveAuthToken(res.authToken);
				this.props.onLoginSuccess();
			})

			.catch((res) => {
				this.setState({ error: res.message });
			});
	};

	render() {
		const { error } = this.state;

		return (
			<form onSubmit={this.handleSubmitJwtAuth}>
				<fieldset>
					<legend>Login</legend>
					<div role="alert">{error && <p className="error">{error}</p>}</div>
					<div>
						<label htmlFor="username">Username</label>
						<input type="text" required name="username" id="username" />
					</div>
					<div className="password">
						<label htmlFor="password">Password</label>
						<input required name="password" type="password" id="password" />
					</div>
					<div className="btn-container">
						<button className="btn btn-as-link">Login</button>
					</div>
				</fieldset>
			</form>
		);
	}
}
