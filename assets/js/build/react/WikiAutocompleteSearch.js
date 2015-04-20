'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _React = require('react');

var _React2 = _interopRequireWildcard(_React);

var _Rx = require('rx-dom');

var _Rx2 = _interopRequireWildcard(_Rx);

var _RxReact = require('rx-react');

var _RxReact2 = _interopRequireWildcard(_RxReact);

var _Constants = require('../Constants');

var _Constants2 = _interopRequireWildcard(_Constants);

var WikiAutocompleteSearch = (function (_RxReact$Component) {
  function WikiAutocompleteSearch(props) {
    _classCallCheck(this, WikiAutocompleteSearch);

    _get(Object.getPrototypeOf(WikiAutocompleteSearch.prototype), 'constructor', this).call(this, props);
    this.keyup = _RxReact.FuncSubject.create();
  }

  _inherits(WikiAutocompleteSearch, _RxReact$Component);

  _createClass(WikiAutocompleteSearch, [{
    key: 'getStateStream',
    value: function getStateStream() {
      return this.keyup.map(function (e) {
        return e.target.value;
      }).filter(function (text) {
        return text.length > 2;
      }).throttle(750).distinctUntilChanged().flatMapLatest(function (text) {
        return _Rx2['default'].DOM.jsonpRequest(_Constants2['default'].wikiURl(text));
      }).map(function (results) {
        var response = [];
        results.response[1].map(function (name, index) {
          return response.push({ name: name, description: results.response[2][index], url: results.response[3][index] });
        });
        return { results: response };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var results = this.state && this.state.results || [];
      return _React2['default'].createElement(
        'div',
        { 'class': 'input-group' },
        _React2['default'].createElement(
          'div',
          null,
          'Start Typing'
        ),
        _React2['default'].createElement(
          'span',
          { id: 'sizing-addon2', 'class': 'input-group-addon' },
          _React2['default'].createElement('i', { 'class': 'fa fa-search' })
        ),
        _React2['default'].createElement('input', { type: 'text', 'aria-describedby': 'sizing-addon2', 'class': 'form-control', id: 'searchtext', onKeyUp: this.keyup, placeholder: 'Wikipedia SearcH' }),
        _React2['default'].createElement(
          'ul',
          { id: 'results' },
          results.map(function (result, index) {
            return _React2['default'].createElement(
              'li',
              { key: index },
              result
            );
          })
        )
      );
    }
  }]);

  return WikiAutocompleteSearch;
})(_RxReact2['default'].Component);

module.exports = WikiAutocompleteSearch;