var Integer = require('./integer.js');


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


// // magGT -> Integer -> Integer -> Boolean
// // calculates whether the magnitude of an Integer is larger than another, ignoring signs
// function magGT (a,b){
//   if(equal(a,b)===true){
//     return false;
//   }
//   else if(a.digits()>b.digits()){
//     return true;
//   }
//   else if (a.digits() === b.digits()){
//     for (var i = 0; i < a.digits(); ++ i){
//       if (a.value[i] < b.value[i]){
//         return false;
//       }
//     }
//     return true;
//   }
//   else {
//     return false;
//   }
// }


// lessThan -> Integer -> Integer -> Boolean
function lessThan(a,b){
  if (greaterThan(a,b) || equal(a,b)){
    return false;
  }
  else {
    return true;
  }
}

module.exports =
{ lessThan: lessThan
, greaterThan: greaterThan
, equal: equal
}