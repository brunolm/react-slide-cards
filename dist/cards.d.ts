/// <reference types="react" />
import * as React from 'react';
export interface CardsProps {
    cards: any[];
    style: any;
    renderCard: (card: any, props?: any) => any;
    className?: string;
    buttonLeft?: any;
    buttonRight?: any;
    onSlideLeft?: (controller, card: any) => any;
    onSlideRight?: (controller, card: any) => any;
}
export interface CardsState {
    cards: any[];
    size: {
        width: number;
        height: number;
    };
}
export default class Cards extends React.Component<CardsProps, CardsState> {
    constructor(props: any);
    componentDidMount(): void;
    getActiveCard(): any;
    onSlideLeft(card: any): void;
    onSlideRight(card: any): void;
    render(): JSX.Element;
}
