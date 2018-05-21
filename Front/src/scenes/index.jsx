// @flow
import React from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import 'react-toastify/dist/ReactToastify.min.css';

import 'moment-duration-format';

import stores from '~/stores';

import Startup from './components/Startup';

import './index.global.scss';

// $FlowFixMe
configure({ enforceActions: true });

function App() {
    return (
        <Provider globalStore={stores}>
            <Startup />
        </Provider>
    );
}

export default App;
