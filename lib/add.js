var Integer = require('./integer.js')
var helper = require('./helpers.js')
var clone = require('clone')
var subtract = require('./subtract.js')

function add(a,b){
  var fst = clone(a)
  var snd = clone(b)
  var output = new Integer()
  
  if ((fst.sign === '+' && snd.sign === '+') || (fst.sign === '-' && snd.sign === '-')){
    output = helper.addNat(fst,snd)
    output.sign = fst.sign
  }
  else if (fst.sign === '+' && snd.sign === '-'){
    snd.sign = '+'
    output = subtract(fst,snd)
  }
  
  else if (fst.sign === '-' && snd.sign === '+'){
    fst.sign = '+'
    output = subtract(snd,fst)
  }

  return output
}

module.exports = add