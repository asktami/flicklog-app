import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import BackToTop from './BackToTop';

describe(`BackToTop component`, () => {
	it('renders a BackToTop by default', () => {
		const wrapper = shallow(<BackToTop />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
