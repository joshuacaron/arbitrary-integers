/**
 * Defines addition and subtraction operations of integers.
 * @module add
 */

'use strict';

var clone = require('clone');
var integer = require('./factory.js');
var is = require('./compare.js');

/**
 * Wrapper for helper function to add two arrays representing the digits of 2 natural numbers.
 * @param {Array} a The first array.
 * @param {Array} b The second array.
 * @return {Array} Returns an array with the sum of the digits of x and y.
 */
function addNaturalNumbers(_x3, _x4) {
  var _again = true;

  _function: while (_again) {
    var a = _x3,
        b = _x4;
    x = y = diff = blank = undefined;
    _again = false;

    var x = clone(a);
    var y = clone(b);

    var diff = x.length - y.length;
    if (diff < 0) {
      _x3 = y;
      _x4 = x;
      _again = true;
      continue _function;
    } else if (diff > 0) {
      var blank = new Array(diff);
      blank.fill(0);
      y = blank.concat(y);
    }

    return addHelper(x, y);
  }
}

/**
 * Helper function to recursively add two arrays of digits of natural numbers.
 * @param {Array}  x     The first array of digits.
 * @param {Array}  y     The second array of digits.
 * @param {Array}   [c=[]]     Tracks partially added numbers.
 * @param {Boolean} [round=false] Tracks whether to round the next calculation or not.
 * @return {Array} Returns an array with the sum of the digits of x and y.
 */
function addHelper(_x5, _x6) {
  var _arguments2 = arguments;
  var _again2 = true;

  _function2: while (_again2) {
    var x = _x5,
        y = _x6;
    c = round = index = num = undefined;
    var c = _arguments2.length <= 2 || _arguments2[2] === undefined ? [] : _arguments2[2];
    _again2 = false;
    var round = _arguments2.length <= 3 || _arguments2[3] === undefined ? false : _arguments2[3];

    var index = x.length - 1;
    var num = x[index] + y[index];

    if (round) {
      num += 1;
    }

    if (num >= 10 && index > 0) {
      c.unshift(num - 10);
      x.pop();
      y.pop();
      _arguments2 = [_x5 = x, _x6 = y, c, true];
      _again2 = true;
      continue _function2;
    } else if (num >= 0 && index === 0) {
      c = num.toString().split('').map(function (a) {
        return parseInt(a);
      }).concat(c);
      return c;
    } else {
      c.unshift(num);
      x.pop();
      y.pop();
      _arguments2 = [_x5 = x, _x6 = y, c];
      _again2 = true;
      continue _function2;
    }
  }
}

/**
 * Helper function to calculate the nines complement of an array of digits.
 * @param  {Array} x The array of digits to calculate the complement of.
 * @return {Array}   Returns an array with the complement of the input.
 */
function ninesComplement(x) {
  return x.map(function (a) {
    return 9 - a;
  });
}

/**
 * Helper function to do simple subtraction when a > b > 0.
 * @param  {Array} a The first array of digits.
 * @param  {Array} b The second array of digits.
 * @return {Array}   Returns an array with the difference between a and b.
 */
function subtractHelper(a, b) {
  var x = clone(a);
  var y = clone(b);
  var z = ninesComplement(addNaturalNumbers(ninesComplement(x), y));
  return z;
}

/**
 * Wrapper to perform the correct subtract or addition operation depending on signs.
 * @param  {integer} a The minuend.
 * @param  {integer} b The subtruhend.
 * @return {integer}   Returns an integer with the difference between a and b.
 */
function subtract(_x7, _x8) {
  var _again3 = true;

  _function3: while (_again3) {
    var a = _x7,
        b = _x8;
    x = y = undefined;
    _again3 = false;

    var x = clone(a.value);
    var y = clone(b.value);

    if (a.sign === '-' && b.sign === '+') {
      return integer(addNaturalNumbers(x, y), '-');
    } else if (a.sign === '+' && b.sign === '-') {
      return integer(addNaturalNumbers(x, y));
    } else if (a.sign === '-' && b.sign === '-') {
      _x7 = integer(y);
      _x8 = integer(x);
      _again3 = true;
      continue _function3;
    } else if (!is.greaterThanEq(a, b)) {
      return integer(subtract(b, a).value, '-');
    } else {
      return integer(subtractHelper(x, y));
    }
  }
}

/**
 * Wrapper function to perform the correct subtraction or addition operation depending on signs.
 * @param {integer} a The first integer to add.
 * @param {integer} b The second integer to add.
 * @return {integer} Returns the sum of a and b.
 */
function add(a, b) {
  var sum = addNaturalNumbers(a.value, b.value);
  if (a.sign === b.sign) {
    return integer(sum, a.sign);
  } else if (a.sign === '-' && b.sign === '+') {
    return subtract(b, integer(a.value));
  } else if (a.sign === '+' && b.sign === '-') {
    return subtract(a, integer(b.value));
  }
}

module.exports = {
  add: add,
  subtract: subtract
};
//# sourceMappingURL=add.js.map
