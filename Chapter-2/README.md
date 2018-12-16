#### Principles of Refactoring

######## Defining Refactoring

- `Refactoring` has two definitions depending on context

- First definition is the noun form
```
A change made to the internal structure of software to make it easier to understand and cheaper to modify without changing its observable behavior
```

- Refactoring is usually a small change to the software, `although one refactoring can involve others`

- Other usage of `refactoring` is the verb form

```
To restructure software to apply a series of refactorings without changing its observable behavior
```

- Might spend a few hours refactoring, during which you might apply a couple of dozen of individual refactorings

- `Is refactoring just cleaning up code`?
- In a way yes, but refactoring goes further b/c it provides a technique for cleaning up code in a more efficient and controlled manner
- Knowing how to refactor efficiently will lead to writing cleaner code overall
- Will know which refactorings to use, know how to use them in a manner that minimizes bugs, and test at every possible opportunity

- Purpose of refactoring is to make the software easier to understand and modify
- `Only changes made to make the software easier to understand are refactorings`
- A good contrast to this is performance optimization
    * Like refactoring, performance optimization does not usually change the behavior of a component (other than its speed); it only alters the internal structure
- However, the purpose is different
- Performance optimization often makes code harder to understand, but you need to do it to get the performance you need

- Refactoring does not change the observable behavior of the system
- Software stll carries out the same function as it did before
- Any user cannot tell that things have changed

######## The Two Hats

- When you use refactoring to develop software, you divide your time btwn two distinct activities; adding function and refactoring
- `When you add function, you shouldn't be changing existing code; you are just adding new capabilities`
- Can measure progress by adding tests and getting the tests to work
- `When you refactor, you make a point of not adding function; you only restructure the code`
- You don't add any tests (unless you find a case you missed earlier) - you only change tests when you absolutely need to

###### Why Should You Refactor?

- Refactoring is not the cure for all software ills - not a `silver bullet`
- It is a very valuable tool

######## Refactoring Improves the Design of Software

- Without refactoring, the design of the program will decay
- As people change code - changes to relaize short-term goals or changes made w/o a full comprehension of the code - the code loses its structure
- Becomes harder to see the design by reading the code
- Refactoring is like tidying up the code
- Work is done to remove bits that aren't reall yin the right place
- Loss of the structure of code has a cumulative effect
- The harder it is to see the design in the code, the harder it is to preserve it, and the more rapidly it decays
- Refactoring helps code retain its shape

- Poorly designed code usually takes more code to do the same thing, often b/c the code quite literally does the same thing in several places
- Important aspect of improving design is to eliminate duplicate code
- Reducing the amount of code won't make the system run any faster, b/c the effect on the footprint of the programs is rarely significant
- Reducing amount of code does, however, make a big difference in modification of the code
- The more code there is, the harder it is to modify correctly
- There's more code to understand
- You change this bit of code here, but the system doesn't do what you expect b/c you didn't change that bit over there that does much the same thing in a slightly different context
- By eliminating duplicates, you ensure that the code says everything once and only once, which is the essence of good design

######## Refactoring Makes Software Easier to Understand

- Programming is like a conversation with a computer
- You write code that tells the computer what to do, and it responds by doing exactly what you tell it
- `Programming in this mode is all about saying exactly what you want`
- But there is another user of your source code
- Someone will try to read your code in a few months time to make some changes
- It doesn't matter if the computer takes a few more cycles to do something (like compile)
- It does matter if it takes a programmer a week to make a change that would have taken only an hour if she had understood your code

- Trouble is that when you are trying to get your program to work, you are not thinking about that future developer
- Takes a change of rhythm to make changes that make the code easier to understand
- Refactoring helps you to make your code more reusable
- When refactoring you have code that works but is not ideally structured
- `Programming in this mode is all about saying exactly what you mean`

- Often future developer is yourself trying to make a change

- Author uses refactoring to help himself understand unfamiliar code
- When looking at unfamiliar code, you have to understand what it does
- Look at a couple of lines, make mental note about what this code is doing
- Don't stop at this mental note
- Actually change the code to better reflect your new understanding and thne test

