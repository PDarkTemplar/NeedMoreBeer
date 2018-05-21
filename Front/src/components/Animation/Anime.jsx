// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import isEqual from 'lodash.isequal';
import anime from 'animejs';

import type { AnimeProps } from './types';

class Anime extends Component<AnimeProps> {
    componentDidMount() {
        this.createAnime();
    }

    shouldComponentUpdate(nextProps: AnimeProps) {
        return this.checkKeys(nextProps);
    }

    componentDidUpdate(prevProps: AnimeProps) {
        if (!isEqual(this.props.anim, prevProps.anim)) {
            this.createAnime(this.props);
        }
    }

    checkKeys = (nextProps: AnimeProps) => {
        const oldKeys = React.Children.map(this.props.children, child => child.key);
        const newKeys = React.Children.map(nextProps.children, child => child.key);

        if (!oldKeys.length || newKeys.length) return true;
        if (isEqual(oldKeys, newKeys)) return false;
        return true;
    };

    targets: any[] = [];

    createAnime = (props: AnimeProps = this.props) => {
        const animeProps = { targets: this.targets, ...props.anim };

        anime.remove(this.targets);

        anime(animeProps);
    };

    addTarget = (node: any) => {
        // eslint-disable-next-line react/no-find-dom-node
        this.targets = [...this.targets, ReactDOM.findDOMNode(node)];
    };

    render() {
        const { children } = this.props;

        return React.Children.map(children, child =>
            React.cloneElement(child, {
                ref: this.addTarget,
            })
        );
    }
}

export default Anime;
