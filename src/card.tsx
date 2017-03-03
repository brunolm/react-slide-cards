import * as Draggable from 'react-draggable';
import * as React from 'react';

import { findDOMNode } from 'react-dom';

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
  constructor(props) {
    super(props);

    this.state = {
      size: { width: 0, height: 0 },
      position: { x: 0, y: 0 },
      startPosition: { x: -Infinity, y: -Infinity },
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

  start(e, data) {
    const startX = this.state.startPosition.x;
    const startY = this.state.startPosition.y;

    this.setState({
      position: { x: data.x, y: data.y },
      startPosition: {
        x: startX === -Infinity ? data.x : startX,
        y: startY === -Infinity ? data.y : startY,
      },
    });
  }

  drag(e, data) {
    this.setState({
      position: { x: data.x, y: data.y },
    });
  }

  stop(e, data) {
    this.setState({
      position: { x: data.x, y: data.y },
    });

    const containerSize = this.props.containerSize;
    const cardSize = this.state.size;

    const node = findDOMNode<HTMLElement>(this);

    const x = data.x + node.offsetLeft;
    const y = data.y + node.offsetTop;

    const cardHalfWidth =  (cardSize.width / 2) | 0;

    if (x + cardSize.width - containerSize.width >= cardHalfWidth) {
      if (this.props.onSlideRight) {
        setTimeout(() => {
          this.props.onSlideRight(this, this.props.data);
        }, 1);
      }
    }
    else if (x <= -cardHalfWidth) {
      if (this.props.onSlideLeft) {
        setTimeout(() => {
          this.props.onSlideLeft(this, this.props.data);
        }, 1);
      }
    }
    else {
      this.resetPosition();
    }
  }

  resetPosition() {
    this.setState({
      position: { ...this.state.startPosition },
    });
  }

  render() {
    return (
      <Draggable
        position={ this.state.position }
        onStart={ this.start.bind(this) }
        onDrag={ this.drag.bind(this) }
        onStop={ this.stop.bind(this) }>
        <div className="slide-card" style={ this.props.style }>{this.props.children}</div>
      </Draggable>
    );
  }
}
