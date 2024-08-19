---
sidebar_label: 'Hash Graphs'
sidebar_position: 4
---

# Hash Graphs

### Causal Order

**Causal order** is a partial order that can be enforced in a distributed system without coordination. Given an operation history of a CRO, its state is derived from applying the operations in linear order obtained from topological sort that preserves the causal order. There are some approaches that are vulnerable and not Byzantine Fault Tolerance, so we need a solution to solve this issue.

### Topology's solution

Our solution is based on **hash graphs** and it works by encoding an operation history in a **directed acyclic graph** where the edges represent *causal dependency reporting* among the operations and the vertices contain the operations and the hashes of their causal dependencies, which we can define as a tuple (*u*, **D**), where *u* is the operation and **D** is the set of hashed vertices that are its causal dependencies.

Therefore, if *u* is an update operation, given two operations *u1* and *u2*, if *u2* reported *u1* as its causal dependency, *u2* must have happened after *u1* (*u2* &rarr; *u1*).

Here is an example of a CRO's hash graph:

<div align="center">
    ![alt text](../../../static/img/hash_graph.png)

    **Figure 1:** Hash graph of a CRO.
</div>


In the example above, the vertex *V7* should contain (*u7*, \{*h(V4)*, *h(V5)*}). The set of vertices \{*V6*, *V7*, *V8*} consists on the *frontier*, which are the vertices whose operations are currently not the dependencies of any other operation. The next vertice, *V9*, should have \{*h(V6)*, *h(V7)*, *h(V8)*} as its causal dependencies.

With this, when two nodes synchronize their operation histories of the same CRO, they effectively merge their hash graphs.

This approach is immune to **sybil attacks**, allowing CROs to tolerate many sybil actors.

### Concurrency Semantics



### References

- Thomas Hsueh. *Topology Protocol: A Distributed System Protocol
For The Open Metaverse*. 2024 