- Early on do refactoring like this on little details
- As code gets clearer, you will see things about the design that you could not see before
- Had code not been changed, you probably would never have seen these things
- `Wiping the dirt off a window so you can see beyond`
- Refactoring will lead you to higher levels of understanding that otherwise you would miss

###### Refactoring Helps You Find Bugs

- Help in understand the code also helps spot bugs
- If you work on refactoring the code, you understand deeply what the code does, and you put that new understand right back into the code
- By clarifying the strucuture of the program, can clarify certain assumptions that were made to the point where you can't avoid spotting the bugs
- Kent Beck - `I'm not a great programmer, I'm just a good programmer with great habits`
- Refactoring helps you be much more effective at writing robust code

######## Refactoring Helps You Program Faster

- `Refactoring helps you develop code more quickly`

- Good design is essential for rapid software development
- Whole point of having a good design is to allow rapid development
- W/o a good design, you can progress quickly for awhile, but soon the poor design starts to slow you down
- You spend more time find and fixing bugs instead of adding new functionality

- Good design is essential to maintaining speed in software development
- Refactoring helps you do this because it stops the design of the system from decaying
- It can even improve design

###### When Should You Refactor?

- In most cases, don't want to set aside specific time for refactoring
- It is not an activity you set aside time to do
- Refactoring is something you do all the time in little bursts
- You refactor b/c you want to do something else and refactoring else you do that other thing

######## The Rule of Three

- The first time you do something, just do it
- The second time you do something similar, you wince at the duplicaiton, but you do the duplicate anyway
- The 3rd time you do something similar, you refactor

```
Three strikes and you refactor
```

######## Refactor When You Add Function

- Most common time to refactor is when you want to add a new feature to some software
- Often the first reason to refactor here is to help yourself understand the code you need to modify
- If you have to think to understand what the code is doing, ask yourself if you can refactor the code to make that understanding more immediately apparent
    * Then refactor it
- Partly for the next time you pass by here, but mostly it's because you can understand more things if you clarify the code as you're going along

- Other driver of refactoring is a design that does not hlep you add a new feature easily
- Don't worry about this - fix it by refactoring
- Refactoring is a quick and smooth process
- Once the refactoring is finished, adding the feature can go much more quickly and smoothly

######## Refacttor When You Need to Fix a Bug

- In fixing bugs, much of the use of refactoring comes from making the code more understandable
- As you look at the code trying to understand it, refactor to help improve you're understanding
- If you get a bug report, it's a sign you need refactoring, because the code was not clear enough for you to see there was a bug

######## Refactor As You Do a Code Review

- Very important in writing clean code
- Code may look clear to you but not your team
- It's very hard for people to put themselves in the shoes of someone unfamiliar with thie things they are working on
- Reviews also give the opportunity for more people to suggest useful ideas

- Refactoring helps review someone else's code
- Knowing how to refactor effectively helps you come up with more ideas to improve other people's code during code reviews

- Refactoring helps the code review have more concrete results
- You end up with much more of a sense of accomplishment from the exercise

- With larger design reviews, better to use UML diagrams and walking through scenarios with CRC cards
- Do design reviews with groups and code reviews with individuals

- This idea is taken to the extreme with the Extreme Programming practice of Pair Programming
- All serious development is done with two developers at one machine
- It's basically a continious code review folded into the dev process
- The refactoring that takes place is folded in as well

######## Why Refactoring works - Kent Beck

- Programs have two kins of value
    * What they can do for you today
    * What they can do for you tomorrow
- Most times when programming, you are focused on today
- We are making today's program more valuable by making it more capable

- `If you can get today's work done today, but you do it in such a way that you can't possible get tomorrow's work done tomorrow, then you lose`
- Notice though, that you know what you need to do today, but you're not quite sure about tomorrow

- You know enough to do today's work, you don't know enough to do tomorrow's
- But if you only work for today, you won't be able to work tomorrow at all

- `Refactoring is one way out of this bind`
- When you find that yesterday's decision doesn't make sense today, you change the decision
- Now you can do today's work
- Tomorrow, some of your understanding as of today will seem naive, so you'll change that, too

