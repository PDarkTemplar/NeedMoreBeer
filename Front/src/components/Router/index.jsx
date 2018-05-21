// @flow
import type { Node } from 'react';
import type { FetchService } from '~/types/stores';

import React from 'react';
import { Router as ReactRouter } from 'react-router-dom';

import { inject } from 'common-components/Hoc';
import history from '~/services/history';

type Props = {
    children: Node,
    fetch: FetchService,
};

class Router extends React.Component<Props> {
    componentDidMount() {
        this.unlisten = history.listen(this.historyChange);
    }

    componentWillUnmount() {
        this.unlisten();
    }

    unlisten: () => void;

    historyChange = () => {
        this.props.fetch.abortAll();
    };

    render() {
        return <ReactRouter history={history}>{this.props.children}</ReactRouter>;
    }
}

const injected = inject(Router, x => ({
    fetch: x.services.fetch,
}));

export default injected;
export { Router as WrappedComponent };
export { default as AnonymousRoute } from './AnonymousRoute';
