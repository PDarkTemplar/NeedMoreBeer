// @flow
import type { Node } from 'react';

import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';

import AnimeTransitionWrapper from './AnimeTransitionWrapper';

import type { Animations } from './types';

function DummyWrapper({ children }: { children: Node }) {
    return children;
}

type Props = {
    enterAnim: Animations,
    exitAnim: Animations,
    children: Node,
};

class AnimeTransition extends Component<Props> {
    render() {
        const { enterAnim, exitAnim, children, ...props } = this.props;

        const transitions = React.Children.map(children, child => (
            <AnimeTransitionWrapper enterAnim={enterAnim} exitAnim={exitAnim}>
                {child}
            </AnimeTransitionWrapper>
        ));

        return (
            <TransitionGroup {...props} component={DummyWrapper}>
                {transitions}
            </TransitionGroup>
        );
    }
}

export default AnimeTransition;
