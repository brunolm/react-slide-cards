import * as React from 'react';

import { Card, Cards } from './index';

import { render } from 'react-dom';

const style = {
  width: '400px',
  height: '400px',
  background: 'green',
  overflow: 'hidden',
};

const cardsData = [
  { name: 'Card 1', description: 'Some card stuff here' },
  { name: 'Card 2', description: 'Some card stuff here' },
  { name: 'Card 3', description: 'Some card stuff here' },
].reduce((cards, card, index) => {
  cards.push({
    id: index,
    ...card,
  });
  return cards;
}, []);

const renderCard = (card, props) => {
  return (
    <Card { ...props }>
      <h4>{ card.name }</h4>
      <p>{ card.description }</p>
    </Card>
  );
};

const buttonLeft = (<button>Left</button>);
const buttonRight = (<button>Right</button>);

const left = (cardsControl, card: any) => {
  const cardsOrder = cardsControl.state.cards
    .filter(item => item.id !== card.id);

  cardsControl.setState({
    cards: cardsOrder,
  });

  cardsControl.setState({
    cards: cardsOrder.concat(card),
  });
};
const right = (cardsControl, card: any) => {
  const cardsOrder = cardsControl.state.cards
    .filter(item => item.id !== card.id);

  cardsControl.setState({
    cards: cardsOrder,
  });
};

const leftEnabled = () => true;
const rightEnabled = () => {
  return Math.random() > 0.5;
};

const cards = (
  <Cards cards={ cardsData }
    renderCard={ renderCard }
    style={ style }

    buttonLeft={ buttonLeft }
    buttonRight={ buttonRight }

    onSlideLeft={ left }
    onSlideRight= { right }

    leftEnabled={ leftEnabled }
    rightEnabled={ rightEnabled }

    />
);

const container = (
  <div>
    { cards }
  </div>
);

render(
  container
  , document.getElementById('root')
);
