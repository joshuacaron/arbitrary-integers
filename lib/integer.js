var proto = {}

// Formats to a string
Object.defineProperty(proto, 'toString', {
  value: function() {
    if (this.value.join('') === '') {
      return 'undefined'
    } else if (this.sign === '-') {
      return '-' + this.value.join('')
    } else {
      return this.value.join('')
    }
  }
})

Object.defineProperty(proto, 'type', {
  value: 'integer'
})

// Returns number of digits as a regular javascript number
// Should probably give option to return as an Integer
Object.defineProperty(proto, 'digits', {
  get: function() {
    return this.value.length
  }
})

// Maps Integer to a float so it can be used regularly
Object.defineProperty(proto, 'toFloat', {
  value: function() {
    if (this.toString() === 'undefined') {
      return undefined
    } else {
      var float = Number(this.toString())
      return float
    }
  }
})

Object.defineProperty(proto, 'valueOf', {
  value: function() {
    return this.toFloat()
  }
})

Object.freeze(proto)

function Integer(n, sign) {
  var output = Object.create(proto)
  output.sign = sign || '+'
  if (n === undefined) {
    output.value = []
  } else {
    if (n < 0) {
      output.sign = '-'
      n = -1 * n
    }
    var nDigits = n.toString().split('')
    for (var i = 0; i < nDigits.length; ++i) {
      nDigits[i] = parseInt(nDigits[i])
    }

    output.value = nDigits
  }

  return output
}

module.exports = Integer
