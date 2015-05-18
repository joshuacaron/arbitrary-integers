var Integer = require('./integer.js')
var clone = require('clone')
var constant = require('./constants.js')
var helper = require('./helpers.js')
var is = require('./compare.js')
var subtract = require('./subtract.js')
var add = require('./add.js')
var multiply = require('./multiply.js')



// fractional -> Integer -> Integer -> Char -> Integer
// Divides a by b using long division and returns the fractional part (f) or the remainder (r). Should switch to Newton-Raphson for large numbers.
function divide(a, b, keep, remainder_sign){
  if(is.equal(a,constant.ZERO) === false && ((a.sign === '+' && b.sign === '-' ) || (a.sign === '-' && b.sign === '+'))){
    var new_a = clone(a)
    new_a.sign = '+'
    var new_b = clone(b)
    new_b.sign = '+'
    
    var output = divide(new_a,new_b,keep)
    output.sign = '-'
    return output
  }
  else if(is.equal(a,constant.ZERO) === false && a.sign === '-' && b.sign === '-'){
    new_a = clone(a)
    new_a.sign = '+'
    new_b = clone(b)
    new_b.sign = '+'
    
    return divide(new_a, new_b, keep, '-')
  }
  
  
  output = new Integer();
  var remainder = new Integer();
  
  if(is.greaterThan(b,a) && a.sign === '+' && b.sign === '+'){
    output = clone(constant.ZERO);
    remainder = clone(a);
  }
  else if (is.equal(a,b)){
    remainder = clone(constant.ZERO)
    output = clone(constant.ONE);
  }
  else if (is.equal(b,constant.ZERO)){
    return new Error("Cannot divide by zero.");
  }
  else if (is.equal(b,constant.ONE)){
    output = clone(a);
    remainder = clone(constant.ZERO);
  }
  else if (is.equal(a,constant.ZERO)){
    output = clone(constant.ZERO);
    remainder = clone(constant.ZERO);
  }
  else {
    var num = clone(a);
    var denom = clone(b);
    var len = denom.digits();
    
    while(is.greaterThan(num, denom)){
      var tempNum = helper.truncateN(num, len);
      var subCount = 0;
      var interim = new Integer(0);
      
      if(is.greaterThan(tempNum, denom) || is.equal(tempNum,denom)){

        while(is.greaterThan(tempNum, denom) || is.equal(tempNum,denom)){
          tempNum = subtract(tempNum, denom);
          helper.trim(tempNum);
          interim = add(interim,denom);
          ++subCount;
        }
        output.value.push(subCount);
        
        helper.fillZerosNEnd(num,interim,num.digits()-len);
        num = subtract(num,interim);
        helper.trim(num);

        len = denom.digits();
      }
      else {
        ++len;
      }
    }
    
    // Add trailing zeros;
    while(a.digits() - b.digits() > output.digits()){
      output.value.push(0);
    }

    
    // If remainder is empty it should be zero
    remainder = clone(num)
    if(remainder.toString() === ""){
      remainder.value = [0]
    }
    
  }

  if(remainder_sign === '-'){
    remainder.sign = '-'
  }

  return (keep === 'r' ? remainder : output)
}

function mod(a,b){
  return divide(a,b,'r');
}

function frac(a,b){
  return divide(a,b,'f');
}


module.exports =
{ mod: mod
, frac: frac
};