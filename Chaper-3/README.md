#### Bad Smells in Code

- Deciding when to start refactoring, and when to stop, is just as important to refactoring as knowing how to operate the mechanics of refactoring

- It is easy to explain how to delete an instance variable or create a hierarchy
- Trying to explain when to do these things is not so cut-and-dry

###### Duplicated Code

- If you see the same code structure in more than one place, you can be sure that your program will be better if you find a way to unify them

- The simplest duplicated code problem is when you have the same expression in two methods of the same class
- Then all you have to do is `Extract Method` and invoke the code from both places

- Another common duplication problem is when you have the same the same expression in two sibling subclasses
- You can eliminiate this duplication by using `Extract Method` to separate the similar bits from the different bits
- You may then find you can use `Form Template Method`
- If the methods do the same thing with a different alogrithm, you can choose the clearer of the two and use `Subsitute algorithm`

- If you have duplicated code in two unrelated classes, consider using `Extract Class` in one clss and then use the new component in the other
- Another possibility is that the method really belongs only in one of the classes and should be invoked by the other class or that the method belongs in a 3rd class that should be referred to by both of the original classes
- You have to decide where the method makes sense and ensure it is there and nowhere else

###### Long Method

- The object programs that live best and longest are those with short methods
- Programmers new to objects often feel that no computation ever takes place, that object programs are endless sequences of delegation
- When you have lived with such a program for a few years, you learn how valuable all those little methods are
- `All of the payoffs of indirection - explanation, sharing, and choosing - are supported by little methods`

- Since the early days of programming people have realized that the longer a procedure is, the more difficult it is to understand
- Overhead to the reader of the code b/c you have to switch context to see what the subprocedure does
- Dev enviroments that allow you to see two methods at once help you to eliminiate this step
- `But the real key to making it easy tounderstand small methods is good naming`

- The net effect is that you should be much more aggressive about decomposing methods
- `A heuristic we follow is that whenever we feel the need to comment something, write a method instead`
- Such a method contains the code that was commented but is named after the intention of the code rather than how it does it
- You may do this on a group of lines or on as little as a single line of code
- Do this even if the method call is longer than the code it replaces, provided the method name explains the purpose of the code
- The key here is not method length but the semantic

- Most times all you need to do to shorten a method is `Extract Method`
- Find parts of the method that go nicely together and make a new method

- If you have a method with lots of parameters and temporary variables, these elements get in the way of extract methods
- If you try to use `Extract Method` you end up passing so many parameters and temp variables as parameters to the extract method that the result is scarely more readable than the original
- You can often use `Replace Temp with Query` to eliminate temps
- Long lists of parameters can be slimmed down with `Introduce Parameter object` and `Preserve whole object`

- If you've tiried that and still have too many temps and parameters, try `Replace Method with Method Object`

- How to identify clumps of code to extract?
- Good technique is to look for comments
- Often signal this kind of semantic distance
- A block of code with a comment tells you what it is doing can be replaced by a method whose name is based on that comment
- Even a single line is worth extract if it needs explanation

- Condtionals and loops also give signs for extractions
- Use `Decompose Conditional` to deal with conditonal expressions
- With loops, extract the loop and the code within the loop into its own method

###### Large Class

- When a class is trying to do too much, it often shows up as too many instance variables
- When a class has too many instance variables, duplicated code cannot be far behind

- You can `Extract Class` to bundle a number of these variables toether
- Choose variables to go together in the component tha tmake sense for each
- For example, `depositAmount` and `depositCurrency` are likely to belong together in a component
- More generally, common prefixes or suffixes for some subset of the variables in a class suggest the opportunity for a component
- If the component makes sense as a subclass, you'll find `Extract Subclass` often is easier

- Sometimes a class does not use all of its instance variables all of the tiem
- If so, you may be able to `Extract Class` or `Extract Subclass` many times

- As with a class with too many instance variables, a class with too much code a place where duplicated code can easily take place
- The simplest solution is to eliminiate redundancy in the class itself

- As with a class with a huge wad of variables, the usual solution for a class with too much code is either to `Extract Class` or `Extract Subclass`
- A useful trick is to determine how clients use the class and use `Extact Interface` for each of these uses
- That may give you ideas on how you can further break up the class

###### Long Parameter List

- In early programming days, taught to pass in as parameters everything needed by a routine
- This was understandable b/c the alternative was global data, and global data is usually painful
- Objects change this situation because if you don't have a need you need, you can always ask another object to get it for you
- `With objects, you don't pass in everything a method needs; instead you pass enough so that the method can get to everything it needs`
- A lot of what a method needs is available on the method's host class
- In OO programs, lists tend to be much smaller than in traditional programs

