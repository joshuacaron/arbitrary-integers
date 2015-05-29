var assert = require("assert")
var int = require("../")

describe('Integer', function(){
  before(function(done){
    a = new int.Integer(123456)
    b = new int.Integer(666)
    c = new int.Integer()
    d = new int.Integer(444)
    e = new int.Integer(-333)
    f = new int.Integer(-7439)
    g = new int.Integer(0)
    h = new int.Integer(444)
    i = new int.Integer (-123456)
    done()
  })
  
  
  describe('.value', function(){
    it('should be equal to an array of the specified integers regardless of sign',function(done){
      assert.deepEqual([1,2,3,4,5,6], a.value)
      assert.deepEqual([1,2,3,4,5,6], i.value)
      assert.deepEqual([4,4,4], d.value)
      assert.deepEqual([7,4,3,9], f.value)
      assert.deepEqual([0], g.value)
      done()
    })
    
    it('should be an empty array if no integer is specified', function(done){
      assert.deepEqual([], c.value)
      done()
    })
  })
  
  describe('.sign', function(){
    it('should be positive for positive numbers', function(done){
      assert.equal('+',a.sign)
      assert.equal('+',d.sign)
      assert.equal('+',b.sign)
      done()
    })
    
    it('should be positive for zero', function(done){
      assert.equal('+', g.sign)
      done()
    })
    
    it('should be positive for undefined numbers', function(done){
      assert.equal('+', c.sign)
      done()
    })
  })
  
  describe('.digits()', function(){
    it('should be equal to the number of digits for all integers', function(done){
      assert.equal(6, a.digits())
      assert.equal(3, b.digits())
      assert.equal(3, e.digits())
      assert.equal(4, f.digits())
      assert.equal(1, g.digits())
      done()
    })
    
    it('should be zero for undefined integers', function(done){
      assert.equal(0, c.digits())
      done()
    })
  })
  
  
  describe('.toString()', function(){
    it('should return the visual reprsentation of the function', function(done){
      assert.equal("123456", a.toString())
      assert.equal("666", b.toString())
      assert.equal("0", g.toString())
      done()
    })
    
    it('should have a negative sign in front for negative numbers', function(done){
      assert.equal("-333",e.toString())
      assert.equal("-7439",f.toString())
      done()
    })
    
    it('should return an empty string if there is no value', function(done){
      assert.equal('',c.toString())
      done()
    })
  })
  
  describe('.toFloat()', function(){
    it('should return the integer formatted as a regular JavaScript number', function(done){
      assert.equal(123456, a.toFloat())
      assert.equal(666, b.toFloat())
      assert.equal(0, g.toFloat())
      done()
    })
    
    it('should map negative integers to negative numbers', function(done){
      assert.equal(-333, e.toFloat())
      assert.equal(-7439, f.toFloat())
      assert.equal(-123456, i.toFloat())
      done()
    })

    it('should be undefined if the integer has no value', function(done){
      assert.equal(undefined, c.toFloat())
      done()
    })
  })
})



