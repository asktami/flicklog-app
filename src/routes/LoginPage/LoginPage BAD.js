import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

import AppContext from '../../contexts/AppContext';

// import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';

import Nav from '../../components/Nav/Nav';

export default class LoginPage extends Component {
	// only need defaultProps if 1st time component rendered need to do something before provide a prop
	// static defaultProps = {
	// 	location: {},
	// 	history: {
	// 		push: () => {}
	// 	}
	// };

	static contextType = AppContext;

	handleLoginSuccess = () => {
		const { location, history } = this.props;
		const destination = (location.state || {}).from || '/';
		history.push(destination);
	};

	handleSubmitJwtAuth = (e) => {
		const { setError } = this.context;

		e.preventDefault();
		setError({ error: null });

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
				this.handleLoginSuccess();
			})

			.catch((res) => {
				setError({ error: res.message });
			});
	};

	render() {
		return (
			<>
				<header>
					<Nav />
				</header>
				<main>
					<section>
						<LoginForm
							handleSubmitJwtAuth={this.handleSubmitJwtAuth}
							error={this.context.error}
						/>
					</section>
				</main>
			</>
		);
	}
}
