// @flow
import type { LocaleType } from '~/types/localization';

import mergeLocalization from './mergeLocalization';

// $FlowFixMe
const locales = require.context('~', true, /locales\/(.*\.en|en)\.json$/);

export default ({
    messages: mergeLocalization(locales),
}: LocaleType);
