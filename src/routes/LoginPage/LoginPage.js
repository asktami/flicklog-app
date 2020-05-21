import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

import Nav from '../../components/Nav/Nav';

export default class LoginPage extends Component {
	handleLoginSuccess = () => {
		const { location, history } = this.props;
		const destination = (location.state || {}).from || '/';
		history.push(destination);
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
							history={this.props.history}
							onLoginSuccess={this.handleLoginSuccess}
						/>
					</section>
				</main>
			</>
		);
	}
}
