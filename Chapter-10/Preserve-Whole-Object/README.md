####### Preserve Whole Object

- You are getting several values from an object and passing these values as parameters in a method call

`Send the whole object instead`

```
const high = daysTempRange().getHigh()
const withinPlan = plan.withinRange(low, high)

// Change into

withinPlan = plan.withinRange(daysTempRange())
```

######## Motivation

- This type of situation arises when an object passes several data values from a single object as parameters in a method call
- `The problem with this is that if the called object needs new data values later, you have to find and change all the calls to this method`
- You can avoid this by passing in the whole object from where the data came from
- The called object then can ask for what it wants from the whole object

- In addition to makimng the parameter list more robust to changes, `Preserve Whole Object` often makes the code more readable
- Long parameter lists can be hard to work with b/c both caller and callee have to remember which values were there
- They also encourage duplicate code b/c the called object can't take advantage of any other methods on the whole object to calculate intermediate values

- There is a downside
- When you pass in values, the called object has a dependency on the values, but there isn't an dependency to the object from which the values were extracted
- Passing int he required object causes a dependency btwn the required object and the called object

- That a called method uses a lot of values from anothe robject is a signal that the called method should really be defined on the object from which the values come
- Consider `Move Method` as an alternative

- You may not have the whole object defined
- In this case you need `Introduce Parameter Object`

- A common case is that a calling object passes several of its own data values in as parameters, in this case you can make the pass in `this` instead of these values, if you have the appropriate getting methods and don't mind the dependency

######## Mechanics

- Create a new parameter for the whole object from which the data comes
- Test
- Determine which parameters should be obtained from the whole object
- Take one parameter and replace references to it within the method body by invoking an appropriate method on the whole object parameter
- Delete the parameter
- Test
- Repeat for each parameter that can be gotten from the whole object
- Remove the code in the calling method that obtains the deleted parameters
- Test

######## Example

- Consider a room object that records high and low temps during the day
- It needs to compare this range with a range in a predefined heating plan

```
const room = () => {
    const withinPlan = (plan) => {
        const low = daysTempRange().getLow()
        const high = daysTempRange().getHigh()
        return plan.withinRange(low, high)
    }
}

const heatingPlan = () => {
    const withinRange = (low, high) => {
        return (low >= _range.getLow() && high <= _range.getHigh())
    }
    const tempRange = _range
}

```

- Rather than unpack the range information when you pass it, you can pass the whole range object
- In this simple case you can do this in one step
- If more parameters are involved, you can do it in smaller steps
- First add the whole object to the parameter list

```
const heatingPlan = () => {
    const withinRange = (roomRange, low, high) => {
        return (low >= _range.getLow() && high <= _range.getHigh())
    }
}

const room = () => {
    const withinPlan = (plan) => {
        const low = daysTempRange().getLow()
        const high = daysTempRange().getHigh()
        return plan.withinRange(daysTempRange(), low, high)
    }
}
```

- Then you use a method on the whole object instead of one of the parametes

```
const heatingPlan = () => {
    const withinRange = (roomRange, low, high) => {
        return (roomRange.getLow() >= _range.getLow() && high <= _range.getHigh())
    }
}

const room = () => {
    const withinPlan = (plan) => {
        const low = daysTempRange().getLow()
        const high = daysTempRange().getHigh()
        return plan.withinRange(daysTempRange(), low, high)
    }
}
```

- Until all changes are made

```
const heatingPlan = () => {
    const withinRange = (roomRange, low, high) => {
        return (roomRange.getLow() >= _range.getLow() && roomRange.getHigh() <= _range.getHigh())
    }
}

const room = () => {
    const withinPlan = (plan) => {
        const low = daysTempRange().getLow()
        const high = daysTempRange().getHigh()
        return plan.withinRange(daysTempRange())
    }
}
```

- Now don't need the temps anymore

```
const room = () => {
    const withinPlan = (plan) => {
        return plan.withinRange(daysTempRange())
    }
}
```

- Using whole objects this way soon leads you to realize that you can usually move behavior into the whole object to make it easier to work with

```
const heatingPlan = () => {
    const withinRange = (roomRange) => {
        return (_range.includes(roomRange))
    }
}

const tempRange = () => {
    const includes = (arg) => {
        return arg.getLow() >= this.getLow() && arg.getHigh() <= this.getHigh()
    }
}
```