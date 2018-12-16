#### Replace Temp with Query

- You are using a temporary variable to hold the result of an expression

- Extract the expression into a method. Replace all references to the temp with the expression. The new method can then be used in other methods

```
double basePrice = _quantity * _itemPrice;
if (basePrice > 1000)
    return basePrice * 0.95;
else
    return basePrice * 0.98;
...
double basePrice() {
    return _quantity * _itemPrice;
}
```

###### Motivation

- The problem with temps is that they are temporary and local
- B/c they can be seen only in the context of the method in which they are used, temps tend to encourage longer methods, b/c that's the only way you can reach the temp
- By replacing the temp w/ a query method, any method in the class can get at the information
- That helps a lot in coming up with cleaner code for the class

- `Replace Temp with Query` often is a vital step before `Extract Method`
- Local variables make it difficult to extract, so replace as many variables as you can w/ queries

- The straightforward cases of this refactoring are those in which temps are assigned only to once and those in which the expression that generates the assignment is free of side effects
- Other cases are trickier but possible
- May need touse `Split Temporary Variable` or `Separate Query from Modifier` first to make things easier
- If the temp is used to collect a result (such as summing over a loop), you need to copy some logic into the query method

###### Mechanics

- Here is a simple case:
    * Look for a temporary variable that is assigned to once
        * If a temp is set more than once consider `Split Temporary Variable`
    * Declare the temp as final
        * This will ensure that the temp is only assigned to once
    * Extract the right hand assignment of the assignment into a method
        * Intitially mark the method as private. You may find more use for it later, but you can easily relax the protection later
        * Ensure the extracted method is free of side effects, that is, it does not modify any object
        * If it is not free of side effects, use `Separate Query from Modifier`
    * test
    * Use `Replace Temp with Query` on the temp

- Temps are often used to store summary information inside of loops
- The entire loop can be extracted into a method
- This removes several lines of noisy code
- Sometimes a loop may be used to sum up muliple values (`as in the example on page 26`)
- In this case, duplicate the loop for each temp so that you can replace each temp with a query
- The loop should be very simple, so there is little danger in duplicating the code

- You may be concerned about performance in this cas
- As with other performance issues, let it slide for now
- `9/10` it won't matter
- When it does matter, you will fix the problem for optimization
- With your code better refactored, you will often find ore powerful optimizations, which you would have missed without refactoring
- If worse comes to worse, it's very reasy to put the temp back

###### Example

- Start with a simple method

```
double getPrice() {
    int basePrice = _quantity * _itemPrice;
    double discountFactor;
    if (basePrice > 1000) discountFactor = 0.95;
    else discountFactor = 0.98;
    return basePrice * discountFactor;
}
```

 - Delare both temps as final

 ```
 double getPrice() {
     final int basePrice = basePrice();
     final double discountFactor;
     if (basePrice > 1000) discountFactor = 0.95;
     else discountFactor = 0.98;
     return basePrice * discountFactor;
 }
```

- Replace temps one at a time

```
double getPrice() {
    final int basePrice = basePrice();
    final double discountFactor;
    if (basePrice > 1000) discountFactor = 0.95;
    else discountFactor = 0.98;
    return basePrice * discountFactor;
}

private int basePrice() {
    return _quantity * _itemPrice;
}
```

- First replace the reference to the temp

```
double getPrice() {
    final int basePrice = basePrice();
    final double discountFactor;
    if ("basePrice()" > 1000) discountFactor = 0.95;
    else discountFactor = 0.98;
    return basePrice * discountFactor;
}
```

- Test and do the next

```
double getPrice() {
    final double discountFactor;
    if (basePrice() > 1000) discountFactor = 0.95;
    else discountFactor = 0.98;
    return "basePrice()" * discountFactor;
}
```

- Can extract `discountFactor` in a similar way

```
double getPrice() {
    final double discountFactor = discountFactor();
    return basePrice() * discountFactor;
}

private double discountFactor() {
    if (basePrice() > 1000) return 0.95;
    else return 0.98
}
```

- If would have been difficult to extract `discountFactor` if we had not replaced `basePrice` with a query

- The `getPrice` method ends up as follows (`notice how much simpler this is`):

```
double getPrice() {
    return basePrice() * discountFactor();
}
```