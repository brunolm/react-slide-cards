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
var Draggable = require("react-draggable");
var React = require("react");
var react_dom_1 = require("react-dom");
var Card = (function (_super) {
    __extends(Card, _super);
    function Card(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            size: { width: 0, height: 0 },
            position: { x: 0, y: 0 },
            startPosition: { x: -Infinity, y: -Infinity },
        };
        return _this;
    }
    Card.prototype.componentDidMount = function () {
        var node = react_dom_1.findDOMNode(this);
        this.setState({
            size: {
                width: node.offsetWidth,
                height: node.offsetHeight,
            },
        });
    };
    Card.prototype.start = function (e, data) {
        var startX = this.state.startPosition.x;
        var startY = this.state.startPosition.y;
        this.setState({
            position: { x: data.x, y: data.y },
            startPosition: {
                x: startX === -Infinity ? data.x : startX,
                y: startY === -Infinity ? data.y : startY,
            },
        });
    };
    Card.prototype.drag = function (e, data) {
        this.setState({
            position: { x: data.x, y: data.y },
        });
    };
    Card.prototype.stop = function (e, data) {
        var _this = this;
        this.setState({
            position: { x: data.x, y: data.y },
        });
        var containerSize = this.props.containerSize;
        var cardSize = this.state.size;
        var node = react_dom_1.findDOMNode(this);
        var x = data.x + node.offsetLeft;
        var y = data.y + node.offsetTop;
        var cardHalfWidth = (cardSize.width / 2) | 0;
        if (x + cardSize.width - containerSize.width >= cardHalfWidth) {
            if (this.props.onSlideRight) {
                setTimeout(function () {
                    _this.props.onSlideRight(_this, _this.props.data);
                }, 1);
            }
        }
        else if (x <= -cardHalfWidth) {
            if (this.props.onSlideLeft) {
                setTimeout(function () {
                    _this.props.onSlideLeft(_this, _this.props.data);
                }, 1);
            }
        }
        else {
            this.resetPosition();
        }
    };
    Card.prototype.resetPosition = function () {
        this.setState({
            position: __assign({}, this.state.startPosition),
        });
    };
    Card.prototype.render = function () {
        var className = this.props.className || 'slide-card';
        return (React.createElement(Draggable, { position: this.state.position, onStart: this.start.bind(this), onDrag: this.drag.bind(this), onStop: this.stop.bind(this) },
            React.createElement("div", { className: className, style: this.props.style }, this.props.children)));
    };
    return Card;
}(React.Component));
exports.default = Card;
//# sourceMappingURL=card.js.map