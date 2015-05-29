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
    if(a.digits() > b.digits() && a.sign === '+'){
      return true;
    }
    else if (a.digits() < b.digits() && a.sign === '-'){
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


// lessThan -> Integer -> Integer -> Boolean
function lessThan(a,b){
  if (greaterThan(a,b) || equal(a,b)){
    return false;
  }
  else {
    return true;
  }
}

function lessThanEqual(a,b){
  if(equal(a,b)){
    return true
  }
  else if(lessThan(a,b)){
    return true
  }
  else {
    return false
  }
}

function greaterThanEqual(a,b){
  if(equal(a,b)){
    return true
  }
  else if (greaterThan(a,b)){
    return true
  }
  else {
    return false
  }
}

module.exports =
{ lessThan: lessThan
, greaterThan: greaterThan
, equal: equal
, lte: lessThanEqual
, gte: greaterThanEqual
, lessThanEqual: lessThanEqual
, greaterThanEqual: greaterThanEqual
}