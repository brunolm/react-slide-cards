"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var index_1 = require("./index");
var react_dom_1 = require("react-dom");
var style = {
    width: '400px',
    height: '400px',
    background: 'green',
    overflow: 'hidden',
};
var cardsData = [
    { name: 'Card 1', description: 'Some card stuff here' },
    { name: 'Card 2', description: 'Some card stuff here' },
    { name: 'Card 3', description: 'Some card stuff here' },
].reduce(function (cards, card, index) {
    cards.push(__assign({ id: index }, card));
    return cards;
}, []);
var renderCard = function (card, props) {
    return (React.createElement(index_1.Card, __assign({}, props),
        React.createElement("h4", null, card.name),
        React.createElement("p", null, card.description)));
};
var buttonLeft = (React.createElement("button", null, "Left"));
var buttonRight = (React.createElement("button", null, "Right"));
var left = function (cardsControl, card) {
    var cardsOrder = cardsControl.state.cards
        .filter(function (item) { return item.id !== card.id; });
    cardsControl.setState({
        cards: cardsOrder,
    });
    cardsControl.setState({
        cards: cardsOrder.concat(card),
    });
};
var right = function (cardsControl, card) {
    var cardsOrder = cardsControl.state.cards
        .filter(function (item) { return item.id !== card.id; });
    cardsControl.setState({
        cards: cardsOrder,
    });
};
var leftEnabled = function () { return true; };
var rightEnabled = function () {
    return Math.random() > 0.5;
};
var cards = (React.createElement(index_1.Cards, { cards: cardsData, renderCard: renderCard, style: style, buttonLeft: buttonLeft, buttonRight: buttonRight, onSlideLeft: left, onSlideRight: right, leftEnabled: leftEnabled, rightEnabled: rightEnabled }));
var container = (React.createElement("div", null, cards));
react_dom_1.render(container, document.getElementById('root'));
//# sourceMappingURL=example.js.map