import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';

import TokenService from '../../services/token-service';
import IdleService from '../../services/idle-service';

import '../../index.css';

export default class Nav extends Component {
	static contextType = AppContext;

	// HANDLE NAV MENU
	handleNavToggle(e) {
		e.preventDefault();
		let navMenu = document.querySelector('.nav-menu');
		navMenu.classList.toggle('active');
	}

	handleLogoutClick = () => {
		TokenService.clearAuthToken();
		/* when logging out, clear the callbacks to the refresh api and idle auto logout */
		TokenService.clearCallbackBeforeExpiry();
		IdleService.unRegisterIdleResets();
		this.context.setLoginUserId('');
	};

	renderLogoutLink() {
		return (
			<nav>
				<span
					className="nav-toggle"
					id="js-nav-toggle"
					onClick={(e) => this.handleNavToggle(e)}
				>
					&#9776;
				</span>

				<h1 className="logo">
					<a href="/">FlickLog</a>
				</h1>

				<ul id="js-nav-menu" className="nav-menu">
					<li>
						<Link to="/watchlist">WatchList</Link>
					</li>
					<li>
						<Link to="/reviews">Reviews</Link>
					</li>

					<li>
						<Link onClick={this.handleLogoutClick} to="/">
							Logout
						</Link>
					</li>
				</ul>
			</nav>
		);
	}

	renderLoginLink() {
		return (
			<nav>
				<span
					className="nav-toggle"
					id="js-nav-toggle"
					onClick={(e) => this.handleNavToggle(e)}
				>
					&#9776;
				</span>

				<h1 className="logo">
					<a href="/">FlickLog</a>
				</h1>

				<ul id="js-nav-menu" className="nav-menu">
					<li>
						<Link to="/login">Log in</Link>
					</li>
					<li>
						<Link to="/register">Register</Link>
					</li>
				</ul>
			</nav>
		);
	}

	render() {
		return (
			<>
				{/* check localStorage for login auth */}
				{TokenService.hasAuthToken()
					? this.renderLogoutLink()
					: this.renderLoginLink()}
			</>
		);
	}
}
