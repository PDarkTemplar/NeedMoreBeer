// @flow
import React from 'react';
import { Route } from 'react-router-dom';

type Props = {};

function AnonymousRoute(props: Props) {
    return <Route {...props} />;
}

export default AnonymousRoute;
