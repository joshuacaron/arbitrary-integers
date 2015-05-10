var Integer = require('./integer.js');
var clone = require('clone');
var is = require('./compare.js');
var constant = require('./constants.js');
var helper = require('./helpers.js');

function multiply(a, b){
  if (is.equal(a,constant.ZERO) || is.equal(b,constant.ZERO)) {
    return constant.ZERO;
  }
  else if (is.equal(a,constant.ONE)) {
    return b;
  }
  else if (is.equal(b,constant.ONE)) {
    return a;
  }
  else {
    var intermediates = [];
    var product = new Integer();
    
    if((a.sign === '+' && b.sign === '+') || (a.sign === '-' && b.sign === '-')){
      product.sign = '+';
    }
    else {
      product.sign = '-';
    }
    
    // The less digits, the less addition we need to carry out afterwards, so want snd to have fewest digits.
    if(a.digits() < b.digits()){
      fst = clone(b);
      snd = clone(a);
    }
    else {
      fst = clone(a);
      snd = clone(b);
    }
    
    
    for (var i = snd.digits() - 1; i >= 0; --i) {
      var output = helper.addNZeros(snd.digits() - 1 - i);
      var carry = 0;
      
      for (var j = fst.digits() - 1; j >= 0; --j) {
        var temp = (fst.value[j] * snd.value[i]);
        temp += carry;
        carry = 0;
        
        while(temp >= 10){
          temp = temp - 10;
          ++carry;
        }

        output.unshift(temp);
        
        if(j === 0 && carry > 0){
          output.unshift(carry);
          carry = 0;
        }
        
      }
      
      intermediates.push(output);
      
    }
    var sum = helper.sumArray(intermediates);
    product.value = sum.value;
    return product;
  }
  
}

module.exports = multiply;