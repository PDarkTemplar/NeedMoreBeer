// @flow
const data = ({
    i18n: {},
}: { i18n: Object });

export function set(instance: Object) {
    data.i18n = instance;
}

export function get() {
    return data.i18n;
}
