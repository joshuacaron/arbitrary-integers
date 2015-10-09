/**
 * Defines muliplication of integers and two helper functions to calculate the product.
 * @module multiply
 */

var integer = require('./factory.js')
var add = require('./add.js')
var clone = require('clone')

/**
 * Recursively mutliplies two arrays of digits x and y and returns an array of arrays of the digits to add up.
 * @param  {Array} x        The first array of digits.
 * @param  {Array} y        The second array of digits.
 * @param  {Number} [botIndex = y.length - 1] The current index on the bottom row for the next multiplication.
 * @param  {Number} [topIndex=x.length - 1] The current index on the top row for the next muliplication.
 * @param  {Array}  [rows=[[]]]     Keeps track of any past calculations and results.
 * @param  {Number} [round=0]    The value (if any) to round the next calculation by.
 * @return {Array}          Returns an array with the arrays of numbers to sum up to get the product.
 */
function multiplyHelper(x, y, botIndex = y.length - 1, topIndex = x.length - 1, rows = [[]], round = 0) {
  if (topIndex < 0 && botIndex > 0) {
    // If there is a digit to round add that before starting a new row.
    if (round) {
      rows[rows.length - 1].unshift(round)
    }

    var numZeros = rows.length
    var blank = new Array(numZeros)
    blank.fill(0)
    rows.push(blank)
    return multiplyHelper(x, y, botIndex - 1, x.length - 1, rows)
  } else if (topIndex < 0 && botIndex === 0) {
    // Add any rounding digits before finishing the calculation
    if (round) {
      rows[rows.length - 1].unshift(round)
    }

    return rows
  } else {
    var temp = rows[rows.length - 1]
    // Round the digit if it is greater than 10
    var rawNum = y[botIndex] * x[topIndex] + round
    var num = rawNum % 10
    temp.unshift(num)
    rows[rows.length - 1] = temp
    return multiplyHelper(x, y, botIndex, topIndex - 1, rows, (rawNum - num) / 10)
  }
}

/**
 * Sums up arrays of digits resulting from multiplication and returns an integer.
 * @param  {Array} rows An array of rows of digits resulting from multiplcation.
 * @return {integer}      Returns an integer with positive sign and value = the sum of rows.
 */
function sumMultiples(rows) {
  return rows.reduce(function(acc, a) {
    return add.add(acc, integer(a))
  }, integer(0))
}

/**
 * Wraps the muliplication helper functions and adds the correct sign.
 * @param  {integer} a The first integer to multiply.
 * @param  {integer} b The second integer to multiply.
 * @return {integer}   The product of a and b.
 */
function multiply(a, b) {
  var x = clone(a.value)
  var y = clone(b.value)
  var product = sumMultiples(multiplyHelper(x,y))

  if (a.sign === b.sign) {
    return integer(product.value)
  } else {
    return integer(product.value, '-')
  }
}

/**
 * Returns the multiply function
 * @type {function}
 */
module.exports = multiply
