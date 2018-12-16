###### Remove Control Flag

- You have a variable that is acting as a control flag for a series of boolean expressions

- `Use a break or return instead`

###### Motivation

- When you have a series of conditional expressions, you often see a control flag used to determine when to stop looking

```
while not done
    if (condition)
        do something
        set done to true
    next step of loop
```

- Such control flags are more trouble than they are worth
- They come from the rules of structured programming that call for routines with one entry and one exit point
- Author agrees with one entry point
- But the one exit point rule leads you to very convoluted conditionals with these awkward flags in the code
- This is why languages have break and continue statements to get out of a complex conditional

###### Mechanics

- Obvious way to deal w/ control flags is to use break/continue statements present in your language of choice (if they are present)

    * Find the value of the control flag that gets you out of the logic statement
    * Replace assignments of the break-out value with a break or continue statement
    * Test after each replacement

- Another approach, also usable in languages w/o break and continue:
    * Extract the logic into a method
    * Find the value of the control flag that gets you out of the logic statement
    * Replace assignments of the break-out value with a return
    * Test after each replacement

- Even in languages with a break our continue, author prefers use of an extraction and of a return
- The return clearly signals that no more code in the method is executed
- If you have that kind of code, you often need to extract that piece anyway

- Keep an eye on whether the control flag also indicates result information
- If it does, you still need the control flag if you use the break, or you can return the value if you have extracted the value

###### Example: Simple Control Flag Replaced with Break

- Following function checks to see whether a list of people contains a couple of hard-coded suspicious characters

```
void checkSecurity(String[] people) {
    boolean found = false;
    for (int i = 0; people.length; i++) {
        if (!found) {
            if (people[i].equals("Don)) {
                sendAlert();
                found = true;
            }
            if (people[i].equals("John")) {
                sendAlert();
                found = true;
            }
        }
    }
}
```

- In a case like this, it is easy to see the control flag
- It's the piece that sets the `found` variable to true
- Can introduce breaks one at a time

```
void checkSecurity(String[] people) {
    boolean found = false;
    for (int i = 0; people.length; i++) {
        if (!found) {
            if (people[i].equals("Don)) {
                sendAlert();
                "break";
            }
            if (people[i].equals("John")) {
                sendAlert();
                found = true;
            }
        }
    }
}
```

```
void checkSecurity(String[] people) {
    boolean found = false;
    for (int i = 0; people.length; i++) {
        if (!found) {
            if (people[i].equals("Don)) {
                sendAlert();
                break;
            }
            if (people[i].equals("John")) {
                sendAlert();
                "break";
            }
        }
    }
}
```

- Then remove all references to control flag

```
void checkSecurity(String[] people) {
    for (int i = 0; people.length; i++) {
        if (people[i].equals("Don)) {
            sendAlert();
            break;
        }
        if (people[i].equals("John")) {
            sendAlert();
            break;
        }
    }
}
```

###### Example: Using Return with a Control Flag Result

- The other style of this refactoring uses a return
- Illustrate this with a variant that uses the control flag as a result value

```
void checkSecurity(String[] people) {
    String found = "";
    for (int i = 0; people.length; i++) {
        if (found.equals("")) {
            if (people[i].equals("Don)) {
                sendAlert();
                found = "Don";
            }
            if (people[i].equals("John")) {
                sendAlert();
                found = "John";
            }
        }
    }
    someLaterCode(found);
}
```

- Here `found` is doing two things
    * Indicating a result
    * Acting as a control flag

- Extract the code that is determing `found` into its own method

```
void checkSecurity(String[] people) {
    String found = foundMiscreant(people);
    someLaterCode(found);
}

void foundMiscreant(String[] people) {
    String found = "";
    for (int i = 0; people.length; i++) {
        if (found.equals("")) {
            if (people[i].equals("Don)) {
                sendAlert();
                found = "Don";
            }
            if (people[i].equals("John")) {
                sendAlert();
                found = "John";
            }
        }
    }
    return found;
}
```

- Then replace the control flag with a return

```
void foundMiscreant(String[] people) {
    for (int i = 0; people.length; i++) {
        if (people[i].equals("Don)) {
            sendAlert();
            ***return "Don"***;
        }
        if (people[i].equals("John")) {
            sendAlert();
            ***return "John"***;
        }
    }
    return found;
}
```
- You can also use the return style when you're not returning a value
- Just use return w/o the argument

- `This has the problem of a function with side effects`
- Want to use `Separate Query from Modifier`