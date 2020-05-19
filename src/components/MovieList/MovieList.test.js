import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';


import MovieList from './MovieList';

describe(`MovieList component`, () => {
	const props = {
		match: {
			params: {
				movies: [
						   {
						   poster_path: '/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg',
						   backdrop_path: '/AmR3JG1VQVxU8TfAvljUhfSFUOx.jpg',
						   title: 'Alien',
						   release_date: '1979-05-25',
						   vote_average: 8.1,
						   vote_count: 5694,
						   id: 348
						   }
						]
			}
		}
	};
	

	it('renders a MovieList by default', () => {
		const wrapper = shallow(<MovieList {...props} />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('renders the MovieList given props', () => {
		const wrapper = shallow(<MovieList {...props} />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
