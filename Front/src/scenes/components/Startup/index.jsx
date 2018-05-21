// @flow
import type { StartupService } from '~/types/stores';

import React, { Component } from 'react';

import { inject } from 'common-components/Hoc';
import { hot } from 'react-hot-loader';

import Loader from '../Loader';
import Bootstrap from '../Bootstrap';

type Props = {
    startupService: StartupService,
    initialized: boolean,
};

class Startup extends Component<Props> {
    componentDidMount() {
        this.start();
    }

    componentDidUpdate() {
        this.start();
    }

    start = () => {
        const { initialized, startupService } = this.props;

        if (!initialized) {
            startupService.start();
        }
    };

    render() {
        return [<Loader key="loading" />, <Bootstrap key="bootstrap" />];
    }
}

const injected = inject(Startup, x => ({
    startupService: x.services.startup,
    initialized: x.viewModels.common.initialized,
}));

export default hot(module)(injected);
