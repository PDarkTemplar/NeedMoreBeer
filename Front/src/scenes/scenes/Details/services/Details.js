// @flow
import type { GlobalStore } from '~/types/globalStore';

import constants from '~/constants';

class Details {
    globalStore: GlobalStore;

    constructor(globalStore: GlobalStore) {
        this.globalStore = globalStore;
    }

    // action
    async load(id: string) {
        const { common, details } = this.globalStore.viewModels;
        const { apiClient } = this.globalStore.services;

        common.loading = true;

        const query = apiClient.detailsByIdGet(id, { withoutAutoAbort: true });
        const result = await query.promise;

        if (query.status.get() === constants.fetch.status.fulfilled) {
            details.data = result;
        }

        common.loading = false;
    }
}

export default Details;
