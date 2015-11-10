'use strict';

var integer = require('./factory.js');
var add = require('./add.js');
var clone = require('clone');
var compare = require('./compare.js');

function simpleDivide(a, b) {
  var keep = arguments.length <= 2 || arguments[2] === undefined ? 'r' : arguments[2];

  var x = clone(a);
  var y = clone(b);
  var count = 0;
  while (compare.greaterThanEq(x, y)) {
    x = add.subtract(x, y);
    count += 1;
  }
  if (keep === 'r') {
    return x;
  } else if (keep === 'q') {
    count = integer(count);
    return count;
  } else {
    throw new Error('Invalid option for simpleDivide. Must keep either the remainder or the quotient.');
  }
}

function divide(a, b) {
  var keep = arguments.length <= 2 || arguments[2] === undefined ? 'r' : arguments[2];

  if (compare.equal(b, integer(0)) || compare.equal(b, integer(0, '-'))) {
    throw new Error('Cannot divide by zero.');
  }

  // Handle separately when one of the numbers is 1 or -1 so it doesn't take forever
  var output;
  if (compare.equal(b, integer(1)) || compare.equal(b, integer(-1))) {
    if (keep === 'r') {
      output = integer(0);
    } else {
      output = integer(a.value);
    }
  } else {
    output = simpleDivide(integer(a.value), integer(b.value), keep);
  }

  // Don't check sign if is zero
  if (compare.equal(output, integer(0))) {
    return output;
  }

  if (a.sign === b.sign && a.sign === '+') {
    return output;
  } else if (a.sign === b.sign && a.sign === '-') {
    if (keep === 'r') {
      return integer(output.value, '-');
    } else if (keep === 'q') {
      return output;
    }
  } else {
    if (keep === 'r') {
      return output;
    } else if (keep === 'q') {
      return integer(output.value, '-');
    }
  }
}

function mod(a, b) {
  return divide(a, b, 'r');
}

function quotient(a, b) {
  return divide(a, b, 'q');
}

module.exports = {
  mod: mod,
  quotient: quotient
};
//# sourceMappingURL=divide.js.map
