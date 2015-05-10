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

module.exports = Integer;