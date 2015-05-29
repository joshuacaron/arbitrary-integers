function equal(a,b){
  // Quick tests for inequality to make calculation faster
  if(a.sign !== b.sign || a.digits()>b.digits() || b.digits()>a.digits()){
    return false
  }
  else {
    for (var i = 0; i < a.digits(); ++i){
      if (a.value[i] !== b.value[i]){
        return false
      }
    }
    return true
  }
}

function greaterThan(a,b){
  // Eliminates the easy cases first so that 
  if(equal(a,b)){
    return false
  }
  if (a.sign === '+' && b.sign === '-'){
    return true
  }
  if (a.sign === '-' && b.sign === '+'){
    return false
  }
  if(a.digits() > b.digits() && a.sign === '+'){
    return true
  }
  if (a.digits() < b.digits() && a.sign === '-'){
    return true
  }

  // Test remaining cases when signs and digits match
  if (a.digits() === b.digits()) {
    for (var i = 0; i < a.digits(); ++ i){
      if (a.value[i] < b.value[i]){
        return false
      }
      else if (a.value[i] > b.value[i]){
        return true
      }
    }

    return false
  }
  else {
    return false
  }
}


// Every pair of integers either <,>,=, <=, >= so we can use > and = to test for all of the rest

function lessThan(a,b){
  if (greaterThan(a,b) || equal(a,b)){
    return false
  }
  else {
    return true
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

function notEqual(a,b){
  return !equal(a,b)

}

module.exports =
{ lessThan: lessThan
, greaterThan: greaterThan
, equal: equal
, lte: lessThanEqual
, gte: greaterThanEqual
, lessThanEqual: lessThanEqual
, greaterThanEqual: greaterThanEqual
, notEqual: notEqual
}