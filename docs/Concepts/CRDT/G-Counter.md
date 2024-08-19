---
sidebar_position: 1
---

# G-Counter (Grow-Only Counter)

The G-Counter implements a counter that only **increments**. It has an array ***P*** of **n** nodes, each one identified by their ID, that stores the counter values of each node.

Our G-Counter implementation supports both **operation** and **state** changes. The **merge** function is **commutative**, **associative** and **idempotent** and it will compute the **maximum** of every element in ***P***.

One useful application of a G-Counter is, for example, counting the number of votes on a P2P poll.

### References

- [Wikipedia, *https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Known_CRDTs*](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Known_CRDTs)

- Shapiro, Marc; Preguiça, Nuno; Baquero, Carlos; Zawirski, Marek (13 January 2011). "A Comprehensive Study of Convergent and Commutative Replicated Data Types"