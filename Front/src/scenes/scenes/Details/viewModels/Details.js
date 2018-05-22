// @flow
import { observable, action } from 'mobx';

import type { Beer } from '~/types/api';

class Details {
    @observable data: $Shape<Beer> = {};

    @action
    clear() {
        // $FlowFixMe
        this.data = {};
    }
}

export default Details;
