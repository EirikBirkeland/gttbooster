Classes contains classes/facades/abstractions that are then consumed in the implementation.

Most classes represents a DOM element, such as Segment, TargetDocument.
Some classes are rather abstract and exist to reduce the complexity of implementation.

Some of these classes may qualify as "components".

E.g. Segment exposes "all kinds of things that make semantic sense to consider a property of Segment".

DOM references should be forbidden here.