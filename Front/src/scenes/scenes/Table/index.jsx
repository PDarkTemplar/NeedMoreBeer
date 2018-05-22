// @flow
import type { TFunction } from 'react-i18next';
import React, { Component } from 'react';
import { translateInject } from 'common-components/Hoc';
import constants from '~/constants';

import type { TableService } from '~/types/stores';

import TableComp from './components/Table';
import Order from './components/Order';
import Filter from './components/Filter';

import styles from './index.scss';

type Props = {
    t: TFunction,
    service: TableService,
};

class Table extends Component<Props> {
    componentDidMount() {
        const { service } = this.props;

        service.startupLoad();
    }

    getOrderData = () => {
        const { t } = this.props;

        const { table: tableLoc } = constants.localization.keys;
        const { order } = constants.enums;

        return [
            {
                name: t(tableLoc.name),
                order: order.name,
            },
            {
                name: t(tableLoc.abv),
                order: order.abv,
            },
            {
                name: t(tableLoc.ibu),
                order: order.ibu,
            },
            {
                name: t(tableLoc.createDate),
                order: order.createDate,
            },
            {
                name: t(tableLoc.updateDate),
                order: order.updateDate,
            },
        ];
    };

    render() {
        return (
            <div className={styles.wrap}>
                <Filter />
                <div className={styles.inner}>
                    <Order data={this.getOrderData()} />
                    <TableComp />
                </div>
            </div>
        );
    }
}

const injected = translateInject(Table, x => ({
    service: x.services.table,
}));

export default injected;
export { Table as WrappedComponent };
