var Integer = require('./integer.js');
var clone = require('clone');
var helper = require('./helpers.js');

// add -> Integer -> Integer -> Integer
// Sums 2 Integers.
function add(a,b){
  var fst = clone(a);
  var snd = clone(b);
  var sum = [];
  var output = new Integer();
  var round = false;
  
  if ((fst.sign === '+' && snd.sign === '+') || (fst.sign === '-' && snd.sign === '-')){
    output.sign = a.sign;
    helper.fillZeros(fst,snd);
    
    for (var i = snd.digits() -1; i >= 0; --i){
      var psum = fst.value[i] + snd.value[i];
      
      if(round === true){
        psum += 1;
        round = false;
      }
      
      
      if(psum < 10){
        sum.unshift(psum);
      }
      else {
        sum.unshift(psum - 10);
        if(i!==0){
          round = true;
        }
        else {
          sum.unshift(1);
        }
      }
    }
    
    output.value = sum;
    
  }
  else if (fst.sign === '+' && snd.sign === '-'){
    snd.sign = '+';
    output = require('./subtract.js')(fst,snd);
  }
  
  else if (fst.sign === '-' && snd.sign === '+'){
    fst.sign = '+';
    output = require('./subtract.js')(snd,fst);
  }

  return output;
}

module.exports = add;