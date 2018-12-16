#### Separate Query from Modifier

- You have a method that returns a value but also changes the state of an object

`Create two methods, one for the query and one for the modification`

![](images/figure-1.png)

###### Motivation

- Wheny ou have a function that gives you a value and has no observable side effects, you have a very valuable thing
- `You can call this function as often as you like`
- You can move the call to other places in the method
- `In short, you have a lot less to worry about`

- It is a good idea to clearly signal the difference between methods w/ side effects and those without
- Good rule to follow is to say that any method that returns a value should not have observable side effects
- Some programmers treat this as an absolute rule
- Others are not 100% pure on this but try to follow it most of the time

- If you come across a method that returns a value but also has side effects, you should try to separate the query from the modifier

- Note the phrase `observable side effects`
- A common optimization is to cache the value of a query in a field so that the repeated calls go quicker
- Although this changes the state of the object w/ the cache, the change is not observable
- Any sequence of queries will always return the same results for each query

###### Mechanics

* Create a query that returns the same value as the original method
    * Look in the original method to see what is returned
        * If the returned value is a temporary, look at the location of the temp assignment
* Modify the original method so that it returns the result of a call to the query
    * Every return in the original method should say `return newQuery()` instead of returning everything else
    * If the method used a temp w/ a single assignment to capture the return value, you should be able to return it
* Test
* For each call, replace the single call to the original method with a call to the query
    * Add a call to the original method before the line that calls the query
    * Test after each change to a calling method

```
void foundMiscreant(String[] people) {
    for (int i = 0; people.length; i++) {
        if (people[i].equals("Don)) {
            sendAlert();
            return "Don";
        }
        if (people[i].equals("John")) {
            sendAlert();
            return "John";
        }
    }
    return found;
}
```

- It is called by

```
void checkSecurity(String[] people) {
    String found = foundMiscreant(people);
    someLaterCode(found);
}
```

- To separate the query from the modifier, first need to create a suitable query that returns the same value as the modifier does but w/o doing the side effects

```
void foundPerson(String[] people) {
    for (int i = 0; people.length; i++) {
        if (people[i].equals("Don)) {
            sendAlert();
            return "Don";
        }
        if (people[i].equals("John")) {
            sendAlert();
            return "John";
        }
    }
    return "";
}
```

- Replace every return in the original function, one at a time, with calls to the new query
- Test after each replacement
- When done the original method looks like the following

```
void foundMiscreant(String[] people) {
    for (int i = 0; people.length; i++) {
        if (people[i].equals("Don)) {
            sendAlert();
            return ***foundPerson(people)***;
        }
        if (people[i].equals("John")) {
            sendAlert();
            return ***foundPerson(people)***;
        }
    }
    return ***foundPerson(people)***;
}
```

- Now alter all the calling methods to do two falls
    * First to the modifier and then to the query

```
void checkSecurity(String[] people) {
    foundMiscreant(people);
    String found = foundPerson(people);
    someLaterCode(found);
}
```

- Once this is done for all calls, can alter the modifier to give it a void return type

```
void foundMiscreant(String[] people) {
    for (int i = 0; people.length; i++) {
        if (people[i].equals("Don)) {
            sendAlert();
            return;
        }
        if (people[i].equals("John")) {
            sendAlert();
            return;
        }
    }
    return;
}
```

- Now it seems better to change the name of the original

```
void sendAlert(String[] people) {
    for (int i = 0; people.length; i++) {
        if (people[i].equals("Don)) {
            sendAlert();
            return;
        }
        if (people[i].equals("John")) {
            sendAlert();
            return;
        }
    }
    return;
}
```

- In this case a lot of code duplication because the modifier uses the body of the query to do its work
- Can now use `Subsitute Algorithm` to take advantage of this

```
void sendAlert(String[] people) {
    if (!foundPerson(people).equal(""))
        sendAlert();
}
```

###### Concurrency Issues

- If working in a multithreaded system, test and set operations as a single action is an important idiom
- Does this conflict with `Separate Query from Modifier`
- Still valuable to separate query and modiifer operations
- However, need to retain a 3rd method that does both
- The query-and-modify operation will call the separate and query modify methods and be synchronzied, you also might restrict their visibility to package or private level