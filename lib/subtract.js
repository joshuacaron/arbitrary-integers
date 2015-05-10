var Integer = require('./integer.js');
var clone = require('clone');
var is = require('./compare.js');
var helper = require('./helpers.js');
var add = require('./add.js');

// subtract -> Integer -> Integer -> Integer
// Subtracts two Integers
function subtract(a,b){
  var fst = clone(a);
  var snd = clone(b);
  var diff = [];
  var output = new Integer();
  
  if(is.equal(fst,snd)){
    output.value = [0];
  }
  else if(fst.sign === '+' && snd.sign === '-'){
    snd.sign = '+';
    return add(fst,snd);
  }
  else if(fst.sign === '-' && snd.sign === '+'){
    snd.sign = '-';
    return add(fst,snd);
  }
  else if (fst.sign === '-' && snd.sign === '-'){
    snd.sign = '+';
    first.sign = '+';
    return subtract(snd,fst);
  }
  else if(fst.sign === '+' && snd.sign === '+' && is.greaterThan(fst,snd)){
    var fstComplement = new Integer();
    // console.log(fstComplement);
    
    helper.fillZeros(fst,snd);
    
    for(var i = 0; i < fst.digits(); ++ i){
      fstComplement.value[i] = 9 - fst.value[i];
    }
    
    var interim = add(fstComplement,snd);
    
    for(var j = 0; j < interim.digits(); ++ j){
      if(diff!==[] || interim.value[j]!==9){
        diff[j] = 9 - interim.value[j];
      }
    }
   
   output.value = diff;
    
  }
  else {
    output = subtract(snd,fst);
    output.sign = '-';
  }
  
  return output;
}

module.exports = subtract;