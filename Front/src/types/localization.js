// @flow
export type Message = {
    namespace: string,
    data: Object,
};

export type LocaleType = {
    messages: Array<Message>,
};