- Use `Replace Parameter with Method` when you can get the data in one parameter by making the request of an object you already know about
- This object might be a field or it might be another parameter
- Use `Preserve Whole Object` to take a bunch of data gleaned from an object and replace it with the object itself
- If you have several data items with no logical object, use `Introduce Parameter Object`

- There is one important exception to making these changes
- This is when you explicitly do not want to create a dependency from the called object to the larger object
- In those cases unpacking data and sending it along as parameters is reasonable, but pay attention to the pain involved
- `If the parameter list is too long or changes too often, you need to rethink your dependency structure`

###### Divergent Change

- We structure our software to make the change easier; software is meant to be soft
- When we make a change we want to be able to jump to a single clear point in the system and make the change

- Divergent changes occurs when one class is commonly changed in different ways for different reasons
- If you look at a class and say `Well, I will have to change these three methods every time I get a new database; I have to change these four methods every time there is a new financial instrument` you likely have a situation in which two objects are better than one
- That way each object is changed as a result of only one kind of change
- You often discover this only after youv'e added a few databases or financial inttruments
- `Any change to handle a variation should change a single class and all the typing in the new class should express the variation`

- To clean this up you identify everything that changes for a particular cause and use `Extract Class` to put them all together

###### Shotgun Surgery

- Similar to divergent change but it is the opposite
- You have to make a lot of little changes to a lot of different classes
- When the changes are all over the place, they are hard to find, and it's easy to miss and important change

- In this case you want to use `Method Method` and `Move Field` to put all the changes into a single class
- If no current class looks like a good candidate, create one
- Often you can use `Inline Class` to bring a whole bunch of behavior together
- You get a small dose of divergent change, but you can easily deal with that

- Divergent change in one class that suffers many kinds of changes, and shotgun surgery is one change that alters many classes
- Either way, you want to arrange things so that, ideally, there is a 1-to-1 between common changes and classes

###### Feature Envy

- The whole point of objects is that they are a technique to package data with the processes used on that data
- A class bad practice is a method that seems more interested in a class other than the one it is actually in
- The most common focus of the envy is the data
- "We've lost count of the times we've seen a method that invoked half-a-dozen getting methods on another object to calculate some value"
- Fortunately the cure is obvious, the method clearly wants to be somewhere else, so use `Move Method` to get it there
- Sometimes only part of the method suffers from envy; in that case use `Extract Method` on the jealous bit and `Move Method` to give it a dream home

- Not all cases are so cut and dry
- Often a method uses features of several classes so which one should it live with?
- Good heuristic is to determine which class has most of the data and put the method with that data
- Step is often made easier if `Extract Method` is used to break a method into pieces that go into different places

- Fundamental rule of thumb is to put things together than change together
- Data and the behavior that references that data usually change together, but there are exceptions
- When the exceptions occur, we move the behavior to keep changes in one place

###### Data Clumps

- Data items tend to be like children; they enjoy hanging around in group together
- Often you'll see the same 3 or 4 data items together in lots of places: fields in a couple of classes, parameters in many method signatures
- `Bunches of data that hang around together really ought to be made into their own object`
- The first tstep is to look for where the clumps appear in fields
- Use `Extract Class` on the fields to turn the clumps into an object
- Then turn your attention to method signatures using `Introduce Parameter Object` or `Preserve Whole Object` to slim them down
- The immediate benefit is that you can shrink a lot of parameter lists and simply method calling
- Don't worry about data clumps that use only some of the fields of the new object
- `As long as you are replacing two or more fields with the new object, you'll come out ahead`

- A good test is to consider deleting one of the data values
- If you did this, would the others make sense?
- If they don't, it's a sure sign that you have an object that needs to be created

- Reducing field lists and parameter lists will ceratinly remove a few bad practices, but one you have the objects, you get the opportunity to now use it
- You can now look for cases of feature envy, which will suggest behavior that can be moved into your new classes

###### Primitive Obsession

- Most programming enviroments have two kidns of data
- Record types allow you to structure data into meaningful groups
- Primitive types are your building blocks
- Records carry overhead
- They may mean new tables in a database, or they may be awkward to create when you want them for only one or two things

- One of the value things about objects is that they blur or even break the line between primitive and larger classes
- You can write little classes that are indistringuishable from the built-in types of the language
- Java does have primitives for numbers, but strings and datese (which are primitives in many other enviroments) are classes

