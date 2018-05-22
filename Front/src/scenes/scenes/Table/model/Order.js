// @flow
import { observable, action, computed } from 'mobx';

import constants from '~/constants';

import type { OrderType, SortType } from '../types';

class Order {
    @observable order: OrderType = constants.enums.order.name;
    @observable sort: SortType = constants.enums.sort.asc;

    @computed
    get isAsc() {
        return this.sort === constants.enums.sort.asc;
    }

    @action
    setOrder(order: OrderType) {
        if (order === this.order) {
            this.sort =
                this.sort === constants.enums.sort.asc
                    ? constants.enums.sort.desc
                    : constants.enums.sort.asc;
        } else {
            this.order = order;
            this.sort = constants.enums.sort.asc;
        }
    }
}

export default Order;
