// @flow
import { shallow } from 'enzyme';

import React from 'react';

import { WrappedComponent as Loader } from '../index';

test('should render loading', () => {
    const loader = shallow(<Loader loading />);

    expect(loader).toMatchSnapshot();
});

test('should not render loading', () => {
    const loader = shallow(<Loader loading={false} />);

    expect(loader).toMatchSnapshot();
});