- People new to objects are usually reluctant to use small objects for small tasks
    * Like money classes that combine number and currency
    * Ranges with an upper and a lower
    * Special strings such as telephone numbers and zip codes
- You can use `Replace Data Value with Object` on individual data values
- If the data value is a type code, use `Replace Type Code with Class` if the value does not affect behavior
- If you have conditionals that depend on the type code, use `Replace Type Code with Subclasses` or `Replace Type Code with State/Strategy`

- If you have a group of fields that should go together, use `Extract Class`
- If you see these primitives in parameter lists, try `Introduce Parameter Object`
- If you find yourself picking apart an array, use `Replace Array with Object`


###### Switch Statement

- One of the most obvious symptoms of oo code is its comparative lack of switch (or case) statments
- Problem with switch statements is essentially that of duplication
- Often you find the same switch statement scattered about a program in different places
- If you add a new clause to the swithc, you have to find all these switch stattements and change them
- The oo notion of polymorphism gives you an elegant way to deal with this problem

- Most times when you see a switch statement you should consider polymorphism
- The issue is where the polymorphism should occur
- Often the switch statement switches on a type code
- You want the method or class the type value code
- So you `Extract Method` to extract the switch statement and then `Move Method` to get it into the class where the polymorphism is needed
- At that point oyu have to decide whether `Replace Type Code with Subclasses` or `Replace Type Code with State/Strategy`
- When you have set up the inheritance structure, you can use `Replace Conditional with Polymorphism`

- If you only have a few cases that affect a single method, and you don't expect them to change, then polymorphism is overkill
- In this case use `Replace Parameter with Explicit Methods` is a good option
- If one of your conditional cases is a null, try `Introduce Null Object`

###### Lazy Class
- A class that isn't doing enough to pay for itself should be eliminated
- Often this might be a class that used to pay its way but has been downsized with refactoring
- Or it might be a class that was added b/c of changes that were planned but not made
- Either way, let the class die
- Try to use `Collapse Hierarchy`
- Nearly useless components should be subject to `Inline Class`

###### Speculative Generality

- This happens when people say `Oh, I think we need the ability to do this kind of things somebody` and thus wants all sorts of hooks and special cases to handle things that aren't required
- The result is often harder to understand and maintain
- If all this were being used, it would be worth it
- But if it isn't, it isn't
- The structure gets in the way, so get rid of it

- If you have abstract classes that aren't doing much, use `Collapse hierarchy`
- Unnecessary delegation can be removed with `Inline Class`
- Methods with unused parameters sould be subject to `Remove Parameter`
- Methods with odd abstract names should be renamed with `Rename Method`

- Speculative generality can be spotted when the only users of a method or class are test cases
- If you find such a method or class, delete it and the test case that exercises it
- If you have a method or class that is a helper for a test case that exercises legitimate functionality, you have to leave it in

###### Temporary Field

- Sometimes you see an object in which an instance variable is set only in certain circumstances
- Such code is difficult to understand, b/c you expect an object to need all of its variables
- Trying to understand why a variaable is there when it doesn't seem to be used leads to problems for the reader

- Use `Extract Class` to make a place for these temp variables
- Put all the code that concerns the variables into the component
- Also may be able to eliminate conditonal code by using `Introduce Null Object` to create an alternative component for when the variables aren't valid

- A common case of temporary field occurs when a complicated algorithm needs several variables
- B/c the implementer didn't want to pass around a huge parameter list, he put them in fields
- But the fields are only valid during the algorithm; in other contexts they are confusing
- In this case you can use `Extract Class` with these variables and the methods that require them
- The new object is a `method object`

###### Message Chains

- You see message chains when a client asks one object for another object, which the client then asks for yet another object, which the client then asks for yet another object, and so on
- You may see this as a long line of getThis methods, or as a sequence of temps
- Navigating this way means the client is coupled to the structure of navigation
- Any change to the intermediate relationships causes the client to have to change

- The move to use here is `Hide Delegate`
- You can do this at various points in the chain
- In principle you can do this to every object in the chain, but doing this often turns every intermediate object into a middle man
- Often a better alternative is to see what the resulting object is being used for
- See whether you can use `Extract Method` to take a piece of code that uses it and then `Move Method` to push it down the chain
- If several clients of one of the objects in the chain want to navigate the rest of the way, add a method to do that

- Use method chaining (at most) in moderation

###### Middle Man

- One of the prime features of objects is encapsulation - hiding internal details from the rest of the world
- Encapsulation often comes with delegation
    * You can ask a direction whether she is free for a meeting; she delegates the message to her planner and gives you an answer
    * There is no need to know whether the direction uses a planner, electronic device, or a secretary to keep track of her appointments