- What is it that makes programs hard to work with
- Four top things
    * Programs that are hard to read are hard to modify
    * Programs that have duplicated logic are hard to modify
    * Programs that require additional behavior that requires you to change running code are hard to modify
    * Programs with complex conditional logic are hard to modify

- We want programs that are easy to read, that have all logic specific in one and only one place, that do not allow changes to endanger existing behavior, and that allow conditional logic to be expressed as simply as possible

- Refactoring is the process of taking a running program and adding to its value, not by changing its behavior but by giving it more of these qualities that enable us to continue developing at speed

###### What Do I Tell My Manager?

- If the manager is genuinely quality oriented, then the thing to stress is the quality aspects
- Here using refactoring in the review process is a good way to work things
- Tons of studies show that technical reviews are an important way to reduce bugs and thus speed up development

- If manager are more driven by schedule
- Refactoring is a big aid in building software quickly
- If you need to add a new function and the design does not suit the change, it's quicker to refactor first and then add the function
- If you need to fix a bug, you need to understand how the software works - refactoring is the fastest way to do this
- A schedule-driven manager wants you to do things the fastest way you can, and that fastest way is refactoring

######## Indirection and Refactoring - Kent Beck

- Given software engineers' infatuation with indirection, it may not surprise you to learn that most refactoring introduces more indirection into a program
- Refactoring tends to break big objects into several smaller ones and big methods into several smaller ones

- Indirection is a double edged sword
- Every time you break one thing into two pieces, you have more things to manage
- It also can make a program harder to read as an object delegates to an object delegating to an object
- So you'd like to minimize indirection

- Not so fast
- Indirection can pay for itself by:
    * Enabling sharing of logic
        - For example, a submethod invoked in two different places or a method in a superclass shared by all subclasses
    * To explain intention and implementation separately
        - Choosing the name of each class and the name of each method gives you an opportunity to explain what you intend
        - The internals of the class or method explain how the intention is realized
        - If the internals also are written in terms of intention in yet smaller pieces, you can write code that communicates most of the important information about its own structure
    * To isolate change
        - You use an object in two different places
        - You want to change behavior in one of two cases
        - If you change the object, you risk changing both
        - So first you make a subclass and refer to it in the case that is changing
        - Now you can modify the subclass w/o risking an inadvertent change to the other case
    * To encode conditional logic
        - Objects have a great mechanism, polymorphic messages, to flexibly but clearly express conditional logic
        - By changing explicit conditionals to messages, you can often reduce duplication, add clarity, and increase flexibility all at the same time

- The game of refactoring:
    * Maintaining the current behavior of the system, how can you make your system more valuable, either by increasing its quality or reducing its cost?

- The most common variant of the game is to look at your program
- Identify a plae where it is missing one or more benefits of indirection
- Put in that indirection w/o changing the existing behavior
- Now you have a more valuable program b/c it has more qualities that we will appreciate tomorrow

- Contrast this with careful upfront design
- Speculative design is an attempt to put all the good qualities into the system before any code is written
- Then the code can just be hung onto the sturdy skeleton
- The problem with this process is that it is too easy to guess wrong
- With refactorign, you are never in danger o fbeing completely wrong
- The program always behaves at the end as it did in the beginning
- In addition, you have the opportunity to add valuable qualities to the code

- There is a second, rarer refactoring game
- Identify indirection that isn't paying for itself and take it out
- `Often this takes the form of intermediate methods that used to serve a purpose but no longer do`
- Or it could be a component that you expected to be shared or polymorphic but turned out to be used in only one place
- When you find parasitic indirection, take it out
- You will find a more valuable program

###### Problems with Refactoring

- When you learn a new technique that greatly improves your productivity, it is hard to see when it does not apply
- Usually you learn it within a specific context, often just a single project
- It is hard to see what causes the technique to be less effective, even harmful

- Author example
- 10 years ago it was like that with objects
- If someone asked author when not to use objects, it was hard to answer
- It wasn't that author didn't think objects had limitations - it was just that author didn't know what those limitations were, although author knew what the benefits were

- Refactoring is like that now
- We know benefits of refactoring
- They can make a palpable difference to our work
- But haven't had enough broad experience to see where the limitations apply

