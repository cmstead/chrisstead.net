# Architecting for Change -- The A-Frame Architecture #

When any architectural pattern, the goal is to solve a particular problem. Even the maligned "monolith pattern" solves a particular issue -- keeping code together for the simplicity of dependency reference.  Of course, every pattern also comes with trade-offs.  For example, the microservices pattern introduces network communication between service units, which can introduce latency.

Understanding this, we can select problems which need a solution. A good example of this is, how to we simplify the management of external resources and state?  Haskell approaches this with the use of monads.  Monads, in a simplistic explanation, provide a way of encapsulating side effects -- effects like database access, state management, or network communication -- to keep them separate from the rest of your code.

This approach of isolating side effects leads to a clear division between work which can behave unpredictably and work which behaves predictably.

Though it's true that all languages have different means for accessing and interacting with side-effect style actions, we can still emulate this kind of separation in our software with an architectural pattern James Shore refers to as the [A-frame architecture](https://www.jamesshore.com/Blog/Testing-Without-Mocks.html#a-frame-arch).

James introduces this as a mechanism for testing code without using mocks, however I believe this is a foundational enough pattern it solves problems far beyond simply eliminating the need for mocks.

## Some Context ##

Software developers have long worked to create patterns which made code easier to change.  Two common patterns are the [N-Tier architecture](https://docs.safe.com/fme/2017.0/html/FME_Server_Documentation/Content/AdminGuide/FME-Server-and-N-Tier-Architecture.htm) and  [Hexagonal architecture](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)).  Each of these architectural patterns help decide where different elements of the application will reside.  N-Tier architecture takes all of the physical and logical layers of the application into account, separating them into their appropriate layers.  Hexagonal architecture takes the perspective of a piece of software, or multiple interconnected modules, can each have their own division creating a multi-layered application structure.

Along with the layered approach to software building, at both the systems and software levels, other patterns have emerged from the community to help better construct software in order to simplify the process of building a source base that is more easily changed.

It has become en vogue to talk about composition over inheritance in the world of object oriented programming (OOP), and that leads us directly to the [Composite pattern](https://en.wikipedia.org/wiki/Composite_pattern). By composing larger objects from smaller, we get the benefit of building software from small components which are easy to reason about.  This reduction of logical elements also provides means for objects which, at one time, were built of small objects to, themselves, be composed of composite objects.  This compositional tree affords benefits like well balanced abstractions, well encapsulated elements, easier extraction of static methods or other reusable API modules, safer refactoring due to smaller components, easy-to-reason-about code, and testing.

When looking at the Hexagonal architecture, we will eventually hook into data stores and other external resources. This leads us to create [facades](https://en.wikipedia.org/wiki/Facade_pattern) and [adapters](https://en.wikipedia.org/wiki/Adapter_pattern) to separate our code from the resources they interact with.  One other pattern which emerges is the [Humble Object pattern](https://ieftimov.com/post/tdd-humble-object/). This pattern is typically associated most closely with test driven development, but can serve as an API reduction pattern, exposing only the methods which are appropriate for the application to access, simplifying the API surface.

Each of these patterns are important in their own right. These patterns also, and especially, contribute to the emergence of the A-frame architectural pattern. Without these core ideas, A-frame architecture would be a significantly more radical departure from the way we build software as we will see next.

## The A-Frame Architecture ##

In order to understand A-frame archecture, it's easiest to consider what it looks like in the most naive implementation: an unrolling of the hexagonal architecture pattern. This means, we could consider the left side of the A as the external resources or, as James Shore calls them, infrastructure components.

Although unrolling a hexagon might be a good place to start, it gives rise to approaching development differently.  Most software, even when working within the hexagonal or other structured approach, ends up mixing external and internal concerns.  Ports and adapters from the hexagonal approach become the dependencies of other modular code which, in turn, is depended upon by yet more.  This means that all of the code which utilizes some other dependency, which follows the tree all the way down to the external system dependency, is still carrying the coupling to the original dependency which exists in the outer layer of the hexagon.

Now, this doesn't mean the hexagonal structure is all bad.  In fact it is quite a wonderful discovery.  By introducing the ports and adapters idea, we have an abstraction over the external world.  This abstraction allows things in the real world to change without affecting the business code within the application.

With that said, if we unroll the hexagon and push all of the external interactions to one side of the left-hand line, and business logic to the right, we are left with interactions which only occur at the line itself. In the original development of the A-frame, the line could be considered the external/internal bifurcation.  All of the internal workings branch to the right of the bifurcation line, while all of the external dependencies branch to the left.

So far this may not sound like such a revelatory idea.  The important distinction is, the bifurcation line becomes the sole integration point.  This means, anything which performs any computation, transformation, or other business behavior is only interacted with as an event.  No business logic will ever create a data-push or data-pull behavior whatsoever.  Instead the business logic is triggered as an internal-only evented action. This event-driven interaction is a layer we could introduce into the hexagon, but that would add an extra layer of complexity which might not be useful when considering the architecture from an appropriate abstraction level.

A new concern arises when trying to simply push all of the external dependencies to the right side of our bifurcation line.  With patterns like CQRS, we may have readers and writers which are broken out in such a way that we have inbound and outbound trasformations which must be performed for each interaction.  Trying to push these strictly to the left of the bifurcation line would lead to a substantial challenge regarding keeping related behaviors together.

Instead of trying to have one canonical A-frame, we can view the A-frame architecture as an A-fractal.  What may, from the perspective of one integration layer, look like a single reader/writer/actor, the internals of this actor may actually be composed of yet another A-frame. Ultimately, this means our application can, and necessarily shoud, be composed of a large number of smaller pieces which are each, in their own structure, take the same approach.

## Stateful vs. Stateless Business Logic ##
