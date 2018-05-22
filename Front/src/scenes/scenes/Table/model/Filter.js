// @flow
import { observable, computed } from 'mobx';

import type { FilterType } from '../types';

class Filter {
    @observable filters: Map<string, FilterType> = new Map();

    @computed
    get stringFilters() {
        const result: string[] = [];

        this.filters.forEach((mapValue, key) => {
            if (mapValue.value) {
                result.push(`${key}:${mapValue.value}`);
            }
        });

        return result;
    }
}

export default Filter;
