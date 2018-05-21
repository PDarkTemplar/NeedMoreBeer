// @flow
import React, { Component } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import { get as i18nGet } from '~/services/i18n';
import constants from '~/constants';

import { inject } from 'common-components/Hoc';
import Router, { AnonymousRoute } from 'common-components/Router';

import Table from '../../scenes/Table';

type Props = {
    initialized: boolean,
};

class Bootstrap extends Component<Props> {
    render() {
        const { initialized } = this.props;
        if (!initialized) return null;

        return (
            <I18nextProvider i18n={i18nGet()}>
                <div className="bootstrap_content-wrap">
                    <ToastContainer />
                    <Router>
                        <Switch>
                            <AnonymousRoute exact path={constants.paths.table} component={Table} />
                            <Redirect to={constants.paths.table} />
                        </Switch>
                    </Router>
                </div>
            </I18nextProvider>
        );
    }
}

const injected = inject(Bootstrap, x => ({
    initialized: x.viewModels.common.initialized,
}));

export default injected;
