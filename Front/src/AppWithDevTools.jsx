// @flow
import React from 'react';
import DevTools from 'mobx-react-devtools';

import App from './scenes';

const AppWithDev = () => [<DevTools key="dev_tools" />, <App key="app" />];

export default AppWithDev;
