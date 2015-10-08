var clone = require('clone')
var integer = require('./factory.js')
var is = require('./compare.js')

function addNaturalNumbers(a, b) {
  var x = clone(a)
  var y = clone(b)

  var diff = x.length - y.length
  if (diff < 0) {
    return addNaturalNumbers(y, x)
  } else if (diff > 0) {
    var blank = new Array(diff)
    blank.fill(0)
    y = blank.concat(y)
  }

  return addHelper(x, y)
}

function addHelper(x, y, c=[], round=false) {
  var index = x.length - 1
  var num = x[index] + y[index]

  if (round) {
    num += 1
  }

  if (num >= 10 && index > 0) {
    c.unshift(num - 10)
    x.pop()
    y.pop()
    return addHelper(x, y, c, true)
  } else if (num > 0 && index === 0) {
    c = num.toString().split('').map(function(a) {return parseInt(a)}).concat(c)
    return c
  } else {
    c.unshift(num)
    x.pop()
    y.pop()
    return addHelper(x, y, c)
  }
}

function ninesComplement(x) {
  return x.map(function(a) {
    return 9 - a
  })
}

function subtractHelper(a, b) {
  var x = clone(a)
  var y = clone(b)
  var z = ninesComplement(addNaturalNumbers(ninesComplement(x), y))
  return z
}

function subtract(a, b) {
  var x = clone(a.value)
  var y = clone(b.value)

  if (a.sign === '-' && b.sign === '+') {
    return integer(addNaturalNumbers(x, y), '-')
  } else if (a.sign === '+' && b.sign === '-') {
    return integer(addNaturalNumbers(x, y))
  } else if (a.sign === '-' && b.sign === '-') {
    return subtract(integer(y), integer(x))
  } else if (!is.greaterThanEq(a, b)) {
    return integer(subtract(b, a).value, '-')
  } else {
    return integer(subtractHelper(x, y))
  }

}

function add(a, b) {
  var sum = addNaturalNumbers(a.value, b.value)
  if (a.sign === b.sign) {
    return integer(sum, a.sign)
  } else if (a.sign === '-' && b.sign === '+') {
    return subtract(b, integer(a.value))
  } else if (a.sign === '+' && b.sign === '-') {
    return subtract(a, integer(b.value))
  }
}

module.exports = {
  add,
  subtract
}
