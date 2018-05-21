// @flow
import type { GlobalStore } from '~/types/globalStore';

import { computed } from 'mobx';

class Common {
    globalStore: GlobalStore;
    checkUpdateIntervalId: IntervalID;

    constructor(globalStore: GlobalStore) {
        this.globalStore = globalStore;
    }

    @computed
    get loading(): boolean {
        const { viewModels } = this.globalStore;
        return viewModels.localization.loading || viewModels.common.loading;
    }
}

export default Common;
