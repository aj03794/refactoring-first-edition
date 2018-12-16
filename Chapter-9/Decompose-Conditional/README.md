- You have a complicated (if-then-else) statement

- `Extract methods from the condition, then part, and else parts

```
if (date.before(SUMMER_START) || date.after(SUMMER_END))
    charge = quantity * _winterRate + _winterServiceCharge;
else charge = quantity * _summerRate;
```

Changes into

```
if (notSummer(date))
    charge = winterCharge(quantity);
else charge = summerCharge(quantity);
```

###### Motivation

- One of the most common areas of complexity in a program lies in the complex conditional logic
- As you write code to test conditions and do various things depending on various conditions, you quickly end up with a pretty long method
- Length of a method is in itself a factor that makes it harder to read, but conditions increase the difficulty
- Problem usually lies in the fact that the code, both in the condition checks and in the actions, tells you what happens but can easily obscure why it happens
- As with any large block of code, you can make your intention clearer by decomposing it and replacing chunks of code with a `method named after the intention of that block of code`
- With conditions you can receive further benefit by doing this for the conditional part and each of the alternatives
- This way you highlight the condition and make it clear what you are branching on
- You also highlight the reason for branching

###### Mechanics

- Extract the condition into its own method
- Extract the then part and the else part into their own methods

- If nested conditional is found, usually first look to see whether to use `Replace Nested Conditionals with Guard Clauses`
    * If that does not make sense, decompose each of the conditionals

###### Example

- Suppose calculating the charge for something that has separat rates for winter and summer

```
if (date.before(SUMMER_START) || date.after(SUMMER_END))
    charge = quantity * _winterRate + _winterServiceCharge;
else charge = quantity * _summerRate;
```

- Extract the conditional and each leg as follows

```
if (notSummer(date))
    charge = winterCharge(quantity);
else charge = summerCharge (quantity);

private boolean notSummer(Date date) {
    return date.before (SUMMER_START) || date.after(SUMMER_END_)
}

private double summerCharge(int quantity) {
    return quantity * _summerRate;
}

private double winterCharge(int quantity) {
    return quantity * _winterRate + _winterServiceCharge;
}
```

- Result of complete refactoring for clarity
- `In practice, do each extraction separately and test`

- Many programmers don't extract the condition parts in situations such as this
- Conditions are often quite short, so it hardly seems worth it
- Although the condition is often short, there is often a big gap btwn the intention of the code and its body
- Even in this case, reading `notSummer(date)` conveys a cleared message than does the original code
- With the original, have to look at the code and figure out what its doing
- Not difficult to do that here, but even so the extracted method reads more like a comment