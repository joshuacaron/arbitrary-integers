var clone = require('clone');
var Integer = require('./lib/integer.js');
var constants = require('./lib/constants.js');
var add = require('./lib/add.js');
var subtract = require('./lib/subtract.js');
var is = require('./lib/compare.js');
var div = require('./lib/divide.js');
var multiply = require('./lib/multiply.js');

module.exports = {
    Integer:      Integer
  , equal:        is.equal
  , greaterThan:  is.greaterThan
  , lessThan:     is.lessThan
  , add:          add
  , subtract:     subtract
  , multiply:     multiply
  , frac:         div.frac
  , mod:          div.mod
};