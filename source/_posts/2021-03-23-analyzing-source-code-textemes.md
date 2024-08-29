---
layout: post
title:  "Analyzing Source Code: Source Textemes"
date:   2021-03-23 00:00:00 -0800
categories:
  - programming
  - source-code
  - linguistic-analysis
  - human-centered-source
---

I realized a few years ago that one of the most important aspects of writing software, to me, is to build it for people. For several years, I thought, given enough research, there was a technical solution out there that would help me to finally discover a way back to people.

As has been said many times before, **there is no technical solution for people problems**.

The more I learned about the **_sociotechnical_**<sup>1</sup> inner workings of teams building software, the more I realized that no amount of technical knowledge would ever replace the value of better understanding people.

Jessica Kerr leans into Nora Bateson's concept of **_symmathesy_**<sup>2</sup>, "learning together", as a description of the kind of work software developers do. This word is steeped in the notion of human systems, working together, communication, discovery, and much more. In order to be more effective **_symmathesistic_** team, we need tools.

There are numerous tools, and likely near-infinite approaches to developing an effective group working symmathesistically, however, it seemed most reasonable to lean into something I already understood: the **_metastructure_**<sup>3</sup> of programming languages.

I ended up pulling a thread and landing squarely at the intersection of programming languages, communication, and linguistics. There are a number of reasons why any programming languages, as a core set of syntactic rules, would not be considered a language in isolation. On the other hand, when we consider the way programming languages are used by people, and the novel structures that emerge, it looks less like machine-generated commands, and more like the way people actually communicate.<!--more-->

Of course one of the largest hurdles I had to overcome was the notion that any language would be necessarily spoken. Even considering **_code phonology_**<sup>4</sup>, there is no uniform approach to truly reading code. This is, in my best estimation, due to the fact that reading code aloud is more an interpretive activity than a one-to-one conversion of written work to spoken words.

Consider this:

```javascript
while (true) {
  if(records.length < 1) break;

  const record = records.shift();

  console.log(`ID: ${record.id}, Name: ${record.name}`);
}
```

If we just take the single line `if(records.length < 1) break;`, some may read it, literally, as "if records length is less than 1, break" while someone else might say "break when you run out of records." Both of these interpretations are **_pragmatically_**<sup>5</sup> valid. The latter may speak more accurately to code intent, even if it does not speak to the exact implementation.

This broad variability in verbally communicating information about the source code led me to a problem: How would I do any kind of meaningful investigation and analysis of code as a communication medium if the communication around it is so inconsistent?

I started looking for linguists who were analyzing texts for answers. Though I haven't found, or developed a complete system for making sense of source code with respect to human communication, I have landed on a concept which makes for a solid founding notion.

## The Texteme (text-eem) ##

> **_texteme_** (n)<sup>6</sup>: (linguistics) A unit of text, large enough to have intelligible meaning, that stands in relationship to other units of text.

In linguistic analysis of text, a texteme is a selection of text that is large enough to be meaningful. It also "stands in relationship to other units of text", meaning a texteme alone does not tell a full story. Instead, it is part of a larger body of work, in which a collection of textemes build a broader meaning.

If we consider any space-, dot-, equal-sign-, or colon-delimited piece of text in source code as a selection, we could, hypothetically, call it a texteme, since there is some sense of what any given selection might be in the technical sense of the language, and it's mechanics. I, however, didn't find that notion very compelling.

Consider the selection `records`. It is an identifier, which means it's a variable, function name, or other user-defined construct. It is written in English, and the plural nature of the word tells us that, for whatever a record is, there are likely plural of them stored in records.

Is that a sufficient analysis within the scope of the source code? Perhaps, but only in the most technical, atomic sense. We are missing a lot of important information, especially if we consider the instance of `records` where we are doing this work: `records.shift()`.

Although records may stand alone, though arguably, only as a class of possible meanings and values, `shift` almost certainly does not, given the syntactic rules, and applicative rules of the language (in this case JavaScript). In fact, regardless of whether we can call `records` or `shift` textemes, they are definitely tokens.

