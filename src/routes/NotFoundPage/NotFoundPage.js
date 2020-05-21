import React from 'react';

import Nav from '../../components/Nav/Nav';
import SearchForm from '../../components/SearchForm/SearchForm';
import BackLink from '../../components/BackLink/BackLink';

const NotFoundPage = (props) => {
	return (
		<>
			<header>
				<Nav />
				<SearchForm />
			</header>
			<main>
				<section className="not-found">
					<h2>404 - Page not found</h2>
					<p>
						Try going <BackLink label="text" text="back" /> to your previous
						page.
					</p>
				</section>
			</main>
		</>
	);
};

export default NotFoundPage;
