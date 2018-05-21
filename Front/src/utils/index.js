// @flow
export function firstToLower(str: string) {
    return str && str[0].toLowerCase() + str.slice(1);
}

export function isUndefinedOrNull(obj: any) {
    return obj === undefined || obj === null;
}
