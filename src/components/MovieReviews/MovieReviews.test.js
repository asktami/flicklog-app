import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';


import AppContext from '../../contexts/AppContext';
import MovieReviews from './MovieReviews';

describe(`MovieReviews component`, () => {
	const props = {
		match: {
			params: {
				movie_id: 348
			}
		}
	};
	

	it('renders the MovieReviews given context', () => {
	
	const wrapper = shallow(
    <AppContext.Provider
    value={{
      dispatch: jest.fn(),
      reviews:  [
			{
				id: 1,
				review: 'Alien test review!',
				rating: 4,
				date_created: '2019-10-31 23:14:12.649275',
				movie_id: '348',
				user_id: 1
			},
			{
				id: 2,
				review: 'Star Wars test review!',
				rating: 4,
				date_created: '2019-10-31 23:14:12.649275',
				movie_id: '11',
				user_id: 1
			}
		]
    }}>
      <MovieReviews />
    </AppContext.Provider>
    )
    
    
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
