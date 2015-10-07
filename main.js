var Integer = require('./lib/integer.js')
var add = require('./lib/add.js')
var subtract = require('./lib/subtract.js')
var is = require('./lib/compare.js')
var div = require('./lib/divide.js')
var multiply = require('./lib/multiply.js')
var power = require('./lib/power.js')

Integer.add = add
Integer.equal = is.equal
Integer.quotient = div.quotient
Integer.greaterThan = is.greaterThan
Integer.greaterThanEqual = is.gte
Integer.gte = is.gte
Integer.lessThan = is.lessThan
Integer.lessThanEqual = is.lte
Integer.lte = is.lte
Integer.mod = div.mod
Integer.multiply = multiply
Integer.notEqual = is.notEqual
Integer.pow = power
Integer.subtract = subtract

module.exports = Integer
