// @flow
import type { TFunction } from 'react-i18next';
import React, { Component } from 'react';
import type { TableService } from '~/types/stores';
import Input from 'common-components/Input';
import { translateInject } from 'common-components/Hoc';

import type { FilterType } from '../../types';

import styles from './index.scss';

type Props = {
    t: TFunction,
    service: TableService,
    mapKey: string,
    mapValue: FilterType,
};

class Item extends Component<Props> {
    change = (value: string) => {
        const { mapKey, service } = this.props;

        service.changeFilter(mapKey, value);
    };

    render() {
        const { t, mapValue } = this.props;

        return (
            <div className={styles.item}>
                <Input label={t(mapValue.name)} value={mapValue.value} onChange={this.change} />
            </div>
        );
    }
}

const injected = translateInject(Item, x => ({
    service: x.services.table,
}));
export default injected;
export { Item as WrappedComponent };
