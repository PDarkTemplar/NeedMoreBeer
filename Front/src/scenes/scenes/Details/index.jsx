// @flow
import type { TFunction } from 'react-i18next';
import React, { Component } from 'react';
import type { Match } from 'react-router-dom';

import { translateInject } from 'common-components/Hoc';
import constants from '~/constants';
import type { DetailsService, DetailsView } from '~/types/stores';
import { Row, Cell } from 'common-components/Layout';

import styles from './index.scss';

type Props = {
    t: TFunction,
    service: DetailsService,
    model: DetailsView,
    match: Match,
};

class Details extends Component<Props> {
    componentDidMount() {
        const { service, match } = this.props;

        if (match.params.id) {
            service.load(match.params.id);
        }
    }

    componentWillUnmount() {
        const { model } = this.props;

        model.clear();
    }

    render() {
        const { model, t } = this.props;

        return (
            <div className={styles.wrap}>
                <div className={styles.imgWrap}>
                    <div className={styles.img}>
                        {model.data.labels && <img src={model.data.labels.medium} alt="" />}
                    </div>
                    <div> {model.data.description}</div>
                </div>
                <div>
                    <Row className={styles.row}>
                        <Cell size={4}>
                            {t(constants.localization.keys.table.name)}: {model.data.name}
                        </Cell>
                        <Cell size={4}>
                            {t(constants.localization.keys.table.abv)}: {model.data.abv}
                        </Cell>
                    </Row>
                    <Row className={styles.row}>
                        <Cell size={4}>
                            {t(constants.localization.keys.table.status)}:{' '}
                            {model.data.statusDisplay}
                        </Cell>
                        <Cell size={4}>
                            {t(constants.localization.keys.table.glass)}
                            {': '}
                            {model.data.glass ? model.data.glass.name : ''}
                        </Cell>
                    </Row>
                    <Row className={styles.row}>
                        <Cell size={4}>
                            {t(constants.localization.keys.table.createDateFormat, {
                                createDate: model.data.createDate,
                            })}
                        </Cell>
                        <Cell size={4}>
                            {t(constants.localization.keys.table.updateDateFormat, {
                                updateDate: model.data.updateDate,
                            })}
                        </Cell>
                    </Row>
                </div>
            </div>
        );
    }
}

const injected = translateInject(Details, x => ({
    service: x.services.details,
    model: x.viewModels.details,
}));

export default injected;
export { Details as WrappedComponent };
