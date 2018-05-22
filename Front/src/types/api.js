// @flow
// generated file
export type Beer = {
    name?: string,
    abv?: string,
    glass?: Glass,
    description?: string,
    labels?: Label,
    statusDisplay?: string,
    createDate: string,
    updateDate: string,
};
export type Glass = { id: number, name?: string };
export type Label = { medium?: string, large?: string, icon?: string };
export type TableResponseTableBeer = {
    data?: Array<TableBeer>,
    numberOfPages: number,
    totalResults: number,
};
export type TableBeer = {
    id?: string,
    name?: string,
    abv?: string,
    ibu?: string,
    statusDisplay?: string,
    year?: string,
    labels?: Label,
    glass?: Glass,
    createDate: string,
    updateDate: string,
};
