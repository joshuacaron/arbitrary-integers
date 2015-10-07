var multiply = require('./multiply.js')
var is = require('./compare.js')
var subtract = require('./subtract.js')
var constant = require('./constants.js')
var Integer = require('./integer.js')

function power(base, exp) {
  var output = Integer(1)
  if (is.lessThan(exp, constant.NEG_ZERO)) { // Need to use -0 or else a^{-0} is not 1
    throw new Error('Cannot take negative powers of integers.')
    return
  }
  while (is.greaterThan(exp,constant.ZERO)) {
    output = multiply(output, base)
    exp = subtract(exp,constant.ONE)
  }
  return output
}

module.exports = power
