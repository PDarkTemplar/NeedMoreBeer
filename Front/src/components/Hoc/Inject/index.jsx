// @flow
import type { TFunction } from 'react-i18next';
import { inject as mobxInject, observer } from 'mobx-react';
import { translate } from 'react-i18next';

import type { GlobalStoreInjected, GlobalStore } from '~/types/globalStore';

type StoreMap<I> = (globalStore: GlobalStore) => I;

function inject<P, Component: React$ComponentType<P>, I>(
    component: Component,
    storeMap: StoreMap<I>
): Class<React$Component<$Diff<React$ElementConfig<Component>, I>>> {
    const observ = observer(component);
    const injected = mobxInject(({ globalStore }: GlobalStoreInjected) => storeMap(globalStore))(
        observ
    );

    return injected;
}

function translateInject<P, Component: React$ComponentType<P>, I>(
    component: Component,
    storeMap: StoreMap<I>
): Class<React$Component<$Diff<React$ElementConfig<Component>, I & { +t: TFunction }>>> {
    const observ = observer(component);
    const injected = mobxInject(({ globalStore }: GlobalStoreInjected) => storeMap(globalStore))(
        observ
    );
    const translated = translate()(injected);

    return translated;
}

export { inject };
export { translateInject };
