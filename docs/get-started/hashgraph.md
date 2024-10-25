---
sidebar_label: '3. Hash Graph'
sidebar_position: 3
---

# Hash Graph

(must explain: merge, eventual consistency)
(optional: light-cone)

---

Topology's **hash graph** approach works by encoding an operation history in a **directed acyclic graph** where the edges represent _causal dependency reporting_ among the operations and the vertices contain the operations and the hashes of their causal dependencies, which we can define as a tuple (_u_, **D**), where _u_ is the operation and **D** is the set of hashed vertices that are its causal dependencies.

Therefore, if _u_ is an update operation, given two operations _u1_ and _u2_, if _u2_ reported _u1_ as its causal dependency, _u2_ must have happened after _u1_ (_u2_ &rarr; _u1_).

Here is an example of a CRO's hash graph:

<div align="center">
    ![alt text](/img/hash_graph.png)

    **Figure 1:** Hash graph of a CRO.

</div>

In the example above, the vertex _V7_ should contain (_u7_, \{_h(V4)_, _h(V5)_}). The set of vertices \{_V6_, _V7_, _V8_} consists on the _frontier_, which are the vertices whose operations are currently not the dependencies of any other operation. The next vertice, _V9_, should have \{_h(V6)_, _h(V7)_, _h(V8)_} as its causal dependencies.

With this, when two nodes synchronize their operation histories of the same CRO, they effectively merge their hash graphs.

This approach is immune to **sybil attacks**, allowing CROs to tolerate many sybil actors.
