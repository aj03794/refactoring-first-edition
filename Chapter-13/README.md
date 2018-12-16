#### Refactoring, Reuse, and Reality

####### Why Are Developers Reluctant to Refactor Their Programs?

- Suppose you are a software developer
- If your project is a fresh start (with no backward compatibility issues)and if you understand the problem your system is intended to solve and if your funder is willing to pay you until you are satisfied with the results, you are very fortunate
- The above scenario is not typical

- More than often you are asked to extend an existing piece of software
- You have a less-than-complete understanding of what you are doing
- Under schedule pressure to produe
- What can you do?
- You can rewrite the program
- You can leverage your designe experience and correct the ills of the past and be creative and have fun
- How can you be sure that the new system does everything the old system used to do?

- You can copy and modify parts of the existign system to extend its capabilities
- This may seem expedient and may even be viewed as a way to demonstrate reuse; you don't even have to understand what you are reusing
- Over time, errors propagate themselves, programs become bloated, program design becomes bloated, program design becomes corrupted, and incremental cost of change escalates

- Refactoring is a middle ground between the two extremes
- It is hard to restructure software to make design insights more explicit, to develop frameworks and extract reusable components, to clarify software architecture, and to prepare to make additions easier
- Refactoring can help you leverage your past investment, reduce duplication, and streamline a program

- Suppose as a developer you buy into these advantages
- You agree that dealing with change is one of the `essential complexities` of developing software
- You agree that in the abstract refactoring can provide the stated advantages

- Why might you still not refactor `your` programs? 4 possible reasons
    1. You might not understand how to refactor
    2. If the benefits are long-term, why exert the effort now? In the long tern, you might not be the project to reap the benefits
    3. Refactoring code is an overhead activity; you're paid to write new features
    4. Refactoring might break the existing program

- These are all valid concerns
- All must be addressed

###### Understanding How and Where to Refactor

- 