// @flow
import type { LocaleType } from '~/types/localization';
import type { GlobalStore } from '~/types/globalStore';

import { action, runInAction } from 'mobx';
import i18n from 'i18next';
import moment from 'moment';
import numeral from 'numeral';

import en from '~/locales/en.bundle';
import constants from '~/constants';
import { set as i18nSet, get as i18nGet } from '~/services/i18n';

const initMomentToJson = () => {
    /* eslint-disable func-names */

    // $FlowFixMe
    moment.prototype.toJSON = function() {
        return this.format(constants.localization.exportDateFormat);
    };

    /* eslint-enable */
};

initMomentToJson();

class Localization {
    globalStore: GlobalStore;

    constructor(globalStore: GlobalStore) {
        this.globalStore = globalStore;
    }

    @action
    init() {
        const { localization: localizationModel } = this.globalStore.viewModels;

        const instance = i18n.init({
            fallbackLng: constants.localization.defaultLanguage,
            ns: constants.localization.defaultNamespace,
            defaultNS: constants.localization.defaultNamespace,

            interpolation: {
                escapeValue: false,
                format: (value, format) => {
                    if (format.indexOf('M:') === 0) {
                        return moment(value).format(format.substring(2));
                    }
                    if (format.indexOf('N:') === 0) {
                        return numeral(value).format(format.substring(2));
                    }
                },
            },
            react: {
                wait: true,
            },
        });

        instance.on('languageChanged', lng => {
            runInAction(() => {
                localizationModel.language = lng;

                this.loadLanguage();
            });
        });

        i18nSet(instance);

        this.loadLanguage();
    }

    @action
    loadLanguage() {
        const { localization: localizationModel } = this.globalStore.viewModels;

        if (
            i18nGet().hasResourceBundle(
                localizationModel.language,
                constants.localization.defaultNamespace
            )
        )
            return;

        const setLocalization = (localization: LocaleType) => {
            runInAction(() => {
                localization.messages.forEach(message => {
                    i18nGet().addResourceBundle(
                        localizationModel.language,
                        message.namespace,
                        message.data
                    );
                });

                moment.locale(localizationModel.language);
                numeral.locale(localizationModel.language);
                localizationModel.loading = false;
            });
        };

        localizationModel.loading = true;

        switch (localizationModel.language) {
            case 'en':
                // $FlowFixMe
                en(mod => setLocalization(mod.default));
                break;
            default:
                break;
        }
    }
}

export default Localization;
