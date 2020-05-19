import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import SearchForm from './SearchForm';

describe(`SearchForm component`, () => {
	it('renders a SearchForm by default', () => {
		const wrapper = shallow(<SearchForm />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
