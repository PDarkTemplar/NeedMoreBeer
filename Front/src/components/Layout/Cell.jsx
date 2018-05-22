// @flow
import type { Node } from 'react';
import React, { PureComponent } from 'react';
import cn from 'classnames';

import styles from './index.scss';

type Size = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Props = {
    size: Size,
    offset?: Size,
    children: Node,
    className?: string,
    externalRef?: (element: ?HTMLElement) => void,
};

class Cell extends PureComponent<Props> {
    static defaultProps = {
        size: 1,
    };
    render() {
        const { size, offset, children, className, externalRef } = this.props;

        const cellClass = cn(className, styles[`col_${size}`], {
            // $FlowFixMe
            [styles[`colOffset__${size}`]]: !!offset,
        });
        return (
            <div ref={externalRef} className={cellClass}>
                {children}
            </div>
        );
    }
}

export default Cell;
