// @flow
import { action } from 'mobx';
import type { GlobalStore } from '~/types/globalStore';
import history from '~/services/history';

import constants from '~/constants';

import type { OrderType } from '../types';

class Table {
    globalStore: GlobalStore;

    constructor(globalStore: GlobalStore) {
        this.globalStore = globalStore;
    }

    @action
    openDetails(id: string) {
        history.push(constants.paths.details.replace(':id', id));
    }

    @action
    search() {
        const { table } = this.globalStore.viewModels;
        table.clearList();
        this.startupLoad();
    }

    @action
    changeFilter(key: string, value: string) {
        const { table } = this.globalStore.viewModels;

        const previous = table.filter.filters.get(key);
        if (previous) {
            previous.value = value;
            table.filter.filters.set(key, previous);
        }
    }

    @action
    sort(order: OrderType) {
        const { table } = this.globalStore.viewModels;

        table.clearList();
        table.order.setOrder(order);
        this.startupLoad();
    }

    // action
    async startupLoad() {
        const { common } = this.globalStore.viewModels;

        common.loading = true;

        await this.loadNextPage();

        common.loading = false;
    }

    // action
    async loadMore() {
        const { table } = this.globalStore.viewModels;

        table.loading = true;

        await this.loadNextPage();

        table.loading = false;
    }

    // action
    async loadNextPage() {
        const { apiClient } = this.globalStore.services;
        const { table } = this.globalStore.viewModels;

        const nextPage = table.currentPage + 1;

        table.currentPage = nextPage;

        const query = apiClient.tableGet(
            table.order.order,
            table.order.sort,
            nextPage,
            table.filter.stringFilters,
            { withoutAutoAbort: true }
        );

        const result = await query.promise;
        if (query.status.get() === constants.fetch.status.fulfilled && result.data) {
            if (table.numberOfPage === 0) table.numberOfPage = result.numberOfPages;
            if (table.totalRows === 0) table.totalRows = result.totalResults;

            table.loadedItems = [...table.loadedItems, ...result.data];
        }
    }
}

export default Table;
