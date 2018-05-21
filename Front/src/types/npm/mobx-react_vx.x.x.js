declare module 'mobx-react' {
    declare type Connector<P, I> = (<Component: React$ComponentType<$Supertype<P & I>>>(
        component: Component
    ) => Class<React$Component<$Diff<React$ElementConfig<Component>, I>>>);

    declare type IStoresToProps<S, P, I, C> = (stores: S, nextProps?: P, context?: C) => I;

    declare export function inject<S, P, I, C>(
        storesToProps: IStoresToProps<S, P, I, C>
    ): Connector<P, I>;

    declare export class Provider extends React$Component<any, {}> {}

    declare export function observer<P, Component: React$ComponentType<P>>(clazz: Component): Component;
}