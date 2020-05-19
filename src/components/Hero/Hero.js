import React from 'react';
import { useLocation } from 'react-router-dom';

const Hero = (props) => {
	let location = useLocation();
	return (
		<>
			<section>
				{location.pathname === '/' ? (
					<div className="hero">
						<p>
							Search for flicks (movies), add to your watchlist, add reviews,
							and see reviews made by others.
							<br />
							<br />
							You need to register and login to add flicks to your watchlist and
							add reviews.
							<br />
							<br />
							Demo Username: testUser
							<br />
							Demo Password: testUser123@
						</p>
					</div>
				) : null}
			</section>
		</>
	);
};

export default Hero;
