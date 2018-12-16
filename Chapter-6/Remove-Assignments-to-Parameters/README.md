#### Remove Assignments to Parameters

- The code assigns to a parameter

- `Use a temporary variable instead`

```
int discount(int inputVal, int quantity, int yearToDate) {
    if(inputVal > 50) inputVal -= 2;
}
```

- Change this to

```
int discount(int inputVal, int quantity, int yearToDate) {
    int result = inputVal;
    if (inputVal > 50) result -= 2;
}
```

##### Motivation

- What does `assigns to a parameter mean`?
- This means that if you pass in a different object named `foo`, in the parameter, assigning to the parameter means to change `foo` to refer to a different object
- It is okay to do something to the object that was passed in
- It is not okay to change `foo` to refer to another object entirely

```
void aMethod(Object foo) {
    foo.modifyInSomeWay(); // this is okay
    foo = anotherObject; // this is bad
}
```

- The reason it is not a good practice to do this is because of lack of clarity and confusion between `pass by value` and `pass by reference`

- With `pass by value`, any ahnge to the parameter is not reflected in the calling routine
- Those ho have used `passed by reference` will probably find this confusing

- Other area of confusion is within the body of the code itself
- It is much clearer if you only use the parameter to represent what has been passed in; b/c that is a consistent usage

###### Mechanics

- Create a temp variable for parameter
- Replace all references to the parameter, made after the assignment, to the temp variable
- Change the assignment to assign to the temp variable
- Test

###### Example

```
int discount (int inputVal, int quantity, int yearToDate) {
    if (inputVal > 50) inputVal -= 2;
    if (quantity > 100) inputVal -= 1;
    if (yearToDate > 10000) inputVal -= 4;
    return inputVal; 
}
```

- Replacing with a temp leads to

```
int discount (int inputVal, int quantity, int yearToDate) {
    int result = inputVal;
    if (inputVal > 50) result -= 2;
    if (quantity > 100) result -= 1;
    if (yearToDate > 10000) result -= 4;
    return result; 
}
```

- Enforce this convention with the final keyword

```
int discount (final int inputVal, final int quantity, final int yearToDate) {
    int result = inputVal;
    if (inputVal > 50) result -= 2;
    if (quantity > 100) result -= 1;
    if (yearToDate > 10000) result -= 4;
    return result; 
}
```

- Helps more with longer methods than shorter methods