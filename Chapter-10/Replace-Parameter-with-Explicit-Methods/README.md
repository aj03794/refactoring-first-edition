#### Replace Parameter with Explicit Methods

- You have a method that runs different code depnding on the values of the parameter

`Create a separate method for each value of the parameter`

```
const setValue = (name, value) => {
    if (name.equals("height")) {
        return height = value
    }
    if (name.equals("width")) {
        return width = value
    }
}

// ---------------------------

const setHeight = (arg) => {
    height = arg
}

const setWidth = (arg) => {
    width = arg
}

```

######## Motivation

- `Replace Parameter with Explicit Methods` is the reverse of `Parameterize Method`
- Usual case for the former is that you have discrete values of a paremeter, test for those values in a conditional and do different things
- The caller has to decide what it wants to do by setting the parameter, so you might as well provide different methods and avoid the conditional
- Interface to use the function is much clearer
- With the parameter, any programmer using the method needs not only look at the methods on the class but also to determine a valid parameter value
- The latter is often poorly documented

- You shouldn't use `Replace Parameter with Explicit Methods` when the parameter values are likely to change a lot
- If this happens and you are just setting a field to the passed in parameter, use a setter instead
- If you need conditional behavior, you need `Replace Conditional with Polymorphism`

######## Mechanics

- Create an explicit method for each value of the parameter
- For each leg of the conditional, call the appropriate new method
- Test after changing each leg
- Replace each caller of the conditional method with a call to the appropriate new method
- Test
- When all callers are changed, remove the conditional method

######## Example

- Want to create a subclass of employee on the basis of a passed in parameter, often the result of `Replace Constructor with Factory Method`

```
// This is all in an Employee class

const engineer = 0
const salesman = 1
const manager = 2

const create = (type) => {

    switch(type) {
        case engineer:
            return new Engineer()
        case salesman:
            return new Salesman()
        case manager:
            return new Manager()
        default:
            throw new Error(`Incorrect type code value`)
    }

}
```

- B/c this is a factory method, can't use `Replace Conditional with Polymorphism b/c you have created the object yet
- Don't expect too many subclasses, so an explicit interface makes sense

```
const createEngineer = () => new Engineer()
const createSalesman = () => new Salesman()
const createManager = () => new Manager()

const create = (type) => {
    switch(type) {
        case engineer:
            return createEngineer()
        case salesman:
            return createSalesman()
        case manager:
            return createManager()
        default:
            throw new Error(`Incorrect type code value`)
    }
}
```

- Change in calls between the old and new method

```
// With old code
const kent = Employee.create(engineer)
// With new code
const kent = Employee.createEngineer()
```

- Once you've done that for all callers of `create`, you can remove the `create` method
- Also may be able to get rid of the constants