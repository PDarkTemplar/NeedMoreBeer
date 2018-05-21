// @flow
class Deferred {
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
    promise: Promise<any>;
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

export default Deferred;
