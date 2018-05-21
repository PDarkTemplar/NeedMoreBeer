// @flow
// generated file
import type { ApiClientService } from '~/types/stores';
import type { CommonService } from '~/types/stores';
import type { FetchService } from '~/types/stores';
import type { LocalizationService } from '~/types/stores';
import type { StartupService } from '~/types/stores';
import type { CommonView } from '~/types/stores';
import type { LocalizationView } from '~/types/stores';
type DomainModels = {};
type Services = {
    apiClient: ApiClientService,
    common: CommonService,
    fetch: FetchService,
    localization: LocalizationService,
    startup: StartupService,
};
type ViewModels = {
    common: CommonView,
    localization: LocalizationView,
};
export interface GlobalStore {
    domainModels: DomainModels;
    viewModels: ViewModels;
    services: Services;
    reset(): void;
}
export type GlobalStoreInjected = {
    globalStore: GlobalStore,
};
