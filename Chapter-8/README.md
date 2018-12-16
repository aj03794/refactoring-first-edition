#### Organizing Data
 
 - Discuss several refactorings that make working with data easier
- For many people `Self Encapsulate Field` seems unnecessary
- There has long been a debate about whether an object should access its own data directly or through accessor
- Sometimes you do need the accessor, and then you can get them with `Self Encapsulate Field`
- You can generally use direct access because it is simple to refactor this when you need it

- One of the useful things about the object languages is that they allow you to define new types that go beyond what can be done with simple data types of traditional languages
- Often you stat with a simple data value and then realize that an object would be more useful
- `Replace Data Value with Object` allows you to turn dumb data into articulate objects
- When you reazlie that these objects are instances that you will need in many parts of the program, you can use `Change Value to Reference` to make them into reference objects

- If you see an array acting as a data structure, you can make the data structure clearer with `Replace Array with Object`
- In all these cases the object is the first step
- Real advantage comes when you use `Move Method` to add behavior to the new objects

- Use `Replace Magic Number with Symbolic Constant` to get rid of magic numbers whenever you figure out what they are doing

- Links between objects can be 1 way or 2 way
- One way links are wasier but sometimes you need to `Change Unidirectional Assocation to Bidirectional` to support a new function
- `Change Bidirectional Association to Unidirectional` removes unnecessary complexity should you find you no longer need the two-way link anymore

- One of key tenets of oo programming is encapsulation
- If any public data is around, you can use `Encapsulate Field` to decorously cover it up
- If that data is a collection, use `Encapsulate Collection`
- If an entire record is available, use `Replace Record with Data Class`

- One form of data the rquires particular treatment is the type code; a special value that indicates sometnign particular about a type of a instance
- These often show up as enumerations, often implemented as static final integers
- If the codes are information and do not alter behavior of the class, you can use `Replace Type Code with Class` which gives you a better type checking and a platform for moving behavior later
- If the behavior of a class is affected by a type code, use `Replace Type Code with Subclasses` if possible
- If you can't do that, use the more complicated (but more flexible) `Replace Type Code with State/Strategy`