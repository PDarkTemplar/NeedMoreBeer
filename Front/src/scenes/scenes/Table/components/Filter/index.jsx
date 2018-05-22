// @flow
import type { TFunction } from 'react-i18next';
import type { Element } from 'react';
import React, { Component } from 'react';
import type { TableView, TableService } from '~/types/stores';
import { translateInject } from 'common-components/Hoc';
import Button from 'common-components/Button';
import constants from '~/constants';

import Item from './Item';

import styles from './index.scss';

type Props = {
    t: TFunction,
    model: TableView,
    service: TableService,
};

class Filter extends Component<Props> {
    click = () => {
        const { service } = this.props;

        service.search();
    };

    renderList = () => {
        const { model } = this.props;

        const items: Element<any>[] = [];

        model.filter.filters.forEach((mapValue, mapKey) => {
            // eslint-disable-next-line react/no-array-index-key
            items.push(<Item mapKey={mapKey} mapValue={mapValue} key={mapKey} />);
        });

        return items;
    };

    render() {
        const { t } = this.props;

        return (
            <div className={styles.wrap}>
                {this.renderList()}
                <Button name={t(constants.localization.keys.table.search)} onClick={this.click} />
            </div>
        );
    }
}

const injected = translateInject(Filter, x => ({
    model: x.viewModels.table,
    service: x.services.table,
}));

export default injected;
export { Filter as WrappedComponent };
