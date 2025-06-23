+++
date = '2025-03-31T19:06:51+03:00'
draft = false
title = 'The Easiest Way to Understand Expected Value'
tags = ['Math', 'Probability']
+++

So, as many concepts in probability theory, Expected Value is no different it's confusing at first and surprisingly intuitive at later times. 

In my case, it was the examples that was used by many textbooks to illustrate the idea of Expected Value, and they were all simillar and just confusing, the thing was I understood how to compute the value and solve some of the exercises, but problem was i coudnt reason beyond the examples and exrcises I was given, I coudnt just apply it to my life problems (by the way this is my definition of understanding:)), and I came across a very simillar example but with a very little different than i used to know before, okay, here is a puzzle for you!, 

*Imagine a fair 6-sided die is rolled 10,000 times. Each time the die lands on the number x, you will receive x dollars. For example, if the die lands on 2, you will receive 2 dollars, and so on. Roughly, how much money do you expect to make by playing this game?* 

rather than trying to answer this question by overthinking, lets just play the game it self by writting a simple python script.

```python
import numpy as np
def play(S, N):
    outcomes = np.random.choice(S, size=N) #a list of random N outcomes
    dollars = np.sum(outcomes)
    return dollars
play([1,2,3,4,5,6], 10000)
```
if you execute the above script you will see the result will be closer to 35,000, this means we will approximately make 35,000$ everytime we played the game.

### uhhh, i thought i was reading about Expected Values? ###
yes, i get you, answering the above question is no different than answering the expected value problem, if you look closely and do some investigation to the results of the above progam you will see some pattern, lets do some tweaking to the second argument(N), like increasing it by order-of-magnitude and see the result.

```python
play([1,2,3,4,5,6], 10000)         #35057
play([1,2,3,4,5,6], 100000)       #350045
play([1,2,3,4,5,6], 1000000)     #3500941
play([1,2,3,4,5,6], 10000000)   #34994718
```
as you can see the results seem to increase in an obvious pattern with respect to N, approximately a multiple of **3.5**, familliar number?, thats what i thought, thats the number you would get if you used the expected value formula (1) to compute the expected value of a fair dice.

<div class="math">
    $$
        E(X) = \sum_{i} p(x_i) \cdot x_i \quad \quad \quad \quad (1)
    $$
</div>

so in the above example the expected value tells us the amount of dollars we will make on average on each roll, which is **3.5**, and multiplying that by the number of times we rolled the die, we get the total amount of dollars we will make, note that this is exectly true when we play the game infinite times, but due to the finitness of our computers we cant do that, what we can do is increase N and divide the result by N and we will see the result will approximate **3.5** as we increase N

```python
play([1,2,3,4,5,6], 10000)/10000               #3.4823     
play([1,2,3,4,5,6], 100000)/100000           #3.51029    
play([1,2,3,4,5,6], 1000000)/1000000       #3.501929
play([1,2,3,4,5,6], 10000000)/10000000   #3.5000251
```
as you can see the results are approximating **3.5**, our little holy grail.

**Test**: lets say you receive nothing if the die roll is less than 4, and you receive the amount of dollars equal to the number rolled if the die roll is 4 or greater. What is the expected value?

lets modify our python script a little bit.
```python
import numpy as np
def play(S, N):
    outcomes = np.random.choice(S, size=N) #a list of random N outcomes
    outcomes = outcomes[outcomes >= 4] #we dont need 1,2,3 as they dont have any money
    dollars = np.sum(outcomes)
    return dollars

play([1,2,3,4,5,6], 10000)/10000               #2.532    
play([1,2,3,4,5,6], 100000)/100000           #2.49538    
play([1,2,3,4,5,6], 1000000)/1000000       #2.49981
play([1,2,3,4,5,6], 10000000)/10000000   #2.5004234
```
again this does seem to approach **2.5** which is what we would get if we used the expected value formula (1).

In summary, the Expected Value gives us the average value we get on each trial from our experiment, note that this isnt necessarliy in the set of our sample space.

*take care, good bye!*
