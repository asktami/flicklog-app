import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Pagination from './Pagination';

describe(`Pagination component`, () => {
	it('renders a Pagination by default', () => {
		const wrapper = shallow(<Pagination />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