- Try refactoring for the real gains it can provide
- You should also monitor its progress

######## Databases

- Problem area for refactoring
- Most business apps are tightly coupled to the database schema that supports them
- That's one reason that the database is difficult to change
- Another reason is database migration
- Even if you have carefully layered your ssytem to minimize the dependencies btwn the database schema and the object model, changing the database schema forces you to migrate the data, which can be a hard task

- With nonobject databases a way to deal with this problem is to place a separate layer of software btwn your object model and your database model
- That way you can isolate changes to the two different models
- As you update one model, you don't need to update the other
- You just need to update the intermediate layer
- Such a layer adds complexity but gives you a lot of flexbility
- Even w/o refactoring it is very important in situations in which you have multiple databases or a complex database model that you don't have control over

- Object databases both help and hinder

######## Changing Interfaces

- One of the most important thing about objects is that they allow you to change the implementation of a software module separately from changing the interface
- You can safely change the internals of an object w/o any else worrying about it, but the interface is important - change that and anything can happen

- Something that is distrubing about refactoring is that many of the refactorings do change an interface
- Something as simple as `Rename Method` is all about changing an interface
- So what does this do to the treasured notion of encapsulation?

- `There is no problem changing a method name if you have access to all the code that calls that method`
- Even if the method is public, as long as you can reach and change all the callers, you can rename the method
- There is a problem only if the interface is being used by code that you cannot find and change
- When this happens, the interface becomes a `published interface` (a step beyond a public interface)
- Once you publish an interface, you can no longer safely change it and just edit the callers
- You need a somewhat more complicated process

- This changes the question
- Now the problem is: `What do you do about refactorings that change published interfaces`

- `In short, if a refactoring changes a published interface, you have to retain both the old interface and the new one, at least until your users have had a change to react to the change`
- Try to do this so that the old interface calls the new interface
- In this way when you change the new of a method, keep the old one, and just let it call the new one
- Don't copy the method body - that keeps you down the path of duplicated code
- Mark your code as deprecated so that your callers will know that something is up

- There is an alternative: don't publish the interface
- Not talking about a total ban, clearly you have to have published interfaces
- Using published interfaces is useful, but it comes with a cost
- So don't publish interfaces unless you really need to
- This may mean modifying your code ownership rules to allow people to change other people's code in order to support an interface change
- Often it is a good idea to do this with pair programming

Tip
```
Don't publish interfaces prematurely. Modify your code ownership policies to smooth refactoring
```

######## Design Changes That Are Difficult to Refactor

- Can you refactor your way out of any design mistake, or are some design decisions so central that you cannot count on refactoring to change your mind later?
- `This is an area in which we have very incomplete data`
- There are certainly times we are surprised when we can refactor efficiently, but there are places where it is difficult

- At this stage, imagine the refactoring
- `As you consider design alternatives, ask yourself how difficult it would be to refactor from one design to another`
- If it seems easy, don't worry too much about the choice and pick the simplest design, even if it does not cover all potential requirements
- However, if you cannot see a simple way to refactor, then put more effort into the design
    * Author finds that such situatiosn are in the minority

######## When Shouldn't You Refactor

- There are times when you shouldn't refactor at all
- The principle example is when you should rewrite from scratch instead
- There are times when the existing code is such a mess that although you could refctor it, it would be easier to start from the beginning
- This is not an easy decision to make

- A clear sign of the need to rewrite is when the current code just does not work
- You may discover this only by testing and discovering the code is so full of bugs that you cannot stabilize it
- Code has to mostly work before you can refactor it

- A compromise route is to refactor a large piece of software into components with strong encapsulation
- Then you can make a refactor a large piece of software into components with strong encapsulation
- Then you can make a refactor-versus-rebuild decision for one component at a time
- This is a promising approach but no hard rules
- With a key legacy system, this would be an appealing direction to take

- The other time you should avoid refactoring is when you are close to a deadline
- At that point the productivity gain from refactoring would appear after the deadline and thus be too late

