// @flow
import type { ChildrenArray, Element } from 'react';
import React from 'react';
import cn from 'classnames';

import Cell from './Cell';

import styles from './index.scss';

type Props = {
    children: ChildrenArray<Element<typeof Cell>>,
    className?: string,
};

function Row({ children, className }: Props) {
    // $FlowFixMe
    const rowClass = cn(className, styles.row);
    return <div className={rowClass}>{children}</div>;
}

export default Row;
