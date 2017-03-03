/// <reference types="react" />
import * as React from 'react';
export interface Size {
    width: number;
    height: number;
}
export interface Position {
    x: number;
    y: number;
}
export interface CardProps {
    data: any;
    style?: any;
    className?: string;
    containerSize?: Size;
    onSlideLeft?: (controller, card: Card) => any;
    onSlideRight?: (controller, card: Card) => any;
}
export interface CardState {
    size: Size;
    position: Position;
    startPosition: Position;
}
export default class Card extends React.Component<CardProps, CardState> {
    constructor(props: any);
    componentDidMount(): void;
    start(e: any, data: any): void;
    drag(e: any, data: any): void;
    stop(e: any, data: any): void;
    resetPosition(): void;
    render(): JSX.Element;
}
