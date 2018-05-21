// @flow
import type { GlobalStore } from '~/types/globalStore';

import { when, runInAction } from 'mobx';

class Startup {
    globalStore: GlobalStore;

    constructor(globalStore: GlobalStore) {
        this.globalStore = globalStore;

        when(() => this.globalStore && !this.globalStore.viewModels.localization.loading).then(
            () => {
                runInAction(() => {
                    this.globalStore.viewModels.common.initialized = true;
                });
            }
        );
    }

    async start(): Promise<void> {
        this.globalStore.services.localization.init();
    }
}

export default Startup;
