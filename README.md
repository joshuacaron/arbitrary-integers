z-math
======

[![Build Status](https://travis-ci.org/joshuacaron/z-math.svg?branch=master)](https://travis-ci.org/joshuacaron/z-math)

A simple module for operations on arbitrarily large integers, because sometimes 64-bit floats don't quite cut it. In future versions, I plan to add support for operations on Z_n (i.e. modular arithmetic and multiplication), as well as some common number theory algorithms such as calculating gcd, lcm, etc.

Usage
---------
To download the package simply run `npm install --save z-math`. Then just require it into your app like follows, and you are good to go: `var integer = require('z-math')`

Once you have the package imported you can create new integers with the `integer(n)` command where n is a regular integer in Javascript (technically a floating point number).

To convert an integer, say `a`, back to a JavaScript float use `a.toFloat()` or use it in the context of a mathematical operation, e.g. `a + 5`.

To convert an integer, say `b`, to a string, use `b.toString()`, or use it in the context of a string e.g. `console.log('The integer is: ' + b)`

Operations
---------

Then the remaining operations are defined as follows:

Add 2 integers: `integer.add(a, b)`

Subtract 2 integers: `integer.subtract(a, b)`

Multiply 2 integers: `integer.multiply(a, b)`

Get the quotient when dividing 2 integers: `integer.quotient(a, b)`

Get the modulus when dividing 2 integers: `integer.mod(a, b)`

Find a to the power of b: `integer.pow(a, b)`

To test equality/inequality there are a number of functions: `integer.greaterThan`, `integer.lessThan`, `integer.equal`, `integer.notEqual`, `integer.greaterThanEqual`, `integer.lessThanEqual`

Note that you can use `integer.lte` and `integer.gte` as shortcuts for `integer.lessThanEqual` and `integer.greaterThanEqual` respectively.

**All of these operations return new integers and leave the original ones untouched.**
