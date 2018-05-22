// @flow
import React, { Component } from 'react';
import cn from 'classnames';

import { inject } from 'common-components/Hoc';
import type { TableService, TableView } from '~/types/stores';

import type { OrderType } from '../../types';

import styles from './index.scss';

type Props = {
    service: TableService,
    view: TableView,
    name: string,
    order: OrderType,
};

class Item extends Component<Props> {
    click = (e: SyntheticMouseEvent<HTMLAnchorElement>) => {
        const { service, order } = this.props;

        e.preventDefault();

        service.sort(order);
    };

    render() {
        const { name, view, order } = this.props;

        const selected = order === view.order.order;

        const directionClass = cn(styles.direction, {
            [styles.asc]: selected && view.order.isAsc,
            [styles.desc]: selected && !view.order.isAsc,
        });

        return (
            <a href="#" onClick={this.click}>
                {name}
                <div className={directionClass} />
            </a>
        );
    }
}

const injected = inject(Item, x => ({
    service: x.services.table,
    view: x.viewModels.table,
}));

export default injected;
export { Item as WrappedComponent };
