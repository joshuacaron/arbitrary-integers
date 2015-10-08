var integer = require('./factory.js')

function greaterThanEq(a, b) {
  if (a.sign === '+' && b.sign === '-') {
    return true
  } else if (a.sign === '-' && b.sign === '+') {
    return false
  } else if (a.sign === '-' && b.sign === '-') {
    return !greaterThanEq(integer(a.value), integer(b.value))
  } else if (a.digits > b.digits) {
    return true
  } else if (b.digits > a.digits) {
    return false
  } else {
    for (var i = 0; i < a.digits; ++i) {
      if (a.value[i] > b.value[i]) {
        return true
      } else if (b.value[i] > a.value[i]) {
        return false
      }
    }
    return true
  }
}

function equal(a, b) {
  return a.sign === b.sign && a.digits === b.digits && a.value.every(function(x, i) {return a.value[i] === b.value[i]})
}

function notEqual(a, b) {
  return !equal(a,b)
}

module.exports = {
  greaterThanEq,
  equal,
  notEqual
}
