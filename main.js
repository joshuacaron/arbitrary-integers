var clone = require('clone');

var ZERO = new Integer(0);
var ONE = new Integer(1);


function Integer(n){
  this.sign = '+';
  if(n === undefined){
    this.value = [];
  }
  else {
    if(n<0){
      this.sign = '-';
      n = -1*n;
    }
    var n_digits = n.toString().split('');
    for(var i = 0; i < n_digits.length; ++ i){
      n_digits[i] = parseInt(n_digits[i]);
    }
    
    this.value = n_digits;
  }
}

// .toString() -> string
// Formats to a string
Integer.prototype.toString = function toString(){
  if(this.sign === '-'){
    return "-" + this.value.join('');
  }
  else {
    return this.value.join('');
  }
};

// .digits() -> Float
// Returns number of digits as a regular javascript number
// Should probably give option to return as an Integer
Integer.prototype.digits = function digits(){
  return this.value.length;
};

// .toFloat() -> Float
// Maps Integer to a float so it can be used regularly
Integer.prototype.toFloat = function toFloat(){
  // Need to add function to throw error if integer undefined, but can't unit test it right now
  var float = Number(this.toString());
  return float;
};


// fillZeros -> Integer -> Integer -> Integer
// Adds leading 0s to shorter integer to normalize length
function fillZeros(a, b){
  if(a instanceof Integer && b instanceof Integer){
    var numZeros = a.digits() - b.digits();
    if (numZeros === 0){
      return;
    }
    else if (numZeros > 0){
      for (var i = 0; i < numZeros; ++i){
        b.value.unshift(0);
      }
    }
    else if (numZeros < 0){
      for (var j = 0; j < -1*numZeros; ++j){
        a.value.unshift(0);
      }
    }
  }
  else {
    console.error(new Error("Both inputs must be Integers."));
  }
}

function fillZerosNEnd(a, b,n){
  if(a instanceof Integer && b instanceof Integer){
    var numZeros = n;
    if (numZeros === 0){
      return;
    }
    else if (numZeros > 0){
      for (var i = 0; i < numZeros; ++i){
        b.value.push(0);
      }
    }
    else if (numZeros < 0){
      for (var j = 0; j < -1*numZeros; ++j){
        a.value.push(0);
      }
    }
  }
  else {
    console.error(new Error("Both inputs must be Integers."));
  }
}


// equal -> Integer -> Integer -> Boolean
// Tests equality for Integers
function equal(a,b){
  if(a.sign !== b.sign || a.digits()>b.digits() || b.digits()>a.digits()){
    return false;
  }
  else {
    for (var i = 0; i < a.digits(); ++i){
      if (a.value[i] !== b.value[i]){
        return false;
      }
    }
    return true;
  }
}

// greaterThan -> Integer -> Integer -> Boolean
// Tests for inequalities
function greaterThan(a,b){
  if(equal(a,b)){
    return false;
  }
  if (a.sign === '+' && b.sign === '-'){
    return true;
  }
  else if (a.sign === b.sign){
    if(a.digits() > b.digits() && a.sign == '+'){
      return true;
    }
    else if (a.digits() < b.digits() && a.sign == '-'){
      return true;
    }
    else if (a.digits() === b.digits()) {
      for (var i = 0; i < a.digits(); ++ i){
        if (a.value[i] < b.value[i]){
          return false;
        }
        else if (a.value[i] > b.value[i]){
          return true;
        }
      }
      return false;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
}


// magGT -> Integer -> Integer -> Boolean
// calculates whether the magnitude of an Integer is larger than another, ignoring signs
function magGT (a,b){
  if(equal(a,b)===true){
    return false;
  }
  else if(a.digits()>b.digits()){
    return true;
  }
  else if (a.digits() === b.digits()){
    for (var i = 0; i < a.digits(); ++ i){
      if (a.value[i] < b.value[i]){
        return false;
      }
    }
    return true;
  }
  else {
    return false;
  }
}


// lessThan -> Integer -> Integer -> Boolean
function lessThan(a,b){
  if (greaterThan(a,b) || equal(a,b)){
    return false;
  }
  else {
    return true;
  }
}




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
    fillZeros(fst,snd);
    
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
    output = subtract(fst,snd);
  }
  
  else if (fst.sign === '-' && snd.sign === '+'){
    fst.sign = '+';
    output = subtract(snd,fst);
  }

  return output;
}


