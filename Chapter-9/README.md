#### Chapter 9  Simplifying Conditional Expressions

- Conditional logic has a way of getting tricky
- Number of refactorings you can use to simplify it
- Core refactoring here is `Decompose Conditional` which entails breaking a conditional into pieces
- It is important because it separates the switching logic from the details of what happens

- Other refactorings in this chapter involve other important cases
- Use `Consolidate Conditional Expression` when you have several tests and all have the safe effect
- Use `Consolidate Duplicate Conditional Fragments` to remove any duplication within the conditional code

- If you are working with code developed in a one exit point mentaility, you often find control flags that allow the conditions to work with this rule
- Author doesn't follow the rule about one exit point from a method
- Author uses `Replace Nested Conditional with Guard Clauses` to remove any duplication within the conditionals code and `Remove Control Flag` to get rid of the awkward control flags

- Object-oriented programs often have less conditional behavior than procedural programs b/c much of that conditional behavior is handled by polymorphims
- Polymorphism is better b/c the caller does not need to know about the conditional behavior
    * Thus it is easier to extend the conditions
- OO programs rarely have switch (case) statements
- Any that show up are prime candidates for `Replace Conditional with Polymorphism`

- One of the most useful, but less obvious, uses of polymorphism is to use `Introduce Null Obejt` to remove checks for a null value
