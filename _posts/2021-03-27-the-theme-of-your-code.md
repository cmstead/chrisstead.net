---
layout: post
title:  "The Theme of Your Code"
date:   2021-03-27 00:00:00 -0800
categories: programming software-linguistics human-centered-source design
---

In the past 25 years, or so, it has become popular to consider high-level structure of programs in chunks defined by a group affectionately referred to as the "Gang of Four". They wrote a book called "Design Patterns"<sup>1</sup> which laid out common patterns for solving well-understood problems in software.

There are many more patterns than those laid out in "Design Patterns", but the idea still remains the same. The design starts, typically, at the module, or class level and goes up from there. Occasionally design will start at a function level, when the programming language allows for independent functions, but this is rather uncommon.

On the other hand, when looking at source code line-by-line, people often fall back to naming as a primary design strategy, and follow the convention of "put your variables as close to their use as possible". Though this strategy makes sense contextually, since you can see the variable declared and defined near the use of the value.

Where we land when following common rules of thumb and patterns is a mix of large chunks of design, and small clusters of variables followed by use. This code is arguably better than code in which no design choices were made. However, we are overlooking a critical aspect of communicating in our code.

## Semantic Well-Ordering, Coherence, and Thematic Grouping ##

When written communication is created, it is common to group ideas together. We see this in popular writing, blogs (like this one) and even threads on Twitter. This grouping of concepts is essential for the **_cooperative principle_**<sup>2</sup> to hold.

The cooperative principle, in the case of source code, will demand that **_thematic constituents_**<sup>3</sup> are grouped together, and ordered in a way which supports either inductive, or deductive support of the overarching theme.

### The Cooperative Principle ###

The cooperative principle reads as follows:

>Make your conversational contribution such as is required at the stage at which it occurs by the accepted purpose or direction of the talk exchange in which you are engaged.

This is a really long way of saying "stay on topic". An interesting aspect of the cooperative principle is, people typically follow it by default. In other words, people tend to collect contextual information from the communication at hand, and respond, on topic. Since people generally follow the cooperative principle, there are assumptions which follow.

- The speaker is saying something related to the topic at hand
- The listener is in tune with the topic and maintaining a contextual sense of the current conversation

All of this means that anyone reading written communication is going to assume there is an intended coherent structure. When any written communication violates this sense of coherence, it leads to a violation of the cooperative principle.

### Semantic Well-Ordering ###

There is a core requirement that code be well-ordered with respect to execution. If code is not constructed in the correct order, execution will fail, or behave in unexpected ways. We can call this **_algorithmic well-ordering_**.

On the other hand, humans reading code will need indicators of what to expect from the source document as a communication medium. In order to understand passages of the code and quickly infer meaning, there must be a human-language related well-ordering which drives the uptake of contextual cues, and domain understanding. We can call this **_semantic well-ordering_**.

### Coherence ###

**_Coherence_**<sup>4</sup> is the interrelation between units of text in a written communication. When writing is coherent it appears to be logically, and semantically consistent for the reader. This need for consistency and clarity is typically supported by the order in which information is presented.

Coherent code carries an additional requirement that each line, and expression be semantically well-ordered. Coherence cannot be achieved when the reader is required to constantly seek context-carrying source in order to understand the work at hand.

Coherence creates the link between the reader-listener, and the cooperative principle, meaning, the reader-listener will assume the position that the writer stayed on topic as well as they could manage. This means any reader-listener is going to seek connections between locally grouped units of text.

When the text is incoherent, either because of superfluous information, or the lack of semantic well-ordering, the reader-listener may infer meaning, or associate ideas incorrectly. This incoherence can lead to distraction, or misunderstanding of the written communication.

### Thematic Grouping ###

Ideally our source code would all be coherent and carefully organized. As is the way, the world will have none of it. Source code often contains half-complete ideas, varied levels of abstraction, and inconsistent language. We can't address all of this in one post, but we can look at how we can create more coherent code with **_thematic grouping_**.