- This can go too far
- You look at a class's interface and find half the methods are delegating to this other class
- After a while it is time to use `Remove Middle Man` and talk to the object that really knows what's going on
- If only a few methods aren't doing much, use `Inline Method` to inline them into the caller
- If there is additional behavior, you can use `Replace Delegation with Inheritance` to turn the middle man into a subclass of the real object
- That allows you to extend behavior w/o chasing all of that delegation

###### Inappropriate Intimacy

- Sometimes classes become far too intimate and spend too much time delving in each other's details
- Classes should follow strict rules

- Overintimate classes need to be broken up
- Use `Move Method` and `Move Field` to separate the pieces to reduce the intimacy
- See whether you can arrange a `Change Bidirectional Association to Unidirectional
- If classes do nto have common interests, use `Extract Class` to put the commonality in a safe place and make honest classes of them
- Or use `Hide Delegate` to let another class act as go-between

- Inheritance often leads to overintitimacy
- Subclasses are always going to know more about their parents than their parents would like them to know
- If it's time to leave home, apply `Replace Delegation with Inheritance`

###### Alternative Classes with Different Interfaces

- Use `Rename Method` on any methods that do the same thing but have different signatures for what they do
- Often this doesn't go far enough
- In these cases the classes aren't yet doing enough
- Keep using `Move Method` to move behavior to the classes until the protcols are the same
- If you have to redundantly move code to accomplish this, you may be able to use `Extract Superclass` to atone

###### Incomplete Library Class

- Reuse is often touted as the purpose of objects
- Think reuse is overrated
- Much of programming skill is based on library classes so that nobody can tell whether we've forgotten our sort algorithms

- Builders of library classes are not omniscient
- Library builders have a really tough jon
- The trouble is that it is often bad form, and usually impossible, to modify a library class to do something you'd like it to do
- Usual tatics won't work

- Couple of special-purpose tools for this
- If there are just a couple of methods that you wish the library class had, use `Introduce Foreign Method`
- If there is a whole load of extra behavior, you need `Introduce Local Extension`

###### Data Classes

- These are classes that have fields, getting and setting methods for the fields, and nothing else
- Such classes are dumb data holders and are almost certainly being manipulated in far too much detail by other classes
- In early stages these classes may have pubic fields
- If so, you should immediately apply `Encapsulate Method` before anyone notices
- If you have collection fields, check to se whether they are properly encapsulated and apply `Encapsulate Collection` if they aren't
- Use `Remove Setting Method` on any field that should not change

- Look for where these getting and setting methods are used by other classes
- Try to use `Move Method` to move behavior into the data class
- If you can't move the whole method, use `Extract Method` to create a method that can be moved
- After awhile you can start using `Hide Method` on the getters and setters

- Data classes are like children
- They are okay as a starting point, but to participate as a grown up object, they need to take some responsibility

###### Refused Bequest

- Subclasses get to inherit the methods and data of their parents
- But what if they don't want or need what they are given

- The traditional story is that this means the hierarchy is wrong
- You need to create a new sibling class and use `Push Down Method` and `Push Down Field` to push all unused methods to the sibiling
- That way the parent holds only what is common
- Often you'll hear advice that all superclasses should be abstract

- This isn't advisable all of the time
- Do subclassing to reuse a bit of behavior all the time, and this works fine
- So if the refused bequest is causing confusion and problems, follow the traditional advice
- However, you don't have to do this all of the time
- 9 times out of 10 this isn't worth fixing

- The refused bequest is much worse if the subclass is reusing behavior but does not want to support the interface of the superclass
- In this case, don't fiddle with the hierarchy; you'll want to gut it by applying `Replace Inheritance with Delegation`

###### Comments

- Not saying people shouldn't write comments
- They do usually point to code that needs to be refactored
- You often look at thickly commented code and notice that the code is bad

- Comments lead us to bad code that has all of the things discussed previously
- First action is to remove the need for a comment by refactoring the problem
- When you're finished, you often fnd that comments are superfluous

- If you need a comment to explain what a block of code does, try `Extract Method`
- If the code is already extracted but you still need a comment to explain what it does, use `Rename Method`
- If you need to state some rules about the required state of the system, use `Introduce Assertion`

Tip
```
When you feel the need to write a comment, first try to refactor the code so that any comment becomes superfluous
```

- A good time to use a comment is when you don't know what to do
- In additon to describing what is going on, comments can indicate areas in which you aren't sure
- A comment is a good place to say `why` you did something
- This kind of information helps future modifiers