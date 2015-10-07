var Integer = require('./integer.js')
var clone = require('clone')

// Adds leading 0s to shorter integer to normalize length
function fillZeros(a, b) {
  if (a.type === 'integer' && b.type === 'integer') {
    var numZeros = a.digits - b.digits
    if (numZeros === 0) {
      return
    } else if (numZeros > 0) {
      for (var i = 0; i < numZeros; ++i) {
        b.value.unshift(0)
      }
    } else if (numZeros < 0) {
      for (var j = 0; j < -1 * numZeros; ++j) {
        a.value.unshift(0)
      }
    }
  } else {
    console.error(new Error('Both inputs must be Integers.'))
  }
}

// Adds trailing zeros to shorter integer to normalize length
function fillZerosNEnd(a, b, n) {
  if (a.type === 'integer' && b.type === 'integer') {
    var numZeros = n
    if (numZeros === 0) {
      return
    } else if (numZeros > 0) {
      for (var i = 0; i < numZeros; ++i) {
        b.value.push(0)
      }
    } else if (numZeros < 0) {
      for (var j = 0; j < -1 * numZeros; ++j) {
        a.value.push(0)
      }
    }
  } else {
    console.error(new Error('Both inputs must be Integers.'))
  }
}

function addNZeros(n) {
  var output = [];
  for (var i = 0; i < n; ++i) {
    output.push(0);
  }
  return output;
}

function sumArray(list) {
  var sum = Integer()
  sum.value = list[0]

  for (var i = 1; i < list.length; ++i) {
    var temp = Integer()
    temp.value = list[i]

    sum = require('./add.js')(sum, temp)
  }

  return sum;
}

// Truncates an integer to n digits
function truncateN(int, n) {
  var output = clone(int)
  if (n < output.digits) {
    // console.log('hi');
    var newVal = []
    for (var i = 0; i < n; ++i) {
      newVal.push(output.value[i])
    }
    output.value = newVal
  }
  return output
}
// gets rid of leading zeros
function trim(n) {
  var val = []
  for (var i = 0; i < n.digits; ++i) {
    if (n.value[i] !== 0 || val.length !== 0) {
      val.push(n.value[i])
    }
  }
  if (val === []) {
    val = [0]
  }
  n.value = val
}

// Adds 2 positive integers
function addNat(a, b) {
  var fst = clone(a)
  var snd = clone(b)
  var sum = []
  var output = Integer()
  var round = false

  output.sign = a.sign
  fillZeros(fst,snd)

  for (var i = snd.digits - 1; i >= 0; --i) {
    var partialSum = fst.value[i] + snd.value[i]

    if (round === true) {
      partialSum += 1
      round = false
    }

    if (partialSum < 10) {
      sum.unshift(partialSum)
    } else {
      sum.unshift(partialSum - 10)
      if (i !== 0) {
        round = true
      } else {
        sum.unshift(1)
      }
    }
  }

  output.value = sum
  return output
}

module.exports = {trim: trim
, truncateN: truncateN
, sumArray: sumArray
, addNZeros: addNZeros
, fillZeros: fillZeros
, fillZerosNEnd: fillZerosNEnd
, addNat: addNat
}
