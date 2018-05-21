// @flow
import React, { Component } from 'react';
import { observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';

function bundleHoc(bundle: any) {
    class Bundle extends Component<*> {
        constructor(props: *) {
            super(props);

            bundle(mod => {
                runInAction(() => {
                    this.mod = mod.default;
                });
            });
        }

        @observable mod: any;

        render() {
            const Mod = this.mod;
            return Mod ? <Mod {...this.props} /> : null;
        }
    }

    const observ = observer(Bundle);
    return observ;
}

export default bundleHoc;
