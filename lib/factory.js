/**
 * Defines the integer factory function and basic operations on it.
 * @module factory
 */

'use strict';

var prototype = {};
Object.defineProperty(prototype, 'toString', {
  value: function value() {
    if (this.value.join('') === '') {
      return 'undefined';
    } else {
      return this.sign === '-' ? this.sign + this.value.join('') : this.value.join('');
    }
  }
});

Object.defineProperty(prototype, 'valueOf', {
  value: function value() {
    return Number(this.toString());
  }
});

Object.defineProperty(prototype, 'type', {
  value: 'integer'
});

Object.defineProperty(prototype, 'digits', {
  get: function get() {
    return this.value.length;
  }
});

Object.freeze(prototype);

/**
 * A factory function that outputs a new immutable integer type.
 * @param  {array | integer | num}  num  The value (as an array, number, or integer) for the new integer.
 * @param  {String} [sign='+'] The sign of the new integer. Defaults to '+'
 * @return {integer}      The newly created integer. Has value = num and sign = sign.
 */
function integer() {
  var _arguments = arguments;
  var _again = true;

  _function: while (_again) {
    num = sign = output = digits = undefined;
    var num = _arguments.length <= 0 || _arguments[0] === undefined ? [] : _arguments[0];
    _again = false;
    var sign = _arguments.length <= 1 || _arguments[1] === undefined ? '+' : _arguments[1];

    var output = Object.create(prototype);
    if (num.type === 'integer') {
      _arguments = [num.value, num.sign];
      _again = true;
      continue _function;
    } else if (num instanceof Array) {
      output.value = num;
      output.sign = sign;

      // Avoids having values of form [0,0,0....]
      if (output.value.every(function (a) {
        return a === 0;
      }) && output.value.length > 0) {
        output.value = [0];
      }
    } else {
      var digits = num.toString().split('');
      digits = digits.map(function (a) {
        if (a !== '-' && a !== '+') {
          return parseInt(a);
        } else {
          return a;
        }
      });
      if (digits[0] === '+' || digits[0] === '-') {
        output.sign = digits[0];
        digits.shift();
        output.value = digits;
      } else {
        output.sign = sign;
        output.value = digits;
      }
    }
    return Object.freeze(output);
  }
}

/**
 * Export integer factory function
 * @type {function}
 */
module.exports = integer;
//# sourceMappingURL=factory.js.map
