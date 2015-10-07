var assert = require('assert')
var integer = require('../')

describe('Integer', function() {
  before(function(done) {
    a = integer(123456)
    b = integer(666)
    c = integer()
    d = integer(444)
    e = integer(-333)
    f = integer(-7439)
    g = integer(0)
    h = integer(444)
    i = integer (-123456)
    done()
  })

  describe('.value', function() {
    it('should be equal to an array of the specified integers regardless of sign',function(done) {
      assert.deepEqual([1,2,3,4,5,6], a.value)
      assert.deepEqual([1,2,3,4,5,6], i.value)
      assert.deepEqual([4,4,4], d.value)
      assert.deepEqual([7,4,3,9], f.value)
      assert.deepEqual([0], g.value)
      done()
    })

    it('should be an empty array if no integer is specified', function(done) {
      assert.deepEqual([], c.value)
      done()
    })
  })

  describe('.sign', function() {
    it('should be positive for positive numbers', function(done) {
      assert.equal('+',a.sign)
      assert.equal('+',d.sign)
      assert.equal('+',b.sign)
      done()
    })

    it('should be positive for zero', function(done) {
      assert.equal('+', g.sign)
      done()
    })

    it('should be positive for undefined numbers', function(done) {
      assert.equal('+', c.sign)
      done()
    })
  })

  describe('.digits', function() {
    it('should be equal to the number of digits for all integers', function(done) {
      assert.equal(6, a.digits)
      assert.equal(3, b.digits)
      assert.equal(3, e.digits)
      assert.equal(4, f.digits)
      assert.equal(1, g.digits)
      done()
    })

    it('should be zero for undefined integers', function(done) {
      assert.equal(0, c.digits)
      done()
    })
  })

  describe('.toString()', function() {
    it('should return the visual representation of the function', function(done) {
      assert.equal('123456', a.toString())
      assert.equal('666', b.toString())
      assert.equal('0', g.toString())
      done()
    })

    it('should have a negative sign in front for negative numbers', function(done) {
      assert.equal('-333', e.toString())
      assert.equal('-7439', f.toString())
      done()
    })

    it('should return undefined if there is no value', function(done) {
      assert.equal('undefined', c.toString())
      done()
    })

    it('should automatically evaluate as a string if used in the context of a string', function() {
      assert.equal('123456', '' + a)
      assert.equal('0', g + '')
      assert.equal(a.toString(), a + '')
      assert.equal('undefined', '' + c)
    })
  })

  describe('.toFloat()', function() {
    it('should return the integer formatted as a regular JavaScript number', function(done) {
      assert.equal(123456, a.toFloat())
      assert.equal(666, b.toFloat())
      assert.equal(0, g.toFloat())
      done()
    })

    it('should map negative integers to negative numbers', function(done) {
      assert.equal(-333, e.toFloat())
      assert.equal(-7439, f.toFloat())
      assert.equal(-123456, i.toFloat())
      done()
    })

    it('should be undefined if the integer has no value', function(done) {
      assert.equal(undefined, c.toFloat())
      done()
    })

    it('should convert numbers to floats automatically when used in the context of a number', function() {
      assert.equal(1 + b, 667)
    })
  })
})

