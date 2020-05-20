import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import WatchListButton from './WatchListButton';
import AppContext from '../../contexts/AppContext';

 
jest.mock('../../contexts/AppContext');


describe(`WatchListButton component`, () => {
	it('renders a WatchListButton by default', () => {
	const component = mount(<WatchListButton />);
	});
});

