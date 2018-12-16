#### Moving Features Between Objects

- On of the most fundamental decision in object design is deciding where to put responsibilites
- Usually you don't get it right the first tie
- That is okay because you can use refactoring to change your mind in these cases

- Often you can simply use `Move Method` or `Move Field` to move behavior arund
- If you need to use both, prefer to use `Move Field` first and then `Move Method`

- Often classes become bloated w/ too many responsibilites
- In this case use `Extact Class` to separate some of the responsibilites
- If a class becomes too irresponsible, use `Inline Class` to merge it into another class
- If another class is being used, it is often helpful to hide this fact with `Hide Delegate`
- Sometimes hiding the delegate class results in constantly changing the owner's interface, in which case you need to use `Remove Middle Man`

- `Introduce Foreign Method` and `Introduce Local Extension` are special cases
- Only use these when not able to access the source code of a class, yet want to move responsibilites to this unchangeable class
