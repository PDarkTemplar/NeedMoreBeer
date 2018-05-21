// @flow
import React, { PureComponent } from 'react';

import { Transition, animationConstants } from 'common-components/Animation';

import LoaderWrap from './LoaderWrap';

type Props = {
    visible: boolean,
    overlay: boolean,
    noAnimation: boolean,
    className?: string,
};

const enterAnim = {
    opacity: [0, 1],
    duration: 200,
    easing: animationConstants.easing.linear,
};

const exitAnim = {
    opacity: [1, 0],
    duration: 200,
    easing: animationConstants.easing.linear,
};

class Loader extends PureComponent<Props> {
    static defaultProps = {
        overlay: false,
        noAnimation: false,
    };

    renderLoader = () => {
        const { visible, overlay, className } = this.props;

        if (!visible) return null;

        return <LoaderWrap overlay={overlay} className={className} />;
    };

    render() {
        const { noAnimation } = this.props;
        if (noAnimation) return this.renderLoader();

        return (
            <Transition enterAnim={enterAnim} exitAnim={exitAnim}>
                {this.renderLoader()}
            </Transition>
        );
    }
}

export default Loader;
