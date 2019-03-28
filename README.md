# Math.js

Math.js is a math language that transpiles to JavaScript. It allows you to write equations with ease and any prior knowledge.

## Examples

#### Addition
```sh
1 + 2 + 3 # 6
```
We add up `1`, `2` and `3` which would result in 6. `#` is the start of a comment, so it's excluded from any equation.

#### Multiplication
```sh
1.5 * 2 # 3
```
You can easily multiply numbers, as seen here.

#### Order of operations
```sh
(1 + 2)^3 - 5 * 3 # 12
```
Math.js follows the standard [Order of Operations](https://en.wikipedia.org/wiki/Order_of_operations) when calculating an equation.

#### Functions
Math.js has several built in functions you can use.
- `log(x)` natural logarithm of x
- `logb(x)` logarithm of x with base b, example `log10(100) # 2`
- `sqrt(x)` take the square root of x
- `sin(x)` take the sin of x
- `cos(x)` take the cos of x
- `tan(x)` take the tan of x
- `floor(x)` round x down
- `ceil(x)` round x up
- `round(x)` round x to the nearest integer
- `abs(x)` take the absolute value of x
- `radians(x)` turn x degrees into radians
- `degrees(x)` turn x radians into degrees

Example usage:
```sh
round(2 + sqrt(2^2 / (4 - 2))) # 3
```

#### Variables
```sh
x = 10 / 2
10 - x # 5
```
You can easily create variables. These variables can be used in equations, functions and to assign other variables.
