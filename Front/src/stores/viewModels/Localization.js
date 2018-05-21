// @flow
import { observable } from 'mobx';

import constants from '~/constants';

class Localization {
    @observable language = constants.localization.defaultLanguage;
    @observable loading: boolean = true;
}

export default Localization;
