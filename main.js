var Integer = require('./lib/integer.js')
var add = require('./lib/add.js')
var subtract = require('./lib/subtract.js')
var is = require('./lib/compare.js')
var div = require('./lib/divide.js')
var multiply = require('./lib/multiply.js')
var power = require('./lib/power.js')

module.exports = {
    Integer:  Integer
  , add:  add
  , equal:  is.equal
  , quotient:  div.quotient
  , greaterThan:  is.greaterThan
  , greaterThanEqual:  is.gte
  , gte:  is.gte
  , lessThan:  is.lessThan
  , lessThanEqual: is.lte
  , lte: is.lte
  , mod:  div.mod
  , multiply:  multiply
  , notEqual: is.notEqual
  , pow:  power
  , subtract:  subtract
}