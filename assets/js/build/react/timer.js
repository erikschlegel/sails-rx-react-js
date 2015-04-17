'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _Rx = require('rx');

var _Rx2 = _interopRequireWildcard(_Rx);

var _RxReact = require('rx-react');

var _RxReact2 = _interopRequireWildcard(_RxReact);

var Timer = (function (_RxReact$Component) {
  function Timer() {
    _classCallCheck(this, Timer);

    if (_RxReact$Component != null) {
      _RxReact$Component.apply(this, arguments);
    }
  }

  _inherits(Timer, _RxReact$Component);

  _createClass(Timer, [{
    key: 'getStateStream',
    value: function getStateStream() {
      return _Rx2['default'].Observable.interval(1000).map(function (interval) {
        return {
          secondsElapsed: interval
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var secondsElapsed = this.state ? this.state.secondsElapsed : 0;
      return _React2['default'].createElement(
        'div',
        null,
        'Seconds Elapsed: ',
        secondsElapsed
      );
    }
  }]);

  return Timer;
})(_RxReact2['default'].Component);

module.exports = Timer;