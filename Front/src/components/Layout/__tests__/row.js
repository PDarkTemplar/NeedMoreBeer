// @flow
import { shallow } from 'enzyme';

import React from 'react';

import { Row, Cell } from '../index';

test('Should render row', () => {
    const row = shallow(
        <Row>
            <Cell size={12}>test</Cell>
        </Row>
    );

    expect(row).toMatchSnapshot();
});

test('Should render row (align start)', () => {
    const row = shallow(
        <Row align="start">
            <Cell size={12}>test</Cell>
        </Row>
    );

    expect(row).toMatchSnapshot();
});
