import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import YouTube from './YouTube';

describe(`YouTube component`, () => {
	it('renders a YouTube by default', () => {
		const wrapper = shallow(<YouTube />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
