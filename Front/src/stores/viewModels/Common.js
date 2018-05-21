// @flow
import { observable } from 'mobx';

class Common {
    @observable initialized: boolean = false;
    @observable loading: boolean = false;
}

export default Common;
