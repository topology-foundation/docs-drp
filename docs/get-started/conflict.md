---
sidebar_label: '4. Conflict'
sidebar_position: 4
---

# Conflict

Conflict resolution is key to DRP's real time capability.

## What is a conflict?
The state of a [DRP program](./drp-program.md) can be affected by [concurrent](./concurrency.md) operations.

If applying these operations in any possible order produces the same program state, we do not have to worry about **conflicts**. If not, we are in conflict territory.

Consider a simple DRP program that:
- has a single number as its state
- accepts two types of operations: addition & multiplication

If its initial state is 1, and we have two concurrent operations as below, what is its state after applying these operations?

<div align="center">
    ![](/img/concurrency.png)
</div>

Different execution orders yield different results:
- ![](https://latex.codecogs.com/svg.latex?(1+7)\cdot3+2=26)
- ![](https://latex.codecogs.com/svg.latex?(1\cdot3)+7+2=12)

Why?

The root cause is that these operations do not commute. When they happen concurrently, a **conflict** occurs.

It is important that we describe the program's behavior in case of conflicts. Every user in the same DRP program would follow the same behavior so they all reach the same resulting state.

This behavioral description is also called [concurrency semantics](https://en.wikipedia.org/wiki/Concurrency_semantics).

## Resolving conflicts

We need to set rules for how to handle conflicts. These rules are to be followed by every honest user of a DRP program. We call them **conflict resolution rules**.

In resolving a conflict, some of the operations involved might be dropped, while the rest of them might be ordered in a replicable manner.

Recall the example above, where addition and multiplication constitute a conflict. We could define its conflict resolution as "multiplication first":
- No operations are dropped
- Multiplication is ordered before addition

This way, the final DRP program state will always be 12.

## Analogy

Imagine a DRP program that is a [pile of sand](https://blog.topology.gg/the-origins-of-topology-from-ledgers-to-sandcastles-part-2/).

We have Alice and Bob, starting from an identical pile.

Alice flattens the pile, while at the same time Bob molds it into a sphere. These operations are conflicting, so what do we do?

A valid rule to resolve this conflict would be "mold first". Molding happens before flattening.

Following the same rule, both Alice and Bob arrive at an identical sand disk.

## Further Reading
- [When to use a CRDT-based database](https://www.infoworld.com/article/2256888/when-to-use-a-crdt-based-database.html)
- [crdt.tech](https://crdt.tech/)

---

Page last updated: November 28, 2024