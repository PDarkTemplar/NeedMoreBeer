// @flow
import { shallow } from 'enzyme';

import React from 'react';

import { Cell } from '../index';

test('Should render cell', () => {
    const cell = shallow(<Cell size={5}>test</Cell>);

    expect(cell).toMatchSnapshot();
});

test('Should render cell (offset)', () => {
    const cell = shallow(
        <Cell size={5} offset={10}>
            test
        </Cell>
    );

    expect(cell).toMatchSnapshot();
});
