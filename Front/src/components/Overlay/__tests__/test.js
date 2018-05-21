// @flow
import { shallow } from 'enzyme';
import React from 'react';

import Overlay from '../index';

test('Should render Overlay', () => {
    const overlay = shallow(<Overlay />);

    expect(overlay).toMatchSnapshot();
});

test('Should render Overlay (white)', () => {
    const overlay = shallow(<Overlay color="white" />);

    expect(overlay).toMatchSnapshot();
});

test('Should not render Overlay', () => {
    const overlay = shallow(<Overlay visible={false} />);

    expect(overlay).toMatchSnapshot();
});

test('Should not render static Overlay', () => {
    const overlay = shallow(<Overlay visible={false} static />);

    expect(overlay).toMatchSnapshot();
});

test('Should render static Overlay', () => {
    const overlay = shallow(<Overlay visible static />);

    expect(overlay).toMatchSnapshot();
});
