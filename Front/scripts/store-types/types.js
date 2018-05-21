// @flow

export type Files = {
    domainModels: string[],
    viewModels: string[],
    services: string[],
};

export type StoreType = 'domainModels' | 'services' | 'viewModels';

export type ImportName = {
    exportName: string,
    type: StoreType,
};
