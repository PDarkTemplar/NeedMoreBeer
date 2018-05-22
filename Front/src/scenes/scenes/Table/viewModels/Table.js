// @flow
import { observable, computed, action } from 'mobx';
import type { TableBeer } from '~/types/api';
import constants from '~/constants';

import Order from '../model/Order';
import Filter from '../model/Filter';

class Table {
    @observable loadedItems: TableBeer[] = [];
    @observable totalRows: number = 0;

    order: Order = new Order();
    filter: Filter = new Filter();

    loading: boolean = false;
    numberOfPage: number = 0;
    currentPage: number = 0;

    constructor() {
        const { table: tableLoc } = constants.localization.keys;
        const { order } = constants.enums;

        this.filter.filters.set(order.name, { value: '', name: tableLoc.name });
        this.filter.filters.set(order.abv, { value: '', name: tableLoc.abv });
        this.filter.filters.set(order.ibu, { value: '', name: tableLoc.ibu });
    }

    @computed
    get hasNextPage() {
        return this.currentPage < this.numberOfPage;
    }

    @action
    clearList() {
        this.loadedItems = [];
        this.totalRows = 0;
        this.loading = false;
        this.numberOfPage = 0;
        this.currentPage = 0;
    }
}

export default Table;
