// @flow
import { AxiosXHRConfigBase } from 'axios';
import { IObservableValue } from 'mobx';

export type RequestStatus = 'pending' | 'fulfilled' | 'rejected' | 'canceled';

export interface FetchResponseType<T> {
    status: IObservableValue<RequestStatus>;
    requestId: number;
    promise: Promise<T>;
};

export interface AxiosConfig extends AxiosXHRConfigBase<any> {
    data?: any;
    method?: string;
    url?: string;
    reThrow?: boolean;
    withoutAutoAbort?: boolean;
}
