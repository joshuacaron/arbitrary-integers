var Integer = require('./integer.js')

var ZERO = new Integer(0)
var ONE = new Integer(1)
var NEG_ONE = new Integer(-1)
var NEG_ZERO = new Integer(0)
NEG_ZERO.sign = "-"

module.exports =
{ ZERO: ZERO
, ONE: ONE
, NEG_ONE: NEG_ONE
, NEG_ZERO: NEG_ZERO
};