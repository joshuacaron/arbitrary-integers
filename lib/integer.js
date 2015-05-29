function Integer(n){
  this.sign = '+'
  if(n === undefined){
    this.value = []
  }
  else {
    if(n < 0){
      this.sign = '-'
      n = -1 * n
    }
    var n_digits = n.toString().split('')
    for(var i = 0; i < n_digits.length; ++ i){
      n_digits[i] = parseInt(n_digits[i])
    }
    
    this.value = n_digits
  }
}

// Formats to a string
Integer.prototype.toString = function toString(){
  if(this.sign === '-'){
    return "-" + this.value.join('')
  }
  else {
    return this.value.join('')
  }
}

// Returns number of digits as a regular javascript number
// Should probably give option to return as an Integer
Integer.prototype.digits = function digits(){
  return this.value.length
}

// Maps Integer to a float so it can be used regularly
Integer.prototype.toFloat = function toFloat(){
  if(this.toString() === ""){
    return undefined
  }
  else {
    var float = Number(this.toString())
    return float
  }
}

module.exports = Integer