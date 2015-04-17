var CONST_ES6_BUILD_PATH = './build/';

var _  = require('lodash');
var io = require('./dependencies/sails.io.js')();
var React = require('react');

var Title = require('./build/react/title');
var Timer = require('./build/react/timer');

React.render(
  <Title name="Erik Schlegel"/>,
  document.getElementById('main-title')
);

 React.render(
   <Timer />,
   document.getElementById('timer-component')
 );