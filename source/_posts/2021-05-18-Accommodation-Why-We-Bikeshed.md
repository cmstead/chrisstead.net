---
title: 'Accommodation: Why We Bikeshed'
date: 2021-05-18
tags:
    - programming
    - accommodation-theory
    - sociolinguistics-of-code
    - sociotechnical-systems
---

_**Bikeshedding**_<sup>1</sup> – that never-ending debate about a material disagreement – is so commonplace in the software industry we actually have parables about it. What’s more, I have actually seen people launch into meta-bikeshedding where they actually end up in an argument about what the original bikeshedding was about.

Two of the most common topics I have seen people bikeshed in the JavaScript community are indentation preference, and semicolon preference. Articles are referenced, appeals to reason are made. Some people even purport their position is supported by scientific discovery. In the end, though, it’s characterized as a matter of opinion.
This is the classic story of the bikeshed, and the origin of it’s name:

> A nuclear reactor is being built. Technical specs are presented and agreed upon. Then the topic of a shed for cyclists to park their bikes arises. The location is agreed upon, but the color is an issue. Every person in the room has an opinion on the color of the bikeshed, and an argument ensues.

_This story actually characterizes all bikeshed arguments as a matter of opinion._ The claim is, all people have opinions, and it is hard to get consensus on pure opinion. What if all bikesheds, however, were not created equal?

## Source of Preference Disagreement

Each person in a team comes from a different background. Even if one person “shares the same stack” as another, teams in various companies have differing norms regarding code style, structure, and even naming. People also differ in level of experience. These factors, among others, will impact how someone writes their code.

A common difference among developers on the same team is their history with a mix of languages which may or may not be related to the language at hand. This language or platform difference will affect how people expect to scan code, which can lead to preferences which enhance their ability to work effectively.

Let’s consider two people, Sean and Brenda, who are working in a NodeJS application codebase. Sean comes from a background of working in Python. He is used to the indentation requirements defined by the Python parser, frequently writes bare functions which are not attached to a class, and expects there to be no semicolons at the end of lines. Brenda, on the other hand, has a background in Java. She is most comfortable with classes, methods, loose indentation and strict semicolon requirements.

As Brenda works, day to day, she will often add semicolons into the code, when they are missing. She codes, almost exclusively, in class structures. Brenda has heard that the JavaScript community tends to prefer 2-space indentation, so this is the convention she uses. Meanwhile Sean often goes through removing semicolons he encounters and reformatting everything to have exactly 4 spaces of indentation. As you might imagine, Sean and Brenda bump into each other in the codebase a lot.

Though these things may seem superficial, Sean and Brenda clearly have divergent code styles. Since these two programming styles are centered on a common stylistic feature2 of the code there is a constant overlap of concerns. As you might imagine, Sean and Brenda both feel like they are not being respected by the other, frequently.

## Accommodation

Sociolinguistics has a concept called **accomodation theory**<sup>3</sup> which is devised to provide insight into why people choose to either converge or diverge regarding their manner of speaking. The way people communicate – including dialect, style, formality, etc. – conveys information about the social group with which they most closely align.

## Convergence

When people converge on a shared speech pattern – called **speech convergence**<sup>4</sup> –, it can generate a sense of shared belonging. Each person is signaling to the other that they are respected and valued – each person may feel they are viewed as worthy of respect, understanding and trust.

In the same way, when people converge on similar coding styles there is a shared sense of agreement and belonging to a team or group. This sense of belonging can improve both in-code, and in-person communication. It fosters a sense of community which can lead to the developers seeking shared understanding.

## Divergence

**Speech divergence**<sup>5</sup> can create a sense of **othering**<sup>6</sup>. There may be numerous reasons speech is diverging, such as providing insights into a cultural norm, or offering a sense of acceptable behavior in a given setting. Ultimately, however, if hints at social expectations are not at play, speech divergence may be used to communicate a difference in group association. A common example is using speech to communicate class association.

When we diverge in code style, even if it is not intended, others may interpret the divergence as a hostile action. Divergent style, especially when applied to a source document without discussion, may elicit a sense of othering. Folks from different backgrounds may feel at odds because they sense the other person is not respecting their experience and group association.

## The Bikeshed

If we look at the bikeshedding which happens between developers in meeting rooms across the world through the lens of accommodation theory, it reveals a different picture. No longer are developers fighting over something that is “mere opinion”. Instead, **developers are saying they are not feeling included in the group** when people push back on their code style. The message they hear is, “you are not worthy of consideration in this matter, you are not part of the group”.

With this framing, it becomes much more obvious why developers are so keen to fight for their preferred style of coding. They want to feel people are willing to converge toward their preference, which communicates respect for their past experiences. If Sean and Brenda were to sit down and discuss their backgrounds and where their styles arose, it would likely become easier to arrive at an acceptable shared style.

## Closing

I don’t have a formal study to support my hypothesis. Given the nature of human communication and the inclination for people to feel personally attached to their style of communication, it seems like a reasonable conclusion that folks would unconsciously feel a sense of othering in the absence of convergence toward a familiar coding style.

Ultimately, however, experience is the most likely motivator for coding style and practice. When coding practice bikeshedding begins, it may be worth exploring the background which led people to their current preferences. The nature of the conversation about seeking a shared understanding is welcoming to start, and it generates real understanding and empathy in the team. This **understanding can guide us toward convergence on a working agreement regarding style and practice, helping all developers on the team feel more connected**, making it easier to share and support ideas.

**Resources**

1. Parkinson’s Law of Triviality https://en.wikipedia.org/wiki/Law_of_triviality
2. Style (Sociolinguistics) https://en.wikipedia.org/wiki/Style_(sociolinguistics)
3. Accommodation Theory (Communication Accomodation Theory or CAT) https://en.wikipedia.org/wiki/Communication_accommodation_theory
4. (Speech) Convergence https://en.wikipedia.org/wiki/Communication_accommodation_theory#Convergence
5. (Speech) Divergence https://en.wikipedia.org/wiki/Communication_accommodation_theory#Divergence
6. Othering (Philosophy) https://en.wikipedia.org/wiki/Other_(philosophy)