- Unfinished refactoring is like going into debt
- Most companies need debt in order to function efficiently
- However, with debt comes interest payments, that is, extra cost of maintenance and extension caused by overly complex code
- You can bear some interest payments, but if the payments become too great, you will be overwhelmed
- It is important to manage your debt, paying parts of it off by means of refactoring

- Other than when you are very close to a deadline, you should not put off refactoring because you haven't got time
- Refactoring results in increased productivity
- Not have enough time usually is a sign that you need to do some refactoring

###### Refactoring and Design

- Refactoring has a special role as a complement to design
- When author first started to program, he just wrote the program and muddled his way through it
- In time you start thinking about the design in advance which helps avoid costly rework
- You get more into a style of `upfront design`
- Many people consider design to be the key piece and programming just mechanics
- The analogy is design in an engineering drawing and code is the construction work
- But software is very different from physical machines, it is much more malleable, and it is all about thinking
- `With design I can think very fast, but my thinking is full of little holes`

- One argument is that refactoring can be an alternative to upfront design
- In this scenario you don't do any design at all
- You just code the first approach that comes into your head, get it working, and then refactor it into shape
- This approach can work

- Although doing only refactoring does work, it is not the most efficient way to work
- It is worth it to do some upfront design
- The point is that refactoring changes the role of upfront design
- If you don't refactor, there is a lot of pressure in getting that upfront design right
- The sense is that any changes in the design later are going to be expensive
- Thus you put more time and effort into the upfront design to avoid the need for such changes

- With refactoring, emphasis changes
- You still do upfront design, but now you don't try to find `the` solution
- `Instead all you want is a reasonable solution`
- You know as you build the solution, as you understand more about the problem, you realize that the best solution is different from the one you originally came up with
- With refactoring this is not a problem, for it is no longer expensive to make the changes

- An important result of this change in emphasis is a greater movement toward simplicity of design
- Author example
- Before I used refactoring, I always looked for flexible solutions
- With any requirement I would wonder how that requirement would change during the life of the system
- Because design changes were expensive, I would look to build a design that would stand up to the changes I could forsee

- The problem with building a flexible solution is that flexibility costs
- Flexible solutions are more complex than simple ones
- The resulting software is more difficult to maintain, but it is easier to flex in the direction you had in mind
- For one or two aspects, this is no big deal, but changes occur throughout the system
- Building flexibility in all these places makes the overall system a lot more complex and expensive to maintain
- The big frustration is that all this flexibility is not needed
- `Some of it is, but it's impossible to predict which pieces those are`
- To gain flexibility you are forced to ut in a lot more flexibility than you actually need

- With refactoring you approach the risks of change differently
- You still think about potentialchanges, you still consider flexible solutions
- But instead of implementing these flexible solutions you ask yourself `How difficult is it going to be to refactor a simple solution into the flexible solution?`
- If (as it happens most time) the answer is "pretty easy" then just implement the simple solution

- Refactoring can lead to simpler designs w/o sacrificing flexibility
- This makes the design process easier and less stressful
- Once you have a broad sense of things that refactor easily, you don't even think of the flexible solutions
- You have the confidence to refactor if the time comes
- You build the simplest thing that can possible work
- As for the flexible, complex design, most of the time you aren't going to need it

######## Refactoring and Performance

- A common conern with refactoring is the effect is has on the performance of a program
- To make the software easier to understand, you often make changes that will cause the program to run more slowly
- This is an important issue
- Software has been rejected for being too slow, and faster machines merely move the goalposts
- Refactoring certaiinly will make software go more slowly, but it also makes software more amendable to performance tuning
- The secret to fast software (in all but hard real-time contexts) is to write tunable software first and then tune it for sufficient speed

- Three general approaches to writing fast software
- Most series of these is time budgeting, used often in hard real-time systems
- In this situation, as you decompose the design you give each component a budget for resources - time and footprint
- Such a mechanism focuses hard attention on hard performance times
- It is essential for systems such as heart pacemakers, in which late data is always bad data
- This technique is overkill for other kinds of systems, such as corporate information systems

- Second approach is the constant attention approach
- With this approach every programmer, all the time, does whatever he/she can to keep performance high
- Common approach and has intuitive attraction, but it does not work very well
- Changes that improve performance usually make the program harder to work with
- This slows development