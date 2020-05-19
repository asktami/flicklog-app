// aka LandingMovieListContainer

import React from 'react';

import Nav from '../../components/Nav/Nav';
import SearchForm from '../../components/SearchForm/SearchForm';
import Hero from '../../components/Hero/Hero';

import LandingMovieListPage from './LandingMovieListPage';

const Landing = () => {
	return (
		<>
			<header>
				<Nav />
				<SearchForm />
				<Hero />
			</header>
			<main>
				<LandingMovieListPage title="Now Playing" theme="now_playing" />
				<LandingMovieListPage title="Coming Soon" theme="upcoming" />
				<LandingMovieListPage title="Popular" theme="popular" />
			</main>
		</>
	);
};

export default Landing;
