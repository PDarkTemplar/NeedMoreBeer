// @flow
import React, { Component } from 'react';
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized';

import { inject } from 'common-components/Hoc';
import type { TableService, TableView } from '~/types/stores';

import Card from './Card';
import styles from './index.scss';

type Props = {
    service: TableService,
    view: TableView,
};

type RowLoaded = {
    index: number,
};

type RowRenderer = {
    index: number,
    key: string,
    style: Object,
};

class Table extends Component<Props> {
    loadMoreRows = () => {
        const { view, service } = this.props;
        if (!view.loading) {
            service.loadMore();
        }
    };

    isRowLoaded = ({ index }: RowLoaded) => {
        const { view } = this.props;
        return !view.hasNextPage || index < view.loadedItems.length;
    };

    rowRenderer = ({ index, key, style }: RowRenderer) => {
        const { view } = this.props;
        return (
            <div key={key} style={style}>
                <Card item={view.loadedItems[index]} />
            </div>
        );
    };

    render() {
        const { view } = this.props;

        const itemsCount = view.loadedItems.length;

        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.loadMoreRows}
                rowCount={view.totalRows}
            >
                {({ onRowsRendered, registerChild }) => (
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                className={styles.innerWrap}
                                height={height}
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                                rowCount={itemsCount}
                                rowHeight={120}
                                rowRenderer={this.rowRenderer}
                                width={width}
                            />
                        )}
                    </AutoSizer>
                )}
            </InfiniteLoader>
        );
    }
}

const injected = inject(Table, x => ({
    service: x.services.table,
    view: x.viewModels.table,
}));

export default injected;
export { Table as WrappedComponent };
