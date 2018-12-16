#### Inline Method

- You have a temp that is assigned once with a simple expression
- And the temp is getting in the way of other refactorings

- `Replace all the references to that temp with the expression`

```
double baseprice = anOrder.basePrice();
return (basePrice > 1000)
```

- Change this to be

```
return (anOrder.basePrice() > 1000)
```

###### Motivation

- Most of the time `Inline Temp` is used as part of `Replace Temp with Query`, so the real motivation is there
- The only time `Inline Temp` is used on its own is when you find a temp that is assigne dthe value of a ethod call
- Often this temp isn't doing any harm and you can safely leave it there
- If the temp is getting in the way of other refactorings, such as `Extract Method`, it's time to inline it

###### Mechanics

- Delcare the tamp as final it isn't alread
    * This checks that the temp is really only assigned once
- Find all references to the temp and replace them with the right hand side of the assignment
- Test after each change
- Remove the declaration and the assignment of the temp
- Test