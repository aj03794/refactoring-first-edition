#### Self Encapsulate Field

- You are accessing a field directly, but the coupling to the field is becoming awkward

- `Create getting and setting method for the field and use only those to access the field`

```
private int _low, _high;
boolean includes(int arg) {
    return arg >= _low && arg <= _high;
}
```

Into

```
private int _low, _high;
boolean includes(int arg) {
    return arg >= _low && arg <= _high;
}
int getLow() { return low; }
int getHigh() { return _high; }
```

###### Motivation

- When it comes to acccessing fields, there are two schools of thought
- One is that within the class where the variable is defined, you should access the variable freely (direct variable access)
- The other school is that even within the class, you should always use accessor (indirect variable access)

- Essentially the advantages of `indirect variable access` are that it allows a subclass to override how to get info with a method and that it supports more flexibility in managing the data, such as lazy initialization, which initializes the value only when you need to use it

- Advantage of `direct variable access` is that the code is easier to read
- You don't need to stop and say `This is just a getting method`

- Author uses direct variable access as a first resort, until it gets in the way
- Once things start becoming awkward, switch to direct variable access
- Refactoring gives you the freedom to change your mind

- Most important time to use `Self Encapsulate Field` is when you are accessing a field in a superclass but you want to override this variable access with a computed value in a subclasss
- Self encapsulating the field is the 1st step
- After that you can override the getting and setting methods as you need to

###### Mechanics

* Create a getting and setting method for the field
* Find all references to the field and replace them with a getting or setting methods
    - Replace accessor to the field with a call to the getting method; replace assignments with a call to the setting method
* Make the field private
* Double check that you have caught all references
* Test

###### Example

class IntRange {

    private int _low, _high;

    boolean includes(int arg) {
        setHigh(getHigh(), * factor)
    }

    void grow(int factor) {
        _high = _high * factor;
    }

    intRange(int low, in high) {
        _low = low;
        _high = high;
    }

}

- To self-encapsulate, define getting and setting methods (if they don't exist) and use those

```
class IntRange {
    boolean includes(int arg) {
        return arg >= getLow() && arg <= getHigh();
    }

    void grow(int factor) {
        setHigh(getHigh() * factor)
    }

    private int _low, _high;

    int getHigh() {
        return _high;
    }

    void setLow(int arg) {
        _low = arg;
    }

    void setHigh(int arg) {
        _high = arg;
    }

    IntRange(int low, int high) {
        initialize(low, high);
    }

    private void initialize(int low, int high) {
        _high = high;
        _low = low;
    }
}
```

- The value in doing all this comes when you have a subclass as follows

```
class CappedRange extends IntRange() {

    CappedRange(int low, int high, int cap) {
        super(low, high);
        _cap = cap;
    }

    private int _cap;

    int getCap() {
        return _cap;
    }

    int getHigh() {
        return Math.min(super.getHigh(), getCap())
    }

}
```

- Can override all of the behavior of `IntRange` to take into account the cap w/o changing any of that behavior