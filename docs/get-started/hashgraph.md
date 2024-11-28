---
sidebar_label: '3. Hashgraph'
sidebar_position: 3
---

# Hashgraph

Hashgraph is the data structure underlying every DRP program.

## Purpose

Hashgraph serves as the **operation log** of a DRP program, recording both the operations that have occurred and the causal relationship among them. An operation is an update (write) on the program state.

Every user in a DRP program keeps a copy (replica) of the program's hashgraph. The client application running on the user's machine:
- reads this hashgraph for the state of the DRP program;
- writes to the DRP program by appending new operations to its hashgraph.

## Structure

Hashgraph is a **directed acyclic graph** (DAG) where:
- Vertices contain both the operations and the hashes of the vertices they causally depend on. Formally, each vertex *v* can be defined as a tuple *v = (u, D)*:
    - *u* is an update operation
    - *D* is the set of hashed vertices that are *v*'s causal dependencies
- Edges represent causal dependencies among the operations

<div align="center">
![Hash graph of a CRO](/img/hashgraph_new.png)

**Figure 1:** An example of hashgraph.
</div>


## Merging

Picture Alice and Bob in the same DRP program. Each of them has a copy of the program's hashgraph. Each of them is updating their own copy locally.

When Alice and Bob synchronize with each other, their hashgraphs are **merged**. In math language, the merging of two hashgraphs is their union.

The figure below shows the merge of hashgraphs at nodes P and Q.

<div align="center">
![Merging hashgraphs](/img/hashgraph_merge.png)

**Figure 2:** Merging two hashgraphs.
</div>

---

Page last updated: November 28, 2024