// @flow
import React from 'react';

import { inject } from 'common-components/Hoc';
import Loader from 'common-components/Loader';

type Props = {
    loading: boolean,
};

function Loading({ loading }: Props) {
    return <Loader overlay visible={loading} />;
}

const injected = inject(Loading, x => ({ loading: x.services.common.loading }));

export default injected;
export { Loading as WrappedComponent };
