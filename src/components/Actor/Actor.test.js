import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Actor from './Actor';

describe(`Actor component`, () => {
	it('renders a Actor by default', () => {
		const wrapper = shallow(<Actor />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
