---
path: "/blog/2020-10/book-pragmatic-programmer"
date: "2020-10-20T00:00:00.000Z"
title: "The Pragmatic Programmer"
tags: []
cover: "./tpp20.jpg"
draft: false
---

I've just finished the book [The Pragmatic Programmer](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/). 

It's mostly an encourgement to adhere to design principles like DRY/orthogonality etc. One thing that stood out for me was a small section on **Finite State Machines** as in a _state-transition table_. This made me think about another elegant way to handle situations, where a lot of conditional logic is involved. The worst way to handle such situation is a lot of nested if/else statements. Making use of a state-transition table, an n-dimensional matrix of function handles where each dimension represents a parameter with a finite set of possible states could be used. Then you could use all the parameters' states as indeces to the matrix and thereby find the correct function that is to be called. 

There were situations at my job at Lufthansa, where I could have used this technique. Particularly one algorithm for the workscope selection for a particular engine type would have lended itself well to this.

### Ebay Link   
I'm selling the [book on ebay](https://www.ebay.de/itm/The-Pragmatic-Programmer-20th-anniversary-edition/203149920626?hash=item2f4cadc972:g:V-cAAOSwQPVfknT1). 