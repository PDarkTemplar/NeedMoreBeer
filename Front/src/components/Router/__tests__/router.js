// @flow
import { shallow } from 'enzyme';

import 'mock-setup';
import React from 'react';

import { WrappedComponent as Router } from '../index';

test('should render router', () => {
    const fetch: any = {};
    const header: any = {};
    const router = shallow(
        <Router fetch={fetch} headerModel={header}>
            test
        </Router>
    );

    expect(router).toMatchSnapshot();
});
