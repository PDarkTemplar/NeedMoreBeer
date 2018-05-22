// @flow
import type { TFunction } from 'react-i18next';
import React, { Component } from 'react';

import { translateInject } from 'common-components/Hoc';
import type { TableBeer } from '~/types/api';
import type { TableService } from '~/types/stores';
import constants from '~/constants';

import { Row, Cell } from 'common-components/Layout';

import styles from './index.scss';

type Props = {
    t: TFunction,
    item: TableBeer,
    service: TableService,
};

class Card extends Component<Props> {
    click = () => {
        const { service, item } = this.props;

        if (item.id) {
            service.openDetails(item.id);
        }
    };

    render() {
        const { item, t } = this.props;

        return (
            <div className={styles.card} onClick={this.click}>
                <div className={styles.img}>
                    {item.labels && <img src={item.labels.icon} alt="" />}
                </div>
                <div className={styles.details}>
                    <Row className={styles.row}>
                        <Cell size={4}>
                            {t(constants.localization.keys.table.name)}: {item.name}
                        </Cell>
                        <Cell size={4}>
                            {t(constants.localization.keys.table.abv)}: {item.abv}
                        </Cell>
                        <Cell size={4}>
                            {t(constants.localization.keys.table.ibu)}: {item.ibu}
                        </Cell>
                    </Row>
                    <Row className={styles.row}>
                        <Cell size={4}>
                            {t(constants.localization.keys.table.status)}: {item.statusDisplay}
                        </Cell>
                        <Cell size={4}>
                            {t(constants.localization.keys.table.year)}: {item.year}
                        </Cell>
                        <Cell size={4}>
                            {t(constants.localization.keys.table.glass)}
                            {': '}
                            {item.glass ? item.glass.name : ''}
                        </Cell>
                    </Row>
                    <Row className={styles.row}>
                        <Cell size={4}>
                            {t(constants.localization.keys.table.createDateFormat, {
                                createDate: item.createDate,
                            })}
                        </Cell>
                        <Cell size={4}>
                            {t(constants.localization.keys.table.updateDateFormat, {
                                updateDate: item.updateDate,
                            })}
                        </Cell>
                    </Row>
                </div>
            </div>
        );
    }
}

const injected = translateInject(Card, x => ({
    service: x.services.table,
}));
export default injected;
export { Card as WrappedComponent };