describe('Methods for Integers', function() {
  before(function(done) {
    a = integer(123456)
    b = integer(666)
    c = integer()
    d = integer(444)
    e = integer(-333)
    f = integer(-7439)
    g = integer(0)
    h = integer(444)
    i = integer (-123456)
    j = integer(1)
    k = integer(333)
    l = integer(-1)
    m = integer(222)
    n = integer(111)
    o = integer(0, '-')
    p = integer(4)
    q = integer(7)
    done()
  })

  describe('equal(a,b)', function() {
    it('should be true if the number is repeated', function(done) {
      assert.equal(true, integer.equal(a,a))
      assert.equal(true, integer.equal(f,f))
      assert.equal(true, integer.equal(c,c))
      done()
    })

    it('should be true for 2 different numbers with the same value and sign', function(done) {
      assert.equal(true, integer.equal(d,h))
      done()
    })

    it('should be false for 2 numbers with the same value but different signs', function(done) {
      assert.equal(false, integer.equal(i,a))
      done()
    })

    it('should be symmetric', function(done) {
      assert.equal(integer.equal(i,a), integer.equal(a,i))
      assert.equal(integer.equal(d,h), integer.equal(h,d))
      assert.equal(integer.equal(c,f), integer.equal(f,c))
      done()
    })

    it('should return false for numbers with different values', function(done) {
      assert.equal(false, integer.equal(f,g))
      assert.equal(false, integer.equal(h,i))
      assert.equal(false, integer.equal(a,b))
      done()
    })

    it('should return false if one of the numbers is undefined', function(done) {
      assert.equal(false, integer.equal(a,c))
      assert.equal(false, integer.equal(f,c))
      done()
    })

    it('should return true if both numbers are undefined', function(done) {
      assert.equal(true, integer.equal(c,c))
      done()
    })
  })

  describe('greaterThan(a,b)', function() {
    it('should return true if a > b and both numbers are positive', function(done) {
      assert.equal(true, integer.greaterThan(a,b))
      assert.equal(true, integer.greaterThan(a,g))
      assert.equal(true, integer.greaterThan(b,d))
      done()
    })

    it('should return true if a > 0 and b < 0', function(done) {
      assert.equal(true, integer.greaterThan(a,i))
      assert.equal(true, integer.greaterThan(b,i))
      assert.equal(true, integer.greaterThan(d,e))
      done()
    })

    it('should return true if a > b and both numbers are negative',function(done) {
      assert.equal(true, integer.greaterThan(e, i))
      assert.equal(true, integer.greaterThan(f, i))
      assert.equal(true, integer.greaterThan(e, f))
      done()
    })

    it('should be transitive', function(done) {
      assert.equal(true, integer.greaterThan(g, i))
      assert.equal(true, integer.greaterThan(b, g))
      assert.equal(true, integer.greaterThan(a, b))
      done()
    })

    it('should return false if a < b and both numbers are positive', function(done) {
      assert.equal(false, integer.greaterThan(b, a))
      assert.equal(false, integer.greaterThan(h, a))
      assert.equal(false, integer.greaterThan(g, b))
      done()
    })

    it('should return false if magnitude of a > b and both numbers are negative', function(done) {
      assert.equal(false, integer.greaterThan(i,e))
      assert.equal(false, integer.greaterThan(i,f))
      assert.equal(false, integer.greaterThan(f,e))
      done()
    })

    it('should return false if a < 0 and b > 0', function(done) {
      assert.equal(false, integer.greaterThan(i, b))
      assert.equal(false, integer.greaterThan(e, a))
      assert.equal(false, integer.greaterThan(f, d))
      done()
    })

    it('should fail if either a or b or both are not defined (cannot be ordered)', function(done) {
      // Implement some sort of test here
      done()
    }) 
  })

  describe('add(a,b)',function() {

    it('should add 2 positive numbers of the same length properly', function(done) {
      assert.equal(888, integer.add(d,h))
      assert.equal(1110, integer.add(b,d))
      done()
    })

    it('should return the same value when added to 0',function(done) {
      assert.equal(666, integer.add(b,g))
      assert.equal(123456, integer.add(g,a))
      done()
    })

    it('should be symmetric', function(done) {
      assert.equal(integer.add(d,h).toFloat(), integer.add(h,d).toFloat())
      assert.equal(integer.add(b,g).toFloat(), integer.add(g,b).toFloat())
      assert.equal(integer.add(a,b).toFloat(), integer.add(b,a).toFloat())
      done()
    })

    it('should add 2 positive numbers of different lengths properly', function(done) {
      assert.equal(123900, integer.add(a,d))
      assert.equal(124122, integer.add(b,a))
      done()
    })

    it('should add 2 negative numbers properly', function(done) {
      assert.equal(-7772, integer.add(e,f))
      assert.equal(-123789, integer.add(i, e))
      assert.equal(-130895, integer.add(f, i))
      done()
    })

    it('should subtract a positive and a negative number', function(done) {
      assert.equal(111, integer.add(d,e))
      assert.equal(-6995, integer.add(f,d))
      done()
    })

    it('should return 0 when adding a number to its additive inverse', function(done) {
      assert.equal(0, integer.add(a,i))
      done()
    })
  })

  describe('subtract(a,b)',function() {
    it('should return the correct result if a > b > 0', function(done) {
      assert.equal(122790, integer.subtract(a,b))
      assert.equal(123012, integer.subtract(a,d))
      assert.equal(222, integer.subtract(b,d))
      done()
    })

    it('should return -result if the order of a and b are switched', function(done) {
      assert.equal(-122790, integer.subtract(b,a))
      assert.equal(-123012, integer.subtract(d,a))
      assert.equal(-222, integer.subtract(d,b))
      done()
    })

    it('should return the same number when subtracting zero', function(done) {
      assert.equal(666, integer.subtract(b,g))
      assert.equal(-123456, integer.subtract(i, g))
      assert.equal(-333, integer.subtract(e, g))
      done()
    })

    it('should return the sum of the numbers when a > 0 and b < 0', function(done) {
      assert.equal(integer.add(b,a).toFloat(),integer.subtract(b,i).toFloat())
      assert.equal(integer.add(d,a).toFloat(),integer.subtract(d,i).toFloat())
      done()
    })

    it('should return 0 when subtracting a number from itself', function(done) {
      assert.equal(0, integer.subtract(a,a))
      assert.equal(0, integer.subtract(d,d))
      assert.equal(0, integer.subtract(g,g))
      assert.equal(0, integer.subtract(e,e))
      done()
    })
  })

  describe('multiply(a,b)', function() {
    it('should return 0 if either number is zero', function(done) {
      assert.deepEqual(g, integer.multiply(a,g))
      assert.deepEqual(g, integer.multiply(g,e))
      assert.deepEqual(g, integer.multiply(g,g))
      done()
    })

    it('should return the other input, if one of the inputs is one, and the other is non-zero', function(done) {
      assert.deepEqual(a, integer.multiply(a,j))
      assert.deepEqual(e, integer.multiply(e,j))
      assert.deepEqual(j, integer.multiply(j,j))
      assert.deepEqual(i, integer.multiply(j,i))
      done()
    })

    it('should return a positive product if both inputs are positive', function(done) {
      assert.equal(295704, integer.multiply(b,d))
      assert.equal(54814464, integer.multiply(a,d))
      assert.equal(123456, integer.multiply(j,a))
      done()
    })

    it('should return a positive product if both inputs are negative', function(done) {
      assert.equal(2477187, integer.multiply(e,f))
      assert.equal(41110848, integer.multiply(i,e))
      assert.equal(918389184, integer.multiply(f,i))
      done()
    })

    it('should return a negative product if only one input is negative', function(done) {
      assert.equal(-221778, integer.multiply(b,e))
      assert.equal(-3302916, integer.multiply(f,d))
      assert.equal(-15241383936, integer.multiply(a,i))
      done()
    })

    it('should be symmetric', function(done) {
      assert.deepEqual(integer.multiply(a,f), integer.multiply(f,a))
      assert.deepEqual(integer.multiply(b,e), integer.multiply(e,b))
      assert.deepEqual(integer.multiply(i,g), integer.multiply(g,i))
      assert.deepEqual(integer.multiply(d,h), integer.multiply(h,d))
      assert.deepEqual(integer.multiply(a,a), integer.multiply(a,a))
      done()
    })

    it('should return -num if the other number is -1', function(done) {
      assert.deepEqual(i, integer.multiply(a,l))
      assert.deepEqual(e, integer.multiply(l,k))
      done()
    })
  })

  describe('quotient(a,b)', function() {

    it('should return the same number if dividing by one', function(done) {
      assert.deepEqual(a, integer.quotient(a,j))
      assert.deepEqual(f, integer.quotient(f,j))
      assert.deepEqual(g, integer.quotient(g,j))
      assert.deepEqual(b, integer.quotient(b,j))
      done()
    }) 

    it('should return 0 when 0 is the numerator', function(done) {
      assert.deepEqual(g, integer.quotient(g, a))
      assert.deepEqual(g, integer.quotient(g, f))
      assert.deepEqual(g, integer.quotient(g, e))
      assert.deepEqual(g, integer.quotient(g, j))
      done()
    })

    it('should return 0 when a,b > 0 && b > a', function(done) {
      assert.deepEqual(g, integer.quotient(b,a))
      assert.deepEqual(g, integer.quotient(j,d))
      assert.deepEqual(g, integer.quotient(d,b))
      done()
    })

    it('should divide two positive numbers correctly', function(done) {
      assert.equal(1, integer.quotient(b,d))
      assert.equal(278, integer.quotient(a,h))
      assert.equal(185, integer.quotient(a,b))
      assert.equal(370, integer.quotient(a,k))
      done()
    })

    it('should return a negative number when dividing a negative number by a positive number', function(done) {
      assert.equal(-370, integer.quotient(a,e))
      assert.equal(-2, integer.quotient(b,e))
      assert.equal(-1, integer.quotient(a,i))
      assert.equal(-16, integer.quotient(a,f))
      done()
    })

    it('should return 1 if dividing a number by itself', function(done) {
      assert.deepEqual(j, integer.quotient(a,a))
      assert.deepEqual(j, integer.quotient(e,e))
      assert.deepEqual(j, integer.quotient(i,i))
      assert.deepEqual(j, integer.quotient(j,j))
      assert.deepEqual(j, integer.quotient(l,l))
      done()
    })

    it('should return a positive number if dividing two negative numbers', function(done) {
      assert.equal(22, integer.quotient(f,e))
      assert.equal(16, integer.quotient(i,f))
      assert.equal(370, integer.quotient(i,e))
      done()
    })

    it('should throw an error if you try to divide by 0 or -0', function(done) {
      assert.throws(function() {
        integer.quotient(a,g)
        integer.quotient(b,g)
        integer.quotient(e,g)
        integer.quotient(f,g)
        integer.quotient(k,o)
        integer.quotient(l,o)
        integer.quotient(m,o)
      }, Error)
      done()
    })
  })

  describe('mod(a,b)', function() {

    it('should return 0 if a is a multiple of b', function(done) {
      assert.deepEqual(g, integer.mod(h,n))
      assert.deepEqual(g, integer.mod(k,n))
      assert.deepEqual(g, integer.mod(m,n))
      assert.deepEqual(g, integer.mod(b,k))
      assert.deepEqual(g, integer.mod(h,m))
      done()
    })

    it('should return the correct value of a,b > 0, a > b', function(done) {
      assert.deepEqual(n, integer.mod(h,k))
      assert.deepEqual(m, integer.mod(b,d))
      assert.equal(246, integer.mod(a,b))
      done()
    })

    it('should return 0 if b=1', function(done) {
      assert.deepEqual(g, integer.mod(a,j))
      assert.deepEqual(g, integer.mod(k,j))
      assert.deepEqual(g, integer.mod(b,j))
      assert.deepEqual(g, integer.mod(n,j))
      done()
    })

    it('should return 0 if a === b and a > 0', function(done) {
      assert.deepEqual(g, integer.mod(a,a))
      assert.deepEqual(g, integer.mod(h,h))
      done()
    })

    it('should return -0 if a===b and a < 0', function(done) {
      assert.deepEqual(o, integer.mod(e,e))
      assert.deepEqual(o, integer.mod(i,i))
      done()
    })

    it('should return a if a < b and b > 0', function(done) {
      assert.deepEqual(b, integer.mod(b,a))
      assert.deepEqual(d, integer.mod(d,a))
      assert.deepEqual(k, integer.mod(k,a))
      assert.deepEqual(k, integer.mod(k,b))
      assert.deepEqual(d, integer.mod(d,b))
      assert.deepEqual(e, integer.mod(e,a))
      assert.deepEqual(e, integer.mod(e,b))
      done()
    })

    it('should return the correct value if a < b < 0', function(done) {
      assert.equal(-246, integer.mod(i,e))
      assert.equal(-4432, integer.mod(i,f))
      assert.equal(-113, integer.mod(f,e))
      done()
    })

    it('should return a if b < a < 0', function(done) {
      assert.deepEqual(e, integer.mod(e,i))
      assert.deepEqual(e, integer.mod(e,f))
      assert.deepEqual(f, integer.mod(f,i))
      done()
    })
  })

  describe('pow(a,b)', function() {
    it('should return a if b===1', function(done) {
      assert.deepEqual(a, integer.pow(a,j))
      assert.deepEqual(b, integer.pow(b,j))
      assert.deepEqual(g, integer.pow(g,j))
      assert.deepEqual(j, integer.pow(j,j))
      assert.deepEqual(i, integer.pow(i,j))
      assert.deepEqual(f, integer.pow(f,j))
      done()
    })

    it('should return 1 if b=== +-0', function(done) {
      assert.deepEqual(j, integer.pow(n,g))
      assert.deepEqual(j, integer.pow(f,g))
      assert.deepEqual(j, integer.pow(h,g))
      assert.deepEqual(j, integer.pow(a,g))
      assert.deepEqual(j, integer.pow(n,o))
      assert.deepEqual(j, integer.pow(f,o))
      assert.deepEqual(j, integer.pow(h,o))
      assert.deepEqual(j, integer.pow(a,o))
      done()
    })

    it('should return the correct value if a,b>0', function(done) {
      assert.equal(2401, integer.pow(q,p))
      assert.equal(16384, integer.pow(p,q))
      assert.equal(151807041, integer.pow(n,p))
      assert.equal('437104634676747795452235896466702336',integer.pow(a,q).toString())
      done()
    })

    it('should return correct n>0 if a<0 and b%2 === 0', function(done) {
      assert.equal(12296370321, integer.pow(e,p))
      assert.equal(3062374041915841, integer.pow(f,p))
      done()
    })

    it('should return correct n<0 if a<0 and b%2 === 0', function(done) {
      assert.equal('-454056225438947877', integer.pow(e,q).toString())
      assert.equal('-1260671430649276124479866479', integer.pow(f,q).toString())
      done()
    })

    it('should throw an error if b<-0', function(done) {
      assert.throws(function() {
        integer.pow(d,e)
      },Error)
      done()
    })
  })

})