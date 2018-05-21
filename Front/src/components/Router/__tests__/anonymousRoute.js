// @flow
import { shallow } from 'enzyme';

import React from 'react';

import Route from '../AnonymousRoute';

test('should render route', () => {
    const route = shallow(<Route />);

    expect(route).toMatchSnapshot();
});
