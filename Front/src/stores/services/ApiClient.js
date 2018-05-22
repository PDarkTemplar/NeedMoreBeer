// @flow
// generated file
import type { GlobalStore } from '~/types/globalStore';
import { FetchResponseType, AxiosConfig } from '~/types/fetch';
import type { Beer, TableResponseTableBeer } from '~/types/api';

class ApiClient {
    globalStore: GlobalStore;

    constructor(globalStore: GlobalStore) {
        this.globalStore = globalStore;
    }

    detailsByIdGet(id: string, options?: AxiosConfig): FetchResponseType<Beer> {
        return this.globalStore.services.fetch.get(`${REST_UI_URL}/details/${id}`, options);
    }

    tableGet(
        order: 'name' | 'abv' | 'ibu' | 'createDate' | 'updateDate',
        sort: 'asc' | 'desc',
        page: number,
        filters: Array<string>,
        options?: AxiosConfig
    ): FetchResponseType<TableResponseTableBeer> {
        return this.globalStore.services.fetch.get(
            `${REST_UI_URL}/table?order=${order}&sort=${sort}&page=${page}${filters
                .map(arr => `&filters=${arr}`)
                .join('')}`,
            options
        );
    }
}

export default ApiClient;
