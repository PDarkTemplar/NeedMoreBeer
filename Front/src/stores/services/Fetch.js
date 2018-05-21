// @flow
import { FetchResponseType, AxiosConfig } from '~/types/fetch';
import type { RequestStatus } from '~/types/fetch';
import type { GlobalStore } from '~/types/globalStore';
import type { $AxiosXHR } from 'axios';

import axios, { CancelTokenSource } from 'axios';
import merge from 'deepmerge';
import { observable, runInAction, IObservableValue } from 'mobx';
import { toast } from 'react-toastify';

import constants from '~/constants';
import { get as i18nGet } from '~/services/i18n';

type CancelRequestType = {
    token: CancelTokenSource,
    withoutAutoAbort: boolean,
};

function handleErrors(response: $AxiosXHR<any>) {
    if (!response) return;

    const errorText = response.data ? response.data.message : response.statusText;

    return errorText;
}

class Fetch {
    globalStore: GlobalStore;
    requests: { [number]: CancelRequestType } = {};

    requestId = 0;

    constructor(globalStore: GlobalStore) {
        this.globalStore = globalStore;
    }

    request<TResponse>(options: AxiosConfig): FetchResponseType<TResponse> {
        const statusModel: IObservableValue<RequestStatus> = observable.box(
            constants.fetch.status.pending
        );

        this.requestId += 1;

        const currentRequestId = this.requestId;

        const defaultOptions = {
            timeout: 1200000,
        };

        const internalOptions: any = merge(defaultOptions, options);

        const axiosPromise = () => {
            const cancelSource = axios.CancelToken.source();

            this.requests[currentRequestId] = {
                token: cancelSource,
                withoutAutoAbort: internalOptions.withoutAutoAbort || false,
            };

            internalOptions.cancelToken = cancelSource.token;

            return axios.request(internalOptions).then(
                response =>
                    runInAction(() => {
                        delete this.requests[currentRequestId];
                        statusModel.set(constants.fetch.status.fulfilled);
                        if (response.status === 204) {
                            return;
                        }

                        const { data }: { data: TResponse } = response;

                        return data;
                    }),
                error => {
                    runInAction(() => {
                        delete this.requests[currentRequestId];

                        if (axios.isCancel(error)) {
                            statusModel.set(constants.fetch.status.canceled);
                        } else {
                            statusModel.set(constants.fetch.status.rejected);

                            const serverError = handleErrors(error.response);
                            const message =
                                serverError ||
                                i18nGet().t(constants.localization.keys.common.fetchError);
                            if (internalOptions.reThrow) {
                                const tError: any = Error(message);
                                if (serverError) {
                                    tError.fromServer = true;
                                }
                                throw tError;
                            } else {
                                toast.error(message);
                            }
                        }
                    });
                }
            );
        };

        const rp: any = axiosPromise();

        const promise: Promise<TResponse> = rp;

        return {
            status: statusModel,
            requestId: currentRequestId,
            promise,
        };
    }

    post<T, TResponse>(url: string, data: T, options?: ?AxiosConfig): FetchResponseType<TResponse> {
        const newOptions: $Shape<AxiosConfig> = !options ? {} : { ...options };

        newOptions.method = 'post';
        newOptions.url = url;
        newOptions.data = data;

        return this.request(newOptions);
    }

    get<TResponse>(url: string, options?: AxiosConfig): FetchResponseType<TResponse> {
        const newOptions: $Shape<AxiosConfig> = !options ? {} : { ...options };

        newOptions.method = 'get';
        newOptions.url = url;

        return this.request(newOptions);
    }

    delete<TResponse>(url: string, options?: AxiosConfig): FetchResponseType<TResponse> {
        const newOptions: $Shape<AxiosConfig> = !options ? {} : { ...options };

        newOptions.method = 'delete';
        newOptions.url = url;

        return this.request(newOptions);
    }

    put<T, TResponse>(url: string, data: T, options?: AxiosConfig): FetchResponseType<TResponse> {
        const newOptions: $Shape<AxiosConfig> = !options ? {} : { ...options };

        newOptions.method = 'put';
        newOptions.url = url;
        newOptions.data = data;

        return this.request(newOptions);
    }

    abort(id: number | number[]) {
        let ids = [];
        if (!Array.isArray(id)) {
            ids.push(id);
        } else {
            ids = id;
        }

        ids.forEach(x => {
            if (!this.requests[x]) {
                return;
            }

            this.requests[x].token.cancel();
            delete this.requests[x];
        });
    }

    abortAll() {
        Object.keys(this.requests).forEach(key => {
            const cancelableRequest = this.requests[Number(key)];
            if (!cancelableRequest.withoutAutoAbort) {
                cancelableRequest.token.cancel();
            }
        });
        this.requests = {};
    }
}

export default Fetch;