// subtract -> Integer -> Integer -> Integer
// Subtracts two Integers
function subtract(a,b){
  var fst = clone(a);
  var snd = clone(b);
  var diff = [];
  var output = new Integer();
  
  if(equal(fst,snd)){
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
  else if(fst.sign === '+' && snd.sign === '+' && greaterThan(fst,snd)){
    var fstComplement = new Integer();
    // console.log(fstComplement);
    
    fillZeros(fst,snd);
    
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


function addNZeros(n){
  output = [];
  for (var i = 0; i < n; ++i){
    output.push(0);
  }
  return output;
}


function sumArray(list){
  var sum = new Integer();
  sum.value = list[0];
  
  for(var i = 1; i < list.length; ++ i){
    var temp = new Integer();
    temp.value = list[i];
    
    sum = add(sum,temp);
  }
  
  return sum;
}

function multiply(a, b){
  if (equal(a,ZERO) || equal(b,ZERO)) {
    return ZERO;
  }
  else if (equal(a,ONE)) {
    return b;
  }
  else if (equal(b,ONE)) {
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
      var output = addNZeros(snd.digits() - 1 - i);
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
    var sum = sumArray(intermediates);
    product.value = sum.value;
    return product;
  }
  
}

// truncateN -> Integer -> int -> Integer
// Truncates an integer to n digits
function truncateN(int, n){
  var output = clone(int);
  if(n < output.digits()){
    // console.log("hi");
    var newVal = [];
    for (var i = 0; i < n; ++i){
      newVal.push(output.value[i]);
    }
    output.value = newVal;
  }
  return output;
}
// trim -> Integer -> Integer
// gets rid of leading zeros
function trim(n){
  var val = [];
  for (var i = 0; i < n.digits(); ++ i){
    if(n.value[i] !== 0 || val.length !== 0){
      val.push(n.value[i]);
    }
  }
  if(val === []){
    val = [0];
  }
  n.value = val;
}

// fractional -> Integer -> Integer -> Char -> Integer
// Divides a by b using long division and returns the fractional part (f) or the remainder (r). Should switch to Newton-Raphson for large numbers.
function divide(a,b,keep){
  var output = new Integer();
  var remainder = new Integer();
  
  if(greaterThan(b,a) && a.sign === '+' && b.sign === '+'){
    output = clone(ZERO);
    remainder = clone(a);
  }
  else if (equal(b,ZERO)){
    return new Error("Cannot divide by zero.");
  }
  else if (equal(b,ONE)){
    output = clone(a);
    remainder = clone(ZERO);
  }
  else if (equal(a,ZERO)){
    output = clone(ZERO);
    remainder = clone(ZERO);
  }
  else {
    var num = clone(a);
    var denom = clone(b);
    var len = denom.digits();
    
    while(greaterThan(num, denom)){
      console.log(num);
      console.log(denom);
      var tempNum = truncateN(num, len);
      var subCount = 0;
      var interim = new Integer(0);
      
      if(greaterThan(tempNum, denom) || equal(tempNum,denom)){

        while(greaterThan(tempNum, denom) || equal(tempNum,denom)){
          tempNum = subtract(tempNum, denom);
          trim(tempNum);
          interim = add(interim,denom);
          ++subCount;
          console.log(subCount);
        }
        output.value.push(subCount);
        console.log("output + : " + subCount);
        console.log(num);
        console.log(interim);
        console.log(num.digits() - len);
        
        fillZerosNEnd(num,interim,num.digits()-len);
        console.log(num);
        console.log(interim);
        num = subtract(num,interim);
        console.log(num);
        trim(num);
        
        len = denom.digits();
      }
      else {
        ++len;
      }
    }
    
    remainder = clone(num);
    if(remainder.value === []){
      remainder.value = [0];
    }
  }
  
  if(keep === 'r'){
    return remainder;
  }
  else {
    return output;
  }
}

function mod(a,b){
  return divide(a,b,'r');
}

function frac(a,b){
  return divide(a,b,'f');
}



module.exports = {
    Integer:      Integer
  , equal:        equal
  , greaterThan:  greaterThan
  , lessThan:     lessThan
  , add:          add
  , subtract:     subtract
  , multiply:     multiply
  , frac:         frac
  , mod:          mod
};