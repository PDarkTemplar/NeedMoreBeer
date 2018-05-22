// @flow
import React from 'react';

type Props = {
    name: string,
    onClick: () => void,
};

function Button({ name, onClick }: Props) {
    return <button onClick={onClick}>{name}</button>;
}

export default Button;
