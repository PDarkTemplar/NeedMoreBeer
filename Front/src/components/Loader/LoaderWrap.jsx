// @flow
import type { Node } from 'react';
import React, { PureComponent } from 'react';
import cn from 'classnames';

import Overlay from 'common-components/Overlay';

import styles from './index.scss';

type Props = {
    overlay: boolean,
    children?: Node,
    className?: string,
};

class LoaderWrap extends PureComponent<Props> {
    render() {
        const { overlay, className } = this.props;

        const loaderWrapClass = cn(className, styles.wrap);

        return (
            <div className={loaderWrapClass}>
                <Overlay noAnimation visible={overlay} />
                <div className={styles.loader} />
            </div>
        );
    }
}

export default LoaderWrap;
