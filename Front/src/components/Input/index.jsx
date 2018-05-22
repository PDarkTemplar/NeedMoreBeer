// @flow
import React, { PureComponent, Fragment } from 'react';

import styles from './index.scss';

type Props = {
    label: string,
    value: string,
    onChange: (value: string) => void,
};

class Input extends PureComponent<Props> {
    change = (e: SyntheticInputEvent<HTMLInputElement>) => {
        const { onChange } = this.props;

        onChange(e.target.value);
    };

    render() {
        const { label, value } = this.props;
        return (
            <Fragment>
                <label className={styles.label}>{label}</label>
                <input value={value} onChange={this.change} />
            </Fragment>
        );
    }
}

export default Input;
