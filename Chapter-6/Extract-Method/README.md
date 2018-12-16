###### Extract Method

- You have a code fragement that can be grouped together

```
Turn the fragment into a method whose name explains the purpose of the method
```

Original
```
void printOwing(double  amount)  {
      printBanner();
      //print  details
      System.out.println  ("name:"  +  _name);
      System.out.println  ("amount"  +  amount);
}
```

Into
```

void  printOwing(double  amount)  {
      printBanner();
      printDetails(amount);
}

void  printDetails  (double  amount)  {
      System.out.println  ("name:"  +  _name);
      System.out.println  ("amount"  +  amount);
}
```

######## Motivation

- One of the most common refactorings
- Look at a method that is too long or look at code that needs a comment to understand its purpose
- Then turn that fragment of code into its own method

- Author prefers short, well-named methods for several reasons
    * Increases chances that other methods can use a method when the method is finely grained
    * Allows the higher-level methods to read more like a series of comments
    * Overriding also is easier when the methods are finely grained

- Small methods really work only when you have good names, `so you need to pay attention to the naming`
- If extracting improves clarity, do it, even if the name is longer than you code you have extracted

######## Mechanics

- Create a new method, and name it after the intention of the method - `name it by what it does, not by how it does it`

```
If the code you want to extract is very simple, such as a single message or a function call, you should extract it if the name of the new method will reveal the intention of the code in a better way. If you can't come up with a more meaningful name, don't extract the code
```

* Copy the extracted code from the source method into the new target method
* Scan the extracted code for references to any variables that are local in scope to the soure method. These are local variables and parameters to the method
* See whether any temporary variables are used only within the extracted code. If so, declare them in the target method as temporary variables
* Look to see whether any of these local-scope variables are modified by the extracted code. If one variable is modified, see whether you can treat the extracted code as a query and assign the result to the variable concerned
    * If this is awkward, or there is more than one such variable, you can't extract the method as it stands
    * You may need to use `Split Temporary Variable` and try again
    * You can eliminate temporary variables with `Replace Temp with Query`
    * Pass into the target method as parameters local-scope variables that are read from the extracted code
    * Replace the extracted code in the source method with a call to the target method

```
If you have moved any temp variables over to the target method, look to see whether they were declared outside of the extracted code. If so, you can now remove the declaration
```

########## Example: No Local Variables

Take the following method

```
void  printOwing()  {

       Enumeration  e  =  _orders.elements();
       double  outstanding  =  0.0;

       //  print  banner
       System.out.println  ("**************************");
       System.out.println  ("*****  Customer  Owes  ******");
       System.out.println  ("**************************");

       //  calculate  outstanding
       while  (e.hasMoreElements())  {
           Order  each  =  (Order)  e.nextElement();
           outstanding  +=  each.getAmount();
       }
       //print  details
       System.out.println  ("name:"  +  _name);
       System.out.println  ("amount"  +  outstanding);
   }

```

- Easy to extract the code that prints the banner
- Cut, paste, and put in a call

```
void  printOwing()  {

       Enumeration  e  =  _orders.elements();
       double  outstanding  =  0.0;

       "printBanner();"

       //  calculate  outstanding
       while  (e.hasMoreElements())  {
           Order  each  =  (Order)  e.nextElement();
           outstanding  +=  each.getAmount();
       }

       //print  details

       System.out.println  ("name:"  +  _name);
       System.out.println  ("amount"  +  outstanding);
   }

   NEW METHOD 
   void  printBanner()  {
       //  print  banner
       System.out.println  ("**************************");
       System.out.println  ("*****  Customer  Owes  ******");
       System.out.println  ("**************************");
   }
```

########## Example: Using Local Variables

- Problem is local variables
- Parameters passed into the original method and temporaries declared within the original method
- Local variables are only in scope in that method, so these cause a little of extra work
- In some cases they prevent from doing refactoring at all

- Easiest case with local variablesis when the variables are read but not changed
- They can be passed in as parameters

Example
```
void  printOwing()  {

       Enumeration  e  =  _orders.elements();
       double  outstanding  =  0.0;

       printBanner();

       //  calculate  outstanding
       while  (e.hasMoreElements())  {
           Order  each  =  (Order)  e.nextElement();
           outstanding  +=  each.getAmount();
       }

       //print  details
       System.out.println  ("name:"  +  _name);
       System.out.println  ("amount"  +  outstanding);
   }
```

- Can extract the printing of details with a method that takes one parameter

