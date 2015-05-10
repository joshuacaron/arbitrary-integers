var Integer = require('./integer.js');
var clone = require('clone');

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
    
    sum = require('./add.js')(sum,temp);
  }
  
  return sum;
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

module.exports =
{  trim: trim
, truncateN: truncateN
, sumArray: sumArray
, addNZeros: addNZeros
, fillZeros: fillZeros
, fillZerosNEnd: fillZerosNEnd
};