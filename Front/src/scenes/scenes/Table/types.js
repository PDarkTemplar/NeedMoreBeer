// @flow
export type OrderType = 'name' | 'abv' | 'ibu' | 'createDate' | 'updateDate';
export type SortType = 'asc' | 'desc';
export type FilterType = {
    value: string,
    name: string,
};