describe('Methods for Integers', function(){
  before(function(done){
    a = new int.Integer(123456)
    b = new int.Integer(666)
    c = new int.Integer()
    d = new int.Integer(444)
    e = new int.Integer(-333)
    f = new int.Integer(-7439)
    g = new int.Integer(0)
    h = new int.Integer(444)
    i = new int.Integer (-123456)
    j = new int.Integer(1)
    k = new int.Integer(333)
    l = new int.Integer(-1)
    m = new int.Integer(222)
    n = new int.Integer(111)
    o = new int.Integer(0)
    o.sign = '-'
    p = new int.Integer(4)
    q = new int.Integer(7)
    done()
  })
  
  describe('equal(a,b)', function(){
    it('should be true if the number is repeated', function(done){
      assert.equal(true, int.equal(a,a))
      assert.equal(true, int.equal(f,f))
      assert.equal(true, int.equal(c,c))
      done()
    })
    
    it('should be true for 2 different numbers with the same value and sign', function(done){
      assert.equal(true, int.equal(d,h))
      done()
    })
    
    it('should be false for 2 numbers with the same value but different signs', function(done){
      assert.equal(false, int.equal(i,a))
      done()
    })
    
    it('should be symmetric', function(done){
      assert.equal(int.equal(i,a), int.equal(a,i))
      assert.equal(int.equal(d,h), int.equal(h,d))
      assert.equal(int.equal(c,f), int.equal(f,c))
      done()
    })
    
    it('should return false for numbers with different values', function(done){
      assert.equal(false, int.equal(f,g))
      assert.equal(false, int.equal(h,i))
      assert.equal(false, int.equal(a,b))
      done()
    })
    
    it('should return false if one of the numbers is undefined', function(done){
      assert.equal(false, int.equal(a,c))
      assert.equal(false, int.equal(f,c))
      done()
    })
    
    it('should return true if both numbers are undefined', function(done){
      assert.equal(true, int.equal(c,c))
      done()
    })
  })
  
  describe('greaterThan(a,b)', function(){
    it('should return true if a > b and both numbers are positive', function(done){
      assert.equal(true, int.greaterThan(a,b))
      assert.equal(true, int.greaterThan(a,g))
      assert.equal(true, int.greaterThan(b,d))
      done()
    })
    
    it('should return true if a > 0 and b < 0', function(done){
      assert.equal(true, int.greaterThan(a,i))
      assert.equal(true, int.greaterThan(b,i))
      assert.equal(true, int.greaterThan(d,e))
      done()
    })
    
    it('should return true if a > b and both numbers are negative',function(done){
      assert.equal(true, int.greaterThan(e, i))
      assert.equal(true, int.greaterThan(f, i))
      assert.equal(true, int.greaterThan(e, f))
      done()
    })
    
    it('should be transitive', function(done){
      assert.equal(true, int.greaterThan(g, i))
      assert.equal(true, int.greaterThan(b, g))
      assert.equal(true, int.greaterThan(a, b))
      done()
    })
    
    it('should return false if a < b and both numbers are positive', function(done){
      assert.equal(false, int.greaterThan(b, a))
      assert.equal(false, int.greaterThan(h, a))
      assert.equal(false, int.greaterThan(g, b))
      done()
    })
    
    it('should return false if magnitude of a > b and both numbers are negative', function(done){
      assert.equal(false, int.greaterThan(i,e))
      assert.equal(false, int.greaterThan(i,f))
      assert.equal(false, int.greaterThan(f,e))
      done()
    })
    
    it('should return false if a < 0 and b > 0', function(done){
      assert.equal(false, int.greaterThan(i, b))
      assert.equal(false, int.greaterThan(e, a))
      assert.equal(false, int.greaterThan(f, d))
      done()
    })
    
    it('should fail if either a or b or both are not defined (cannot be ordered)', function(done){
      // Implement some sort of test here
      done()
    }) 
  })
  
  describe('add(a,b)',function(){
    
    it('should add 2 positive numbers of the same length properly', function(done){
      assert.equal(888, int.add(d,h).toFloat())
      assert.equal(1110, int.add(b,d).toFloat())
      done()
    })
    
    it('should return the same value when added to 0',function(done){
      assert.equal(666, int.add(b,g).toFloat())
      assert.equal(123456, int.add(g,a).toFloat())
      done()
    })
    
    it('should be symmetric', function(done){
      assert.equal(int.add(d,h).toFloat(), int.add(h,d).toFloat())
      assert.equal(int.add(b,g).toFloat(), int.add(g,b).toFloat())
      assert.equal(int.add(a,b).toFloat(), int.add(b,a).toFloat())
      done()
    })
    
    it('should add 2 positive numbers of different lengths properly', function(done){
      assert.equal(123900, int.add(a,d).toFloat())
      assert.equal(124122, int.add(b,a).toFloat())
      done()
    })
    
    it('should add 2 negative numbers properly', function(done){
      assert.equal(-7772, int.add(e,f))
      assert.equal(-123789, int.add(i, e))
      assert.equal(-130895, int.add(f, i))
      done()
    })
    
    it('should subtract a positive and a negative number', function(done){
      assert.equal(111, int.add(d,e).toFloat())
      assert.equal(-6995, int.add(f,d).toFloat())
      done()
    })
    
    it('should return 0 when adding a number to its additive inverse', function(done){
      assert.equal(0, int.add(a,i).toFloat())
      done()
    })
  })
  
  describe('subtract(a,b)',function(){
    it('should return the correct result if a > b > 0', function(done){
      assert.equal(122790, int.subtract(a,b).toFloat())
      assert.equal(123012, int.subtract(a,d).toFloat())
      assert.equal(222, int.subtract(b,d).toFloat())
      done()
    })
    
    it('should return -result if the order of a and b are switched', function(done){
      assert.equal(-122790, int.subtract(b,a).toFloat())
      assert.equal(-123012, int.subtract(d,a).toFloat())
      assert.equal(-222, int.subtract(d,b).toFloat())
      done()
    })
    
    it('should return the same number when subtracting zero', function(done){
      assert.equal(666, int.subtract(b,g).toFloat())
      assert.equal(-123456, int.subtract(i, g).toFloat())
      assert.equal(-333, int.subtract(e, g).toFloat())
      done()
    })
    
    it('should return the sum of the numbers when a > 0 and b < 0', function(done){
      assert.equal(int.add(b,a).toFloat(),int.subtract(b,i).toFloat())
      assert.equal(int.add(d,a).toFloat(),int.subtract(d,i).toFloat())
      done()
    })
    
    it('should return 0 when subtracting a number from itself', function(done){
      assert.equal(0, int.subtract(a,a).toFloat())
      assert.equal(0, int.subtract(d,d).toFloat())
      assert.equal(0, int.subtract(g,g).toFloat())
      assert.equal(0, int.subtract(e,e).toFloat())
      done()
    })
  })
  
  describe('multiply(a,b)', function(){
    it('should return 0 if either number is zero', function(done){
      assert.deepEqual(g, int.multiply(a,g))
      assert.deepEqual(g, int.multiply(g,e))
      assert.deepEqual(g, int.multiply(g,g))
      done()
    })
    
    it('should return the other input, if one of the inputs is one, and the other is non-zero', function(done){
      assert.deepEqual(a, int.multiply(a,j))
      assert.deepEqual(e, int.multiply(e,j))
      assert.deepEqual(j, int.multiply(j,j))
      assert.deepEqual(i, int.multiply(j,i))
      done()
    })
    
    it('should return a positive product if both inputs are positive', function(done){
      assert.equal(295704, int.multiply(b,d).toFloat())
      assert.equal(54814464, int.multiply(a,d).toFloat())
      assert.equal(123456, int.multiply(j,a).toFloat())
      done()
    })
    
    it('should return a positive product if both inputs are negative', function(done){
      assert.equal(2477187, int.multiply(e,f).toFloat())
      assert.equal(41110848, int.multiply(i,e).toFloat())
      assert.equal(918389184, int.multiply(f,i).toFloat())
      done()
    })
    
    it('should return a negative product if only one input is negative', function(done){
      assert.equal(-221778, int.multiply(b,e).toFloat())
      assert.equal(-3302916, int.multiply(f,d).toFloat())
      assert.equal(-15241383936, int.multiply(a,i).toFloat())
      done()
    })
    
    it('should be symmetric', function(done){
      assert.deepEqual(int.multiply(a,f), int.multiply(f,a))
      assert.deepEqual(int.multiply(b,e), int.multiply(e,b))
      assert.deepEqual(int.multiply(i,g), int.multiply(g,i))
      assert.deepEqual(int.multiply(d,h), int.multiply(h,d))
      assert.deepEqual(int.multiply(a,a), int.multiply(a,a))
      done()
    })
    
    it('should return -num if the other number is -1', function(done){
      assert.deepEqual(i, int.multiply(a,l))
      assert.deepEqual(e, int.multiply(l,k))
      done()
    })
  })
  
  describe('quotient(a,b)', function(){
    
    it('should return the same number if dividing by one', function(done){
      assert.deepEqual(a, int.quotient(a,j))
      assert.deepEqual(f, int.quotient(f,j))
      assert.deepEqual(g, int.quotient(g,j))
      assert.deepEqual(b, int.quotient(b,j))
      done()
    })
    
    
    it('should return 0 when 0 is the numerator', function(done){
      assert.deepEqual(g, int.quotient(g, a))
      assert.deepEqual(g, int.quotient(g, f))
      assert.deepEqual(g, int.quotient(g, e))
      assert.deepEqual(g, int.quotient(g, j))
      done()
    })
    
    it('should return 0 when a,b > 0 && b > a', function(done){
      assert.deepEqual(g, int.quotient(b,a))
      assert.deepEqual(g, int.quotient(j,d))
      assert.deepEqual(g, int.quotient(d,b))
      done()
    })
    
    it('should divide two positive numbers correctly', function(done){
      assert.equal(1, int.quotient(b,d).toFloat())
      assert.equal(278, int.quotient(a,h).toFloat())
      assert.equal(185, int.quotient(a,b).toFloat())
      assert.equal(370, int.quotient(a,k).toFloat())
      done()
    })
    
    it('should return a negative number when dividing a negative number by a positive number', function(done){
      assert.equal(-370, int.quotient(a,e).toFloat())
      assert.equal(-2, int.quotient(b,e).toFloat())
      assert.equal(-1, int.quotient(a,i).toFloat())
      assert.equal(-16, int.quotient(a,f).toFloat())
      done()
    })
    
    it('should return 1 if dividing a number by itself', function(done){
      assert.deepEqual(j, int.quotient(a,a))
      assert.deepEqual(j, int.quotient(e,e))
      assert.deepEqual(j, int.quotient(i,i))
      assert.deepEqual(j, int.quotient(j,j))
      assert.deepEqual(j, int.quotient(l,l))
      done()
    })
    
    it('should return a positive number if dividing two negative numbers', function(done){
      assert.equal(22, int.quotient(f,e).toFloat())
      assert.equal(16, int.quotient(i,f).toFloat())
      assert.equal(370, int.quotient(i,e).toFloat())
      done()
    })
  })

  describe('mod(a,b)', function(){

    it('should return 0 if a is a multiple of b', function(done){
      assert.deepEqual(g, int.mod(h,n))
      assert.deepEqual(g, int.mod(k,n))
      assert.deepEqual(g, int.mod(m,n))
      assert.deepEqual(g, int.mod(b,k))
      assert.deepEqual(g, int.mod(h,m))
      done()
    })

    it('should return the correct value of a,b > 0, a > b', function(done){
      assert.deepEqual(n, int.mod(h,k))
      assert.deepEqual(m, int.mod(b,d))
      assert.equal(246, int.mod(a,b).toFloat())
      done()
    })

    it('should return 0 if b=1', function(done){
      assert.deepEqual(g, int.mod(a,j))
      assert.deepEqual(g, int.mod(k,j))
      assert.deepEqual(g, int.mod(b,j))
      assert.deepEqual(g, int.mod(n,j))
      done()
    })

    it('should return 0 if a === b and a > 0', function(done){
      assert.deepEqual(g, int.mod(a,a))
      assert.deepEqual(g, int.mod(h,h))
      done()
    })

    it('should return -0 if a===b and a < 0', function(done){
      assert.deepEqual(o, int.mod(e,e))
      assert.deepEqual(o, int.mod(i,i))
      done()
    })

    it('should return a if a < b and b > 0', function(done){
      assert.deepEqual(b, int.mod(b,a))
      assert.deepEqual(d, int.mod(d,a))
      assert.deepEqual(k, int.mod(k,a))
      assert.deepEqual(k, int.mod(k,b))
      assert.deepEqual(d, int.mod(d,b))
      assert.deepEqual(e, int.mod(e,a))
      assert.deepEqual(e, int.mod(e,b))
      done()
    })

    it('should return the correct value if a < b < 0', function(done){
      assert.equal(-246, int.mod(i,e).toFloat())
      assert.equal(-4432, int.mod(i,f).toFloat())
      assert.equal(-113, int.mod(f,e).toFloat())
      done()
    })

    it('should return a if b < a < 0', function(done){
      assert.deepEqual(e, int.mod(e,i))
      assert.deepEqual(e, int.mod(e,f))
      assert.deepEqual(f, int.mod(f,i))
      done()
    })
  })

  describe('pow(a,b)', function(){
    it('should return a if b===1', function(done){
      assert.deepEqual(a, int.pow(a,j))
      assert.deepEqual(b, int.pow(b,j))
      assert.deepEqual(g, int.pow(g,j))
      assert.deepEqual(j, int.pow(j,j))
      assert.deepEqual(i, int.pow(i,j))
      assert.deepEqual(f, int.pow(f,j))
      done()
    })

    it('should return 1 if b=== +-0', function(done){
      assert.deepEqual(j, int.pow(n,g))
      assert.deepEqual(j, int.pow(f,g))
      assert.deepEqual(j, int.pow(h,g))
      assert.deepEqual(j, int.pow(a,g))
      assert.deepEqual(j, int.pow(n,o))
      assert.deepEqual(j, int.pow(f,o))
      assert.deepEqual(j, int.pow(h,o))
      assert.deepEqual(j, int.pow(a,o))
      done()
    })

    it('should return the correct value if a,b>0', function(done){
      assert.equal(2401, int.pow(q,p).toFloat())
      assert.equal(16384, int.pow(p,q).toFloat())
      assert.equal(151807041, int.pow(n,p).toFloat())
      assert.equal("437104634676747795452235896466702336",int.pow(a,q).toString())
      done()
    })

    it('should return correct n>0 if a<0 and b%2 === 0', function(done){
      assert.equal(12296370321, int.pow(e,p).toFloat())
      assert.equal(3062374041915841, int.pow(f,p).toFloat())
      done()
    })

    it('should return correct n<0 if a<0 and b%2 === 0', function(done){
      assert.equal("-454056225438947877", int.pow(e,q).toString())
      assert.equal("-1260671430649276124479866479", int.pow(f,q).toString())
      done()
    })

    it('should throw an error if b<-0', function(done){
      assert.throws(function(){
        int.pow(d,e)
      },Error)
      done()
    })
  })


})