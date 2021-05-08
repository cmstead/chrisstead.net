---
layout: post
title:  "Source Modalities: Rules and Conditions"
date:   2021-04-03 00:00:00 -0800
categories: programming software-linguistics human-centered-source design
---

While analyzing and editing source code, much of the work to be done is rather straightforward. Many business applications are data stores with a user interface so a non-developer can manage the data.

Even these applications, however, introduce certain small complexities which tend to muddy the water. A subset of users need product codes to be handled in a way the system didn't originally account for. Certain segments of the software must serve two distinct user types, which lead to very different workflows. A particularly common issue which arises is, sometimes data is incomplete or corrupted in a way that breaks the application.

All of these scenarios, and a multitude of others, require consideration of the rules which drive the system, and the choices which must be made to satisfy users. Source code which handles varied options, or things which must be is dealing in **_modality_**<sup>1</sup>.<!--more-->

## Linguistic Modality ##

Modality in linguistics centers around language which deals in either necessary, or possible scenarios. **_Modal expressions_** generally include words like _must_, _should_, _could_, _might_, and _may_. This kind of language introduces the notion of **_possible worlds_**<sup>2</sup>.

A possible world is a world which is complete and well defined within the scope of a particular modality. In other words, "my wife might have blue hair tomorrow" suggests there is a possible world where she will have blue hair, and another possible world where she may not.

Meanwhile, there is another modality where there is only one possible scenario. This modality is the necessity modality. The outcome, or state of being is necessary regardless of what may happen between now and the eventual end. E.g. "The winner of the contest must read the most books." Regardless of who wins the contest, we know they read the most books. It is not stated what would happen if there were two people who read exactly the same number of books. Perhaps there is a sudden-death read-off. No matter what the outcome is the only possibility.

## Source Modality ##

**_Source modality_** arises from the existence of **_rules_** and **_conditions_**. Rules are the semantic equivalent of necessity. Conditions are the semantic equivalent of possibility. Rules typically involve concepts like _validation_, _verification_, and _assertion_. Meanwhile conditions generally involve _decisions_, _changes of state_, and _value selection_.

We can see necessity arise from rules when reflecting on expectation the users must meet in order to successfully work within the provided software. A common example is "the user must log in to view their order status." A modal expression jumps right out; "the user _must_ log in." This modal expression will end up in the code as a verification. When someone attempts to view an order status page, the software will need to verify an appropriate user is logged in.

Likewise possibility will emerge from user choices in the application, design patterns, and even data management. It's common to have changes in the state of the application arise from actions the user takes when interaction with software. These state changes can introduce a chain of conditional events including triggering validation (rules, necessity), data management, resolution of bad, or missing values, or even a cascade of changes in the user interface itself.

## Semantic Transparency ##

The big question is, why does it matter? In the end, conditional and Boolean logic is part and parcel of software development. Modality is just a fancy way of talking about conditionals.

To understand why modality matters, it's worth exploring **_semantic transparency_**<sup>3</sup>, or **_semantic opacity_**<sup>3</sup> of source code.

If we looked at the following source code, we can see the two core types of modality playing out:

```python
def get_user_name(user_id):
    user_record = get_user_record(user_id)

    if user_record == None:
        raise Exception("Invalid User ID")
    
    if user_record.version < 2:
        return user_record.name
    else:
        return format_name_by_culture(user_record)
```

There are two conditionals in this piece of code, and each has a distinct semantic meaning. The first condition is a rule. If the record does not exist, the rule has been violated: the user ID was not valid. The second conditional was designed around versions of stored data. A user record may contain a valid value in the name field, or it may contain information which would make it possible to use name fields and a culture value to properly format a name.

Due to the collection of conditional blocks, and the distinct modality of each, this function has a few issues:

1. It is just doing too much
2. It includes rule information
3. It includes data condition information

Ultimately we would refer to this function as **_semantically opaque_**. By carrying too much information, and of disparate kinds, we lose the thread of meaning within the code. By understanding source modality, we can do a preliminary analysis of the source code:

```python
def get_user_name(user_id):
    # inappropriate state concern mixing
    user_record = get_user_record(user_id)

    # Modality: Rule -- user_id is invalid if no record exists in the database
    if user_record == None:
        raise Exception("Invalid User ID")
    
    # Modality: Condition -- record data changed from version 1 to version 2
    if user_record.version < 2:
        return user_record.name
    else:
        return format_name_by_culture(user_record)
```

Once we have done a quick analysis of the code at hand, the elements of the function become clearer, and we can apply techniques like **_thematic grouping_**<sup>4</sup>, and broader refactoring. 

## Wrap Up ##

When we can name the sense of lost meaning in our source code, we can apply tools to begin untangling semantic issues in our program. By sensing semantically opaque code, we can search for themes and modalities. These code characteristics can help us understand both what the code is accomplishing and what the original intent may have been.

The next time you dive into an existing piece of code, think about how well you understand the underlying meaning. Are you looking at symbol soup, or is the source semantically transparent? Can you discern what the business domain, and context are? What do the conditional blocks look like? Perhaps there is modal information which can be discovered.

**_References_**

1. "Modality (natural language)" [https://en.wikipedia.org/wiki/Modality_(natural_language)](https://en.wikipedia.org/wiki/Modality_(natural_language))
2. "Possible World" [https://en.wikipedia.org/wiki/Possible_world](https://en.wikipedia.org/wiki/Possible_world)
3. "Transparency (linguistics)" [https://en.wikipedia.org/wiki/Transparency_(linguistic)](https://en.wikipedia.org/wiki/Transparency_(linguistic))
4. "The Theme of Your Code" [http://chrisstead.net/programming/software-linguistics/human-centered-source/design/2021/03/27/the-theme-of-your-code.html](http://chrisstead.net/programming/software-linguistics/human-centered-source/design/2021/03/27/the-theme-of-your-code.html)
