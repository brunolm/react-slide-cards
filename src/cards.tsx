import * as Draggable from 'react-draggable';
import * as React from 'react';

import { findDOMNode } from 'react-dom';

export interface CardsProps {
  cards: any[],
  style: any;
  renderCard: (card: any, props?: any) => any;

  buttonLeft?: any;
  buttonRight?: any;

  onSlideLeft?: (controller, card: any) => any;
  onSlideRight?: (controller, card: any) => any;
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

    return (
      <div style={ cardsStyle }>
        <div className="card-slide-alert card-slide-alert-left"
          onClick={ this.onSlideLeft.bind(this, this.getActiveCard()) }>
          { this.props.buttonLeft }
        </div>
        <div className="card-slide-alert card-slide-alert-right"
          onClick={ this.onSlideRight.bind(this, this.getActiveCard()) }>
          { this.props.buttonRight }
        </div>
        { cards.reverse().map((card, index) =>
          <div key={ index }>{ card }</div>
        )}
      </div>
    );
  }
}