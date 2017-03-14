"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var react_dom_1 = require("react-dom");
var Cards = (function (_super) {
    __extends(Cards, _super);
    function Cards(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            cards: _this.props.cards,
            size: { width: 0, height: 0 },
        };
        return _this;
    }
    Cards.prototype.componentDidMount = function () {
        var node = react_dom_1.findDOMNode(this);
        this.setState({
            size: {
                width: node.offsetWidth,
                height: node.offsetHeight,
            },
        });
    };
    Cards.prototype.getActiveCard = function () {
        return this.state.cards && this.state.cards.length
            ? this.state.cards[0]
            : undefined;
    };
    Cards.prototype.onSlideLeft = function (card) {
        if (this.props.onSlideLeft) {
            this.props.onSlideLeft(this, card);
        }
    };
    Cards.prototype.onSlideRight = function (card) {
        if (this.props.onSlideRight) {
            this.props.onSlideRight(this, card);
        }
    };
    Cards.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, style = _a.style;
        var cards = this.state.cards.map(function (card) {
            var props = __assign({ key: card.id, data: card, containerSize: _this.state.size, onSlideLeft: _this.onSlideLeft.bind(_this, card), onSlideRight: _this.onSlideRight.bind(_this, card), style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                } }, card.props);
            return _this.props.renderCard(card, props);
        });
        var cardsStyle = __assign({ position: 'relative' }, style);
        var leftAlertClass = "card-slide-alert card-slide-alert-left " + (!this.props.leftEnabled || this.props.leftEnabled() ? '' : 'disabled');
        var rightAlertClass = "card-slide-alert card-slide-alert-right " + (!this.props.rightEnabled || this.props.rightEnabled() ? '' : 'disabled');
        return (React.createElement("div", { className: this.props.className, style: cardsStyle },
            React.createElement("div", { className: leftAlertClass, onClick: this.onSlideLeft.bind(this, this.getActiveCard()) }, this.props.buttonLeft),
            React.createElement("div", { className: rightAlertClass, onClick: this.onSlideRight.bind(this, this.getActiveCard()) }, this.props.buttonRight),
            cards.reverse().map(function (card, index) {
                return card;
            })));
    };
    return Cards;
}(React.Component));
exports.default = Cards;
//# sourceMappingURL=cards.js.map