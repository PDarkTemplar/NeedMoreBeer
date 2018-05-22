// @flow
import React, { Component } from 'react';

import type { OrderType } from '../../types';

import Item from './Item';

import styles from './index.scss';

type Data = {
    name: string,
    order: OrderType,
};

type Props = {
    data: Data[],
};

class Order extends Component<Props> {
    renderList = () => {
        const { data } = this.props;

        return data.map(x => <Item key={x.order} name={x.name} order={x.order} />);
    };
    render() {
        return <div className={styles.wrap}>{this.renderList()}</div>;
    }
}

export default Order;
