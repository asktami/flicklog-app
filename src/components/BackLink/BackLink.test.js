import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';


jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));


import BackLink from './BackLink';

describe(`BackLink component`, () => {
	it('renders a BackLink by default', () => {
		const wrapper = shallow(<BackLink />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
