import React, { Component } from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

import Nav from '../../components/Nav/Nav';

export default class RegistrationPage extends Component {
	static defaultProps = {
		history: {
			push: () => {},
		},
	};

	handleRegistrationSuccess = (user) => {
		const { history } = this.props;
		history.push('/login');
	};

	render() {
		return (
			<>
				<header>
					<Nav />
				</header>
				<main>
					<section>
						<RegistrationForm
							onRegistrationSuccess={this.handleRegistrationSuccess}
						/>
					</section>
				</main>
			</>
		);
	}
}
