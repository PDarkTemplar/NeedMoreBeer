// @flow
// $FlowFixMe
import React from 'react';
import { render as domRender } from 'react-dom';

import AppWithDev from './AppWithDevTools';

// $FlowFixMe
domRender(<AppWithDev />, document.getElementById('app'));