A rule of thumb, mentioned earlier, is "keep your variable definitions as close to their use as possible". This is a relatively rudimentary form of thematic grouping. In this particular case, the theme is the named value, and the way in which it is used. This theme is not particularly interesting, and may end up distracting the reader from the broader purpose of the code.

Thematic grouping is driven by a need for coherence which, in turn, arises from semantically well-ordered source code. This means, though a variable may live as close as possible to its use, this may not produce either coherent, or semantically well-ordered code. Let's consider the following code:

```python
def get_books_by_dr_seuss_paginated(current_page = 0):
  row_limit = 10
  author = "Dr. Suess"

  return Books.get_by_author(author, current_page, row_limit)
```

On the face, this code might seem rather tight and tidy. We are making a database query, and returning the result back to the caller. However, we introduced an incoherent element into our function, which the reader will seek to understand in the greater context. We can make the inappropriate element obvious through thematic grouping:

```python
def get_books_by_dr_seuss_paginated(current_page = 0):
  row_limit = 10

  author = "Dr. Seuss"

  return Books.get_by_author(author, current_page, row_limit)
```

Here we can see the theme defined by the function name is "books, by Dr. Seuss, by page". The thematic group, then, would be (page, author, database request). The variable `row_limit` is not thematically appropriate, and breaks the sense of coherence.

The coherence of the source text fails because our original code was not semantically well-ordered. By analyzing the lines, it can be argued that `row_limit` is semantically related to the database query, but is not related in any way to the name of the author. If we reorganize our code in a way which is still algorithmically well-ordered, we can produce semantically well-ordered code as well.

```python
def get_books_by_dr_seuss_paginated(current_page = 0):
  author = "Dr. Seuss"

  row_limit = 10
  return Books.get_by_author(author, current_page, row_limit)
```

With this regrouping, we can see there are two distinct themes in this block of code:

1. Books by Dr. Seuss, by page
2. Paginated request for books by an author, with a page size

This new thematic grouping can guide us to a quick, sensible refactoring, creating a new function and reducing the **_cognitive load_**<sup>6</sup> for the reader:

```python
def get_books_by_author_paginated(author, current_page = 0):
  page_size = 10

  return Books.get_by_author(author, page, page_size)

def get_books_by_dr_seuss_paginated(current_page):
  author = "Dr. Seuss"

  return get_books_by_author_paginated(author, current_page)
```

A little judicious rearrangement, and we have two blocks of code which maintain a clear theme, and coherent communication. Our function, parameter, and variable names all align with the intended work to be done. They communicate the correct abstraction level, and they make it easy for the reader to guess what they will find in the next bit of code.

## Conclusion ##

Thematic grouping may not always lead to an immediate refactoring, aside from line order; this is especially common in **_legacy code_**<sup>5</sup> where long methods may be unsafe to change. Simply reorganizing code into **_thematic groups_** will make it easier to understand the intent of the source code and do net positive work by increasing local coherence and reducing cognitive load.

**_References_**

1. "Design Patterns: Elements of Reusable Object-Oriented Software" [https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented-dp-0201633612/dp/0201633612/ref=mt_other?_encoding=UTF8&me=&qid=](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented-dp-0201633612/dp/0201633612/ref=mt_other?_encoding=UTF8&me=&qid=)
2. "Cooperative Principle" [https://en.wikipedia.org/wiki/Cooperative_principle](https://en.wikipedia.org/wiki/Cooperative_principle)
3. "Constituent (linguistics)" [https://en.wikipedia.org/wiki/Constituent_(linguistics)](https://en.wikipedia.org/wiki/Constituent_(linguistics))
4. "Coherence" [https://en.wikipedia.org/wiki/Coherence_(linguistics)](https://en.wikipedia.org/wiki/Coherence_(linguistics))
5. "Working Effectively With Legacy Code" [https://www.amazon.com/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052](https://www.amazon.com/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052)
6. "Cognitive Load Theory" [https://www.mindtools.com/pages/article/cognitive-load-theory.htm](https://www.mindtools.com/pages/article/cognitive-load-theory.htm)
