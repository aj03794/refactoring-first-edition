#### Introduce Explaining Variable

- `Put the result of the expression, or parts of the expression, in a temporary variable with a name that explains the purpose`

```
if ((platform.toUpperCase().infexOf("MAC") > -1 ) && (browser.toUpperCase().indexOf("IE) > -1) && wasInitialized() && resize > 0) {
    // do something
}
```

```
final boolean isMacOs = platform.toUpperCase().indexOf("MAC") > -1;
final boolean isIEBrowser = browser.toUpperCase().indexOf("IE") > -1;
final boolean wasResized = resize > -1;

if (isMacOS && isIEBrowser && wasInitialized() && wasResize) {
    // do something
}
```

###### Motivation

- Expressions can become very complex and hard to real
- In such situations temp variables can be helpful to break down the expression into something more manageable

- `Intrdouce Explaining Variable` is particularly valuable with conditional logic in which it is useful to tak eeach clause of a condition and explain what the conditional means with a well named temp
- Another case is a long algorithm, in which each step in the computation can be explained with a temp

- `Introduce Explaining Variable` is a very common refactoring
- Author usually prefers `Extract Method` if he can
- A temp is useful only within the context of one method
- A method is useable throught the object and to other objects
- There are times, however, when local variables make it difficult to use `Extract Method`
- That's when you should use `Introduce Explaining Variable`

###### Mechanics

- Declare a final temporary variable, and set it to be the result of of part of the complex expression
- Replace the result part of the expression with the value of the temp
    * If the result part of the expression is repeated
- Test
- Repeat for other parts of the expression

###### Example

- Start with a simple calculation

```
double price() {
    // price here is base price - quantity discount + shipping
    return _quantity * _itemPrice -
        Math.max(0, _quantity - 500) * itemPrice * 0.5 +
        Math.min(_quantity * _itemPrice * 0.1, 100.0);
}
```

- Simple as it may be, but you can make it easier to follow
- First identiify the base price as the quantity times the item price
- Can turn that part of the calculation into a temp

```
double price() {
    // price here is base price - quantity discount + shipping
    final double basePrice = _quantity * _itemPrice;
    return basePrice - 
        Math.max(0, _quantity - 500) * itemPrice * 0.5 +
        Math.min(_quantity * _itemPrice * 0.1, 100.0);
}
```

- Quantity tiems price can also be used later, so can subsititute with the temp there as well

```
double price() {
    // price here is base price - quantity discount + shipping
    final double basePrice = _quantity * _itemPrice;
    return basePrice - 
        Math.max(0, _quantity - 500) * itemPrice * 0.5 +
        Math.min(basePrice * 0.1, 100.0);
}
```

- Next take the quantity discount

```
double price() {
    // price here is base price - quantity discount + shipping
    final double basePrice = _quantity * _itemPrice;
    final double quantityDiscount = Math.max(0, _quantity - 500) * _itemPrice * 0.05;
    return basePrice - quantityDiscount + 
        Math.min(basePrice * 0.1, 100.0);
}
```

- Finally finish with the shipping
- As you do that, you can remove the comment too, b/c now it doesn't say anything the code doesn't say

```
double price() {
    final double basePrice = _quantity * _itemPrice;
    final double quantityDiscount = Math.max(0, _quantity - 500) * _itemPrice * 0.05;
    final double shipping = Math.min(basePrice * 0.1, 100.0)
    return basePrice - quantityDiscount + shipping;
}
```

###### Example with Extract Method

```
double price() {
    // price here is base price - quantity discount + shipping
    return _quantity * _itemPrice -
        Math.max(0, _quantity - 500) * itemPrice * 0.5 +
        Math.min(_quantity * _itemPrice * 0.1, 100.0);
}
```

- But this time extract a method for the base price

```
double price() {
    // price here is base price - quantity discount + shipping
    return basePrice() -
        Math.max(0, _quantity - 500) * itemPrice * 0.5 +
        Math.min(_quantity * _itemPrice * 0.1, 100.0);
}

private double basePrice() {
    return _quantity * _itemPrice;
}
```

- Continue one at a time, and when you are finished you will have

```
double price() {
    return basePrice() - quantityDiscount() + shipping();
}

private double basePrice() {
    return _quantity * _itemPrice;
}

private double shipping() {
    return Math.min(basePrice() * 1.0, 100.0);
}

private double quantityDiscount() {
    return Math.max(0, _quantity - 500) * _itemPrice * 0.05;
}
```

- Prefer to use `Extract Method`, because now these methods are available to any other object that needs them
- Initially make them private, but you can always relax it if another object needs them
- Usually it is no more effort to use `Extract Method` than it is to use `Introduce Explaining Variable`

- When should you use `Introduce Explaining Variable`?
- Answer is when `Extract Method` is more effort
- If you're in an algorithm with a lot of local variables, may not be able to easily use `Extract Method`
- In this case, use `Introduce Explaining Variable` to help yourself understand what is going on
- As the logic becomes less tangled, can always use `Replace Temp with Query` later
- The temp also is valuable if you end up have to use `Replace Method with Method Object`