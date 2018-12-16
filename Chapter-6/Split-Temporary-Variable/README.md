#### Split Temporary Variable

- You have a temp avariable assigned to mroe than once, but is not a loop variable or a collection variable

- `Make a separate temporary variable for each assignment`

```
double temp = 2 * (_height + _width);
System.out.println(temp);
temp = _height * _width;
System.out.println(temp);
```

- Change this into

```
final double perimeter = 2 * (_height + _width);
System.out.println(perimeter);
final double area = _height * _width;
System.out.println(area);
```

###### Motivation

- Temporary variables are made for various uses
- Some of these uses naturally lead to the temp's being assigned to several times
- Loop variables change for each run around the loop (such as the i in a for loop)
- `Collecting temp variables` collect together some value that is built up during the method

- Many other temps are used to hold the result of a long-winded bit of code for easy reference later
- These kinds of variables should be set only once
- `That they are set more than once is a sign that they have more than one responsibility within the method`
- `Using a temp for two things is very confusing for the reader`

###### Mechanics

- Change the name of a temp at its declaration and its first assignment
    * If the later assignments are of the form `i = i + some expression`, that indicates that it is a collection temp variable, so don't split it
    * The operator for collecting temporary variable usually is addition, string concatentation, writing to a stream, or adding to a collection
- Declare the new temp as final
- Change all references of the temp up to its second assignment
- Test
- Repeat in stages, each stage renaming at the declaration, and changing references until the next assignment

###### Example

- Computing the distance travelled by a haggis
- From a standing start, a haggis experiences an initial force
- After a deplayed period, a secondary force kicks in to further accelerate the haggis
- Using the common laws of motion, you can compute the distance traveled as follows:

```
double getDistanceTravelled (int time) {
    double result;
    double acc = _primaryForce / _mass;
    int primaryTime = Math.min(time, _delay);
    result = 0.5 * acc * primaryTime * primaryTime;
    int secondaryTime = time - _delay;

    if (secondaryTime > 0) {
        double primaryVel = acc * _delay;
        acc = (_primaryForce + _secondaryForce) / _mass;
        result += primaryVel * secondaryTime + 0.5 * acc * secondaryTime * secondaryTime;
    }
    return result;
}
```

- Awkward function
- Interesting thing is the way the variable `acc` is set twice
- It has two responsibilites:
    1. To hold the initial acceleration cause by the first force
    2. Another later to hold the acceleration with both forces
- Want to split this

```
double getDistanceTravelled (int time) {
    double result;
    final double primaryAcc = _primaryForce / _mass;
    int primaryTime = Math.min(time, _delay);
    result = 0.5 * primaryAcc * primaryTime * primaryTime;
    int secondaryTime = time - _delay;

    if (secondaryTime > 0) {
        double primaryVel = primaryAcc * _delay;
        double acc = (_primaryForce + _secondaryForce) / _mass;
        result += primaryVel * secondaryTime + 0.5 * acc * secondaryTime * secondaryTime;
    }
    return result;
}
```

- Choose the new name to represent only the first use of the temp
- Make it final to ensure it is only set once
- Can then declare the original temp at its second assignment
- Test

- Continue on w/ the second assignment of the temp
- Removes the original temp name completely, replacing it with a new temp named for the second one

```
double getDistanceTravelled (int time) {
    double result;
    final double primaryAcc = _primaryForce / _mass;
    int primaryTime = Math.min(time, _delay);
    result = 0.5 * primaryAcc * primaryTime * primaryTime;
    int secondaryTime = time - _delay;

    if (secondaryTime > 0) {
        double primaryVel = primaryAcc * _delay;
        final double secondaryAccc = (_primaryForce + _secondaryForce) / _mass;
        result += primaryVel * secondaryTime + 0.5 * secondaryAcc * secondaryTime * secondaryTime;
    }
    return result;
}
```