### Tokens ###

In language parsing, there is a concept of a **_token_**. A token is a selection of text which is generated when doing **_lexical analysis_**<sup>7</sup> which can, possibly, be classified for the use of doing further analysis later.

To expand on tokens and how they help us with analysis of our source code, let's consider `records`, and `shift`. In the case of our example source code, they are found together, as a larger expression `records.shift`. I will, from here on, refer to this kind of token combination as a **_compound token expression_**.

I'll stop at this point. I have no intention of diving into the work of doing lexical analysis here, but it is an interesting diversion if you're interested in writing a programming language, or doing natural language processing.

### A Source Code Definition of Texteme ###

Given the fact that not every token can be considered sufficiently intelligible on its own, this gives rise to the notion that in source code, a source texteme may either be a token, or a compound token expression. In fact, unless a token is a language key-word, it is most likely NOT a source texteme.

Instead, I offer this definition:

> **_source texteme_** (n): (software linguistics) the smallest unit of text can still be unambiguously intelligible in relation to other source textemes.

With this in mind, `records`, `records.shift`, and `records.shift()` are each distinct. The first two, in relation to the other text, are actually ambiguous, given they are incomplete. In fact, `records` is unlikely to ever be unambiguous in any context.

The compound token expression `records.shift` is only meaningful if the source author meant to refer to a function attached to records, and not call it. In a broader consideration, the proper source texteme would necessarily be `records.shift[TERM]` where **TERM** is a delimiting terminator in the source code. In a language like JavaScript, there is an explicit terminator available, `;`, but a new expression may be an acceptable termination of the previous compounding.

Since our sample code does NOT terminate after `shift`, assuming `records.shift[TERM]` would provide an incorrect analysis of the code. Instead, we know that the compound token expression is, in fact `records.shift()`, which is definitely unambiguous.

Given this analysis, `records.shift()` is the smallest unit of text which can still be unambiguously intelligible, and we have found a properly-sized source texteme for our line. In fact the line `records.shift()` comes from actually contains two distinct source textemes compounded with an equals operator:

1. `const record`
2. `records.shift()`

Each of these source textemes can be fully interpreted and understood alone. The first is clearly the creation of a constant identifier, the second is the call of a function attached to `records`. When compounded, we get `const record = records.shift()` which provides us a fully interpretable line.

## Conclusion ##

There is more work to be done with source textemes, but I believe this is a good first pass at identifying human meaning within source code. Moreover, it demonstrates that meaning and pure syntactical analysis are not the same, and that source documents can actually be analyzed and intentionally constructed to carry meaning beyond a simple instruction set for a computer.

By having a concept we can use to analyze and evaluate source code, perhaps we can find better ways to identify source which communicates well, and improve source which does not. The source texteme gives us a foundation to uncover and discuss richer topics regarding the natural asynchronous communication which arises in source code.

**_References_**

1. "Sociotechnical Systems" [https://en.wikipedia.org/wiki/Sociotechnical_system](https://en.wikipedia.org/wiki/Sociotechnical_system)
2. "Symmathesy: A Word In Progress" [https://norabateson.wordpress.com/2015/11/03/symmathesy-a-word-in-progress/](https://norabateson.wordpress.com/2015/11/03/symmathesy-a-word-in-progress/)
3. "Metastructure" [https://en.wiktionary.org/wiki/metastructure](https://en.wiktionary.org/wiki/metastructure)
4. "Code Phonology" [https://www.felienne.com/archives/5947](https://www.felienne.com/archives/5947)
5. "Pragmatics" [https://en.wikipedia.org/wiki/Pragmatics](https://en.wikipedia.org/wiki/Pragmatics)
6. "Texteme" [https://en.wiktionary.org/wiki/texteme](https://en.wiktionary.org/wiki/texteme)
7. "Lexical Analysis" [https://en.wikipedia.org/wiki/Lexical_analysis](https://en.wikipedia.org/wiki/Lexical_analysis)
