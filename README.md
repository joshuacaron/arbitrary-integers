z-math
======

A simple module for operations on arbitrarily large integers, because sometimes 64-bit floats don't quite cut it. In future versions, I plan to add support for operations on Z_n (i.e. modular arithmetic and multiplication), as well as some common number theory algorithms such as calculating gcd, lcm, etc.

Usage
---------
To download the package simply run `npm install --save z-math`. Then just require it into your app like follows, and you are good to go: `var int = require('z-math')`

Once you have the package imported you can create new integers with the `new int.Integer(n)` command where n is a regular integer in Javascript (technically a floating point number).

Then the remaining operations are defined as follows:

Add 2 integers: `int.add(a,b)`

Subtract 2 integers: `int.subtract(a,b)`

Multiply 2 integers: `int.multiply(a,b)`

Get the quotient when dividing 2 integers: `int.quotient(a,b)`

Get the modulus when dividing 2 integers: `int.mod(a,b)`

Find a to the power of b: `int.pow(a,b)`

To test equality/inequality there are a number of functions: `int.greaterThan`, `int.lessThan`, `int.equal`, `int.notEqual`, `int.greaterThanEqual`, `int.lessThanEqual`

Note that you can use `int.lte` and `int.gte` as shortcuts for `int.lessThanEqual` and `int.greaterThanEqual` respectively.

**All of these operations return new integers and leave the original ones untouched.** If you are developing your own operations and want similar operations the `clone` package will probably be a great deal of help to you. 
 
