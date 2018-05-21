// @flow
import enums from './enums';
import localization from './localization';

export default {
    paths: {
        table: '/beer',
        details: '/beer/:id',
    },
    fetch: {
        status: {
            pending: 'pending',
            fulfilled: 'fulfilled',
            rejected: 'rejected',
            canceled: 'canceled',
        },
    },
    localization: {
        defaultLanguage: 'en',
        defaultNamespace: 'common',
        exportDateFormat: 'YYYY-MM-DD HH:mm',
        keys: {
            ...localization,
        },
    },
    enums: {
        ...enums,
    },
};