```
void  printOwing()  {

       Enumeration  e  =  _orders.elements();
       double  outstanding  =  0.0;

       printBanner();

       //  calculate  outstanding
       while  (e.hasMoreElements())  {
           Order  each  =  (Order)  e.nextElement();
           outstanding  +=  each.getAmount();
       }

       "printDetails(outstanding);"
   }
```

```
void  printDetails  (double  outstanding)  {
       System.out.println  ("name:"  +  _name);
       System.out.println  ("amount"  +  outstanding);
}
```

- You can use this with as many local variables as you need
- The same is true if the local variable is an object and you invoke a modifying method on the variable
- Again, you can pass the object in as a parameter
- You only have to do something different if you actually assign to the local variable

########## Example: Reassigning a Local Variable

- It's the assignment to local variables that becomes complicated
- Only talking about temps in this case
    * If you see an assignment to a parameter, you should immediately use `Remove Assignment to Parameters`

- For temps that are assigned to, there are two cases
    * Simpler case is that in which the variable is a temporary variable used only within the extracted code
        - When that happens, you can move the temp into the extracted code
    * Other case is use of the variable outside of the code
        * If the variable is not used after code is extracted, you can make the change in just the extracted code
        * If it is used afterward, you need to make the extracted code return the changed value of the variable

Example
```
void  printOwing()  {

        Enumeration  e  =  _orders.elements();
        double  outstanding  =  0.0;

        printBanner();

        //  calculate  outstanding
        while  (e.hasMoreElements())  {
            Order  each  =  (Order)  e.nextElement();
            outstanding  +=  each.getAmount();
        }

        printDetails(outstanding);
    }

```

- Now extract the calculation

```
void  printOwing()  {
        printBanner();
        double  outstanding  =  getOutstanding();
        printDetails(outstanding);
    }

    double  getOutstanding()  {
        Enumeration  e  =  _orders.elements();
        double  outstanding  =  0.0;
        while  (e.hasMoreElements())  {
            Order  each  =  (Order)  e.nextElement();
            outstanding  +=  each.getAmount();
        }
        return  outstanding;
    }
```

- The `enumeration` value is used only in the extracted code, so it can be moved entirely within the new method
- The `outstanding` variable is used in both places, so need to return it from the extracted method

- Once tested, rename the returned value to follow usual convention
```
double  getOutstanding()  {
        Enumeration  e  =  _orders.elements();
        double  "result"  =  0.0;
        while  (e.hasMoreElements())  {
            Order  each  =  (Order)  e.nextElement();
            result  =  each.getAmount();
        }
        return  "result";
    }
```

- In this case, the `outstanding` variable is initialized only to an obvious initial value, so it can be initialized only within the extracted method
- If something more involved happens to the variable, have to pass in the previous value as a parameter
- Initial code for this variation might look like this

Another example
```
void  printOwing(double  previousAmount)  {

        Enumeration  e  =  _orders.elements();
        double  outstanding  =  previousAmount  *  1.2;
        printBanner();

        //  calculate  outstanding
        while  (e.hasMoreElements())  {
            Order  each  =  (Order)  e.nextElement();
            outstanding  +=  each.getAmount();
        }

        printDetails(outstanding);
    }
```

- In this case the extraction would look like this

```
void  printOwing(double  previousAmount)  {
        double  outstanding  =  previousAmount  *  1.2;
        printBanner();
        outstanding  =  getOutstanding(outstanding);
        printDetails(outstanding);
    }
```

```
double  getOutstanding(double  initialValue)  {
        double  result  =  initialValue;
        Enumeration  e  =  _orders.elements();
        while  (e.hasMoreElements())  {
            Order  each  =  (Order)  e.nextElement();
            result  +=  each.getAmount();
        }
        return  result;
}
```

- After testing, further clean it up to be

```
void  printOwing(double  previousAmount)  {
        printBanner();
        double  outstanding  =  getOutstanding(previousAmount  *  1.2);
        printDetails(outstanding);
    }
```

- What happens if more than one variable needs to be returned?
- Several options
- Best option usually is to pick different code to extract
- Prefer a method to return one value
- Try to arrange for multiple methods for the different values (if your language allows output parameters, you can use those. Author prefers to use single return values as much as possible)
- Temporary variables often are so plentiful that they make extraction very awkward
- In these cases try to reduce to the temps by using `Replace Temp with Query`
- If things are still awkward, resort to `Replace Method with Method Object`
- This refactoring doesn't care how many temps you have or what you do with them
