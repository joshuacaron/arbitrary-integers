var Integer = require('./integer.js')
var clone = require('clone')
var is = require('./compare.js')
var helper = require('./helpers.js')

// Subtracts two Integers
function subtract(a,b){
  var fst = clone(a)
  var snd = clone(b)
  var diff = []
  var output = new Integer()
  
  // Directly return zero so don't waste time if large integers
  if(is.equal(fst,snd)){
    output.value = [0]
  }
  // Reframe as addition whenever possible
  else if(fst.sign === '+' && snd.sign === '-'){
    snd.sign = '+'
    return helper.addNat(fst,snd)
  }
  else if(fst.sign === '-' && snd.sign === '+'){
    snd.sign = '-'
    return helper.addNat(fst,snd)
  }
  // Make into simpler subtraction problems
  else if (fst.sign === '-' && snd.sign === '-'){
    snd.sign = '+'
    fst.sign = '+'
    return subtract(snd,fst)
  }
  else if(fst.sign === '+' && snd.sign === '+' && is.lessThan(fst,snd)){
    output = subtract(snd,fst)
    output.sign = '-'
  }



  // Use complements method to solve problem when it is straightforward case
  else{
    var fstComplement = new Integer()

    // Normalize lengths
    helper.fillZeros(fst,snd)

    // Calculate first complement
    for(var i = 0; i < fst.digits(); ++ i){
      fstComplement.value[i] = 9 - fst.value[i]
    }
    
    var interim = helper.addNat(fstComplement,snd)
    
    // Reverse complement process to get difference
    for(var j = 0; j < interim.digits(); ++ j){
      if(diff!==[] || interim.value[j]!==9){
        diff[j] = 9 - interim.value[j]
      }
    }
   
   output.value = diff
  }
  
  return output
}

module.exports = subtract