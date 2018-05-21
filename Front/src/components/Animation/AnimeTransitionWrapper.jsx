// @flow
import type { Node } from 'react';
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

import Anime from './Anime';

import type { Animations } from './types';

type Props = {
    in: boolean,
    enterAnim: Animations,
    exitAnim: Animations,
    children: Node,
};

class AnimeTransitionWrapper extends Component<Props> {
    static defaultProps = {
        in: true,
        enterAnim: {},
        exitAnim: {},
    };

    transitionDone: () => void;

    animComplete = () => {
        if (this.transitionDone) {
            this.transitionDone();
        }
    };

    endListener = (n: any, done: () => void) => {
        this.transitionDone = done;
    };

    render() {
        const { in: inProp, enterAnim, exitAnim, ...props } = this.props;

        const anim = { ...(inProp ? enterAnim : exitAnim), complete: this.animComplete };

        return (
            <Transition in={inProp} {...props} addEndListener={this.endListener}>
                <Anime anim={anim}>{this.props.children}</Anime>
            </Transition>
        );
    }
}

export default AnimeTransitionWrapper;
