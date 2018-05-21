// @flow
import React, { PureComponent } from 'react';
import cn from 'classnames';

import { Transition, animationConstants } from 'common-components/Animation';

import styles from './index.scss';

type Props = {
    noAnimation: boolean,
    visible: boolean,
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

class Overlay extends PureComponent<Props> {
    static defaultProps = {
        visible: true,
        noAnimation: false,
    };

    renderOverlay = () => {
        const { visible, className } = this.props;

        const overlayClass = cn(className, styles.overlay);

        return visible ? <div className={overlayClass} /> : null;
    };

    render() {
        const { noAnimation } = this.props;

        if (noAnimation) {
            return this.renderOverlay();
        }

        return (
            <Transition enterAnim={enterAnim} exitAnim={exitAnim}>
                {this.renderOverlay()}
            </Transition>
        );
    }
}
export default Overlay;
