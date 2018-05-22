// @flow
// generated file
import type { DetailsService } from '~/types/stores';
import type { TableService } from '~/types/stores';
import type { ApiClientService } from '~/types/stores';
import type { CommonService } from '~/types/stores';
import type { FetchService } from '~/types/stores';
import type { LocalizationService } from '~/types/stores';
import type { StartupService } from '~/types/stores';
import type { DetailsView } from '~/types/stores';
import type { TableView } from '~/types/stores';
import type { CommonView } from '~/types/stores';
import type { LocalizationView } from '~/types/stores';
type DomainModels = {};
type Services = {
    details: DetailsService,
    table: TableService,
    apiClient: ApiClientService,
    common: CommonService,
    fetch: FetchService,
    localization: LocalizationService,
    startup: StartupService,
};
type ViewModels = {
    details: DetailsView,
    table: TableView,
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
