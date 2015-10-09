'use strict'

require('babel/polyfill')

var integer = require('./lib/factory.js')
var add = require('./lib/add.js')
var is = require('./lib/compare.js')
// var div = require('./lib/divide.js')
var multiply = require('./lib/multiply.js')
// var power = require('./lib/power.js')

integer.add = add.add
integer.equal = is.equal
// integer.quotient = div.quotient
integer.greaterThan = is.greaterThan
integer.greaterThanEq = is.greaterThanEq
// integer.gte = is.gte
integer.lessThan = is.lessThan
integer.lessThanEq = is.lessThanEq
// integer.lte = is.lte
// integer.mod = div.mod
integer.multiply = multiply
integer.notEqual = is.notEqual
// integer.pow = power
integer.subtract = add.subtract

module.exports = integer
