/**
 * Defines various comparison operators for integers.
 * @module compare
 */

'use strict';

var integer = require('./factory.js');

/**
 * Tests if integer a is greater than integer b and returns a boolena.
 * @param  {integer} a The first integer.
 * @param  {integer} b The second integer.
 * @return {boolean}   Returns true iff a > b.
 */
function greaterThanEq(a, b) {
  if (a.sign === '+' && b.sign === '-') {
    return true;
  } else if (a.sign === '-' && b.sign === '+') {
    return false;
  } else if (a.sign === '-' && b.sign === '-') {
    return !greaterThanEq(integer(a.value), integer(b.value));
  } else if (a.digits > b.digits) {
    return true;
  } else if (b.digits > a.digits) {
    return false;
  } else {
    for (var i = 0; i < a.digits; ++i) {
      if (a.value[i] > b.value[i]) {
        return true;
      } else if (b.value[i] > a.value[i]) {
        return false;
      }
    }
    return true;
  }
}

/**
 * Tests if integers a and b are equal and returns a boolean.
 * @param  {integer} a The first integer.
 * @param  {integer} b The second integer.
 * @return {boolean}   Returns true iff a === b.
 */
function equal(a, b) {
  // Test that the digits are equal so it rejects early when they are different lengths
  return a.sign === b.sign && a.digits === b.digits && a.value.every(function (x, i) {
    return a.value[i] === b.value[i];
  });
}

/**
 * Tests if integers a and b are not equal and returns a boolean.
 * @param  {integer} a The first integer.
 * @param  {integer} b The second integer.
 * @return {boolean}   Returns true iff a !== b.
 */
function notEqual(a, b) {
  return !equal(a, b);
}

/**
 * Tests if integer a is strictly greater than integer b and returns a boolean.
 * @param  {integer} a The first integer.
 * @param  {integer} b The second integer.
 * @return {boolean}   Returns true iff a > b.
 */
function greaterThan(a, b) {
  return greaterThanEq(a, b) && notEqual(a, b);
}

/**
 * Tests if integer a is less than or equal to integer b and returns a boolean.
 * @param  {integer} a The first integer.
 * @param  {integer} b The second integer.
 * @return {boolean}   Returns true iff a <= b.
 */
function lessThanEq(a, b) {
  return !greaterThan(a, b);
}

/**
 * Tests if integer a is strictly less than integer b and returns a boolean.
 * @param  {integer} a The first integer.
 * @param  {integer} b The second integer.
 * @return {boolean}   Returns true iff a < b.
 */
function lessThan(a, b) {
  return !greaterThanEq(a, b);
}

/**
 * Export comparison operators.
 * @type {Object}
 */
module.exports = {
  greaterThanEq: greaterThanEq,
  greaterThan: greaterThan,
  lessThanEq: lessThanEq,
  lessThan: lessThan,
  equal: equal,
  notEqual: notEqual
};
//# sourceMappingURL=compare.js.map
