import * as Draggable from 'react-draggable';
import * as React from 'react';

import { findDOMNode } from 'react-dom';

export interface CardsProps {
  cards: any[],
  style: any;
  renderCard: (card: any, props?: any) => any;

  className?: string;

  buttonLeft?: any;
  buttonRight?: any;

  onSlideLeft?: (controller, card: any) => any;
  onSlideRight?: (controller, card: any) => any;

  leftEnabled?: () => boolean;
  rightEnabled?: () => boolean;
}

export interface CardsState {
  cards: any[],
  size: {
    width: number;
    height: number;
  },
}

export default class Cards extends React.Component<CardsProps, CardsState> {
  constructor(props) {
    super(props);

    this.state = {
      cards: this.props.cards,
      size: { width: 0, height: 0 },
    };
  }

  componentDidMount() {
    const node = findDOMNode<HTMLElement>(this);

    this.setState({
      size: {
        width: node.offsetWidth,
        height: node.offsetHeight,
      },
    });
  }

  getActiveCard() {
    return this.state.cards && this.state.cards.length
      ? this.state.cards[0]
      : undefined;
  }

  onSlideLeft(card) {
    if (this.props.onSlideLeft) {
      this.props.onSlideLeft(this, card);
    }
  }
  onSlideRight(card) {
    if (this.props.onSlideRight) {
      this.props.onSlideRight(this, card);
    }
  }

  render() {
    const { children, style } = this.props;

    const cards = this.state.cards.map(card => {
      const props = {
        key: card.id,
        data: card,
        containerSize: this.state.size,
        onSlideLeft: this.onSlideLeft.bind(this, card),
        onSlideRight: this.onSlideRight.bind(this, card),
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
        },
        ...card.props,
      };
      return this.props.renderCard(card, props);
    });

    const cardsStyle = {
      position: 'relative',
      ...style,
    };

    const leftAlertClass = `card-slide-alert card-slide-alert-left ${this.props.leftEnabled() ? '' : 'disabled'}`;
    const rightAlertClass = `card-slide-alert card-slide-alert-right ${this.props.rightEnabled() ? '' : 'disabled'}`;

    return (
      <div className={ this.props.className } style={ cardsStyle }>
        <div className={ leftAlertClass }
          onClick={ this.onSlideLeft.bind(this, this.getActiveCard()) }>
          { this.props.buttonLeft }
        </div>
        <div className={ rightAlertClass }
          onClick={ this.onSlideRight.bind(this, this.getActiveCard()) }>
          { this.props.buttonRight }
        </div>
        { cards.reverse().map((card, index) =>
          card
        )}
      </div>
    );
  }
}
