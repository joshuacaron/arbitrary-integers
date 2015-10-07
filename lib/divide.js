var Integer = require('./integer.js')
var clone = require('clone')
var constant = require('./constants.js')
var helper = require('./helpers.js')
var is = require('./compare.js')
var subtract = require('./subtract.js')
var add = require('./add.js')

// Divides a by b using long division and returns the quotient (q) or the remainder (r). Should  probably switch to Newton-Raphson for large numbers.
function divide(a, b, keep, remainderSign) {
  var output = Integer()
  var remainder = Integer()
  var newA
  var newB

  // Get straightforward cases out of the way
  if (is.greaterThan(b,a) && a.sign === '+' && b.sign === '+') {
    output = clone(constant.ZERO)
    remainder = clone(a)
  } else if (is.equal(a,b) && a.sign === '+') {
    remainder = clone(constant.ZERO)
    output = clone(constant.ONE)
  } else if (is.equal(a,b) && a.sign === '-') {
    remainder = clone(constant.NEG_ZERO)
    output = clone(constant.ONE)
  } else if (is.equal(b,constant.ZERO)) {
    throw new Error('Cannot divide by zero.')
  } else if (is.equal(b,constant.ONE)) {
    output = clone(a)
    remainder = clone(constant.ZERO)
  } else if (is.equal(a,constant.ZERO)) {
    output = clone(constant.ZERO)
    remainder = clone(constant.ZERO)
  } else if ((a.sign === '+' && b.sign === '-') || (a.sign === '-' && b.sign === '+')) {
    // Reframe in terms of simpler problems
    newA = clone(a)
    newB = clone(b)

    newA.sign = '+'
    newB.sign = '+'

    output = divide(newA, newB, keep)
    output.sign = '-'
    return output
  } else if (a.sign === '-' && b.sign === '-') {
    newA = clone(a)
    newA.sign = '+'
    newB = clone(b)
    newB.sign = '+'

    return divide(newA, newB, keep, '-')
  }

  // Do division for remaining case
  else {
    var num = clone(a)
    var denom = clone(b)
    var len = denom.digits

    while (is.greaterThan(num, denom)) {
      var tempNum = helper.truncateN(num, len)
      var subCount = 0
      var interim = Integer(0)

      if (is.greaterThan(tempNum, denom) || is.equal(tempNum,denom)) {

        while (is.greaterThan(tempNum, denom) || is.equal(tempNum,denom)) {
          tempNum = subtract(tempNum, denom)
          helper.trim(tempNum)
          interim = add(interim,denom)
          subCount += 1
        }
        output.value.push(subCount)

        helper.fillZerosNEnd(num,interim, num.digits - len)
        num = subtract(num,interim)
        helper.trim(num)

        len = denom.digits
      } else {
        ++len
      }
    }

    // Add trailing zeros
    while (a.digits - b.digits > output.digits) {
      output.value.push(0)
    }

    // If remainder is empty it should be zero
    remainder = clone(num)
    if (remainder.toString() === 'undefined') {
      remainder.value = [0]
    }
  }

  if (remainderSign === '-') {
    remainder.sign = '-'
  }

  return keep === 'r' ? remainder : output
}

function mod(a, b) {
  return divide(a, b, 'r')
}

function quotient(a, b) {
  return divide(a, b, 'q')
}

module.exports = {
  mod: mod,
  quotient: quotient,
}
