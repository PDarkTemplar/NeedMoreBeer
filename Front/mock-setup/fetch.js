// @flow
import constants from '~/constants';

import Deferred from './Deferred';

type UrlResult = {
    [string]: any,
};

export default (value: any, status: string = constants.fetch.status.fulfilled) => ({
    get: () => ({
        status: { get: () => status },
        // $FlowFixMe
        promise: new Promise(resolve => {
            resolve(value);
        }),
    }),
});

export function resultByUrl(map: UrlResult, status: string = constants.fetch.status.fulfilled) {
    return {
        get: (url: string) => ({
            status: { get: () => status },
            // $FlowFixMe
            promise: new Promise(resolve => {
                resolve(map[url]);
            }),
        }),
    };
}

export function fetchResult(value: any, status: string = constants.fetch.status.fulfilled) {
    return {
        status: { get: () => status },
        // $FlowFixMe
        promise: new Promise(resolve => {
            resolve(value);
        }),
    };
}

export function deferredFetchResult(
    deferred: Deferred,
    requestId?: number,
    status: string = constants.fetch.status.fulfilled
) {
    return {
        status: { get: () => status },
        // $FlowFixMe
        promise: deferred.promise,
        requestId,
    };
}

export function flushPromises() {
    // $FlowFixMe
    return new Promise(resolve => setTimeout(resolve, 0